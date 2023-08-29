import type { User } from "../../../models/user.model";
import UserModel from "../../../models/user.model";
import UserService from "../userService";
import type { School } from "../../../models/school.model";
import SchoolModel from "../../../models/school.model";
import TestSessionModel from "../../../models/testSession.model";
import type { UserDTO, TeacherDTO } from "../../../types";
import { Grade } from "../../../types";
import ClassModel from "../../../models/class.model";

import db from "../../../testUtils/testDb";
import { testSchools } from "../../../testUtils/school";
import { mockTestSessions } from "../../../testUtils/testSession";
import { testClass } from "../../../testUtils/class";

const testUsers = [
  {
    firstName: "Peter",
    lastName: "Pan",
    authId: "123",
    role: "Admin",
    email: "peter@gmail.com",
  },
  {
    firstName: "Wendy",
    lastName: "Darling",
    authId: "321",
    role: "Teacher",
    email: "wendy@gmail.com",
    grades: [Grade.KINDERGARTEN, Grade.GRADE_1, Grade.GRADE_2, Grade.GRADE_3],
    currentlyTeachingJM: true,
  },
];

jest.mock("firebase-admin", () => {
  const auth = jest.fn().mockReturnValue({
    getUser: jest.fn().mockReturnValue({ email: "test@test.com" }),
    deleteUser: jest.fn().mockReturnValue({}),
    getUserByEmail: jest
      .fn()
      .mockReturnValueOnce({ uid: "321" })
      .mockReturnValue({ uid: "invalid-id" }),
  });
  return { auth };
});

describe("mongo userService", (): void => {
  let userService: UserService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    userService = new UserService();
  });

  afterEach(async () => {
    await db.clear();
  });

  it("getUsersByRole", async () => {
    await UserModel.insertMany(testUsers);
    const adminRole = "Admin";
    const teacherRole = "Teacher";
    const admins = await userService.getUsersByRole(adminRole);

    admins.forEach((user: UserDTO) => {
      expect(user.role).toEqual(adminRole);
    });

    const teachers = await userService.getUsersByRole(teacherRole);

    teachers.forEach((user: UserDTO) => {
      expect(user.role).toEqual(teacherRole);
    });

    const emptyRes = await userService.getUsersByRole("nonexisting_role");

    expect(emptyRes.length).toEqual(0);
  });

  it("getAllTeachers", async () => {
    const createRes = await UserModel.insertMany(testUsers);

    await SchoolModel.insertMany([
      {
        ...testSchools[0],
        teachers: [createRes[0].id],
      },
      {
        ...testSchools[1],
        teachers: [createRes[1].id],
      },
    ]);
    const res = await userService.getAllTeachers();

    res.forEach((teacher: TeacherDTO, i) => {
      expect(teacher.firstName).toEqual(testUsers[i].firstName);
      expect(teacher.lastName).toEqual(testUsers[i].lastName);
      expect(teacher.role).toEqual(testUsers[i].role);
      expect(teacher.email).toEqual(testUsers[i].email);
      expect(teacher.school).toEqual(testSchools[i].name);
    });
  });

  describe("delete teacher", () => {
    let teacher: User;
    let schools: School[];

    beforeEach(async () => {
      teacher = await UserModel.create(testUsers[1]);
      const updatedTestSchools = [
        testSchools[0],
        {
          ...testSchools[1],
          teachers: testSchools[1].teachers.concat(teacher.id),
        },
      ];
      schools = await SchoolModel.insertMany(updatedTestSchools);

      const updatedTestSessions = [
        {
          ...mockTestSessions[0],
          teacher: teacher.id,
        },
        {
          ...mockTestSessions[1],
          teacher: teacher.id,
        },
      ];
      await TestSessionModel.insertMany(updatedTestSessions);

      const updatedClasses = [
        {
          ...testClass[0],
          teacher: teacher.id,
        },
        {
          ...testClass[1],
          teacher: teacher.id,
        },
      ];
      await ClassModel.insertMany(updatedClasses);
    });

    describe("on success", () => {
      afterEach(async () => {
        const associatedSchool = await SchoolModel.findById(schools[1].id);
        const associatedTestSession = await TestSessionModel.find({
          teacher: teacher.id,
        });
        const associatedClasses = await ClassModel.find({
          teacher: teacher.id,
        });
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        expect(associatedSchool!.teachers.map(String)).toEqual(
          testSchools[1].teachers,
        );
        expect(associatedTestSession).toEqual([]);
        expect(associatedClasses).toEqual([]);
      });

      it("deleteUserByEmail", async () => {
        await userService.deleteUserByEmail(teacher.email);
      });
    });

    it("on failure", async () => {
      await expect(async () => {
        await userService.deleteUserByEmail(teacher.email);
      }).rejects.toThrowError();
    });
  });
});
