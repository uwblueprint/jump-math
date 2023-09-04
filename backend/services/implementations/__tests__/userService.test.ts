import type { User } from "../../../models/user.model";
import UserModel from "../../../models/user.model";
import UserService from "../userService";
import TestSessionModel from "../../../models/testSession.model";
import type { TeacherDTO, UserDTO } from "../../../types";
import { Grade } from "../../../types";
import ClassModel from "../../../models/class.model";
import SchoolModel from "../../../models/school.model";

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

  describe("deleteUserByEmail", () => {
    it("on success", async () => {
      const teacher: User = await UserModel.create(testUsers[1]);
      await SchoolModel.create({
        ...testSchools[0],
        teachers: testSchools[0].teachers.concat(teacher.id),
      });
      await ClassModel.insertMany(
        testClass.map((classObj) => ({
          ...classObj,
          teacher: teacher.id,
        })),
      );
      await TestSessionModel.insertMany(
        mockTestSessions.map((mockTestSession) => ({
          ...mockTestSession,
          teacher: teacher.id,
        })),
      );

      await userService.deleteUserByEmail(teacher.email);

      const associatedSchool = await SchoolModel.find({
        teachers: teacher.id,
      });
      expect(associatedSchool).toEqual([]);

      const associatedClasses = await ClassModel.find({
        teacher: teacher.id,
      });
      expect(associatedClasses).toEqual([]);

      const associatedTestSession = await TestSessionModel.find({
        teacher: teacher.id,
      });
      expect(associatedTestSession).toEqual([]);
    });

    it("on failure", async () => {
      await expect(async () => {
        await userService.deleteUserByEmail(testUsers[0].email);
      }).rejects.toThrowError();
    });
  });
});
