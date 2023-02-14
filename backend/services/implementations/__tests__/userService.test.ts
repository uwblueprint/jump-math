import UserModel from "../../../models/user.model";
import UserService from "../userService";
import SchoolModel from "../../../models/school.model";
import { UserDTO, TeacherDTO } from "../../../types";

import db from "../../../testUtils/testDb";

const testUsers = [
  {
    firstName: "Peter",
    lastName: "Pan",
    authId: "123",
    role: "Admin",
    email: "peter@gmail.com",
    grades: ["K", "Grade 1", "Grade 2", "Grade 3"],
    currentlyTeachingJM: true,
  },
  {
    firstName: "Wendy",
    lastName: "Darling",
    authId: "321",
    role: "Teacher",
    email: "wendy@gmail.com",
  },
];

jest.mock("firebase-admin", () => {
  const auth = jest.fn().mockReturnValue({
    getUser: jest.fn().mockReturnValue({ email: "test@test.com" }),
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

  it("getUsers", async () => {
    await UserModel.insertMany(testUsers);

    const res = await userService.getUsers();

    res.forEach((user: UserDTO, i) => {
      expect(user.firstName).toEqual(testUsers[i].firstName);
      expect(user.lastName).toEqual(testUsers[i].lastName);
      expect(user.role).toEqual(testUsers[i].role);
      if (user.grades) {
        expect(Array.from(user.grades)).toEqual(testUsers[i].grades);
      } else {
        expect(user.grades).toEqual(testUsers[i].grades);
      }
      expect(user.currentlyTeachingJM).toEqual(
        testUsers[i].currentlyTeachingJM,
      );
    });
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

    const testSchools = [
      {
        name: "school1",
        country: "some-country",
        subRegion: "some-region1",
        city: "some-city",
        address: "some-address",
        teachers: [createRes[0].id],
      },
      {
        name: "school2",
        country: "some-country",
        subRegion: "some-region2",
        city: "some-city",
        address: "some-address",
        teachers: [createRes[1].id],
      },
    ];

    await SchoolModel.insertMany(testSchools);
    const res = await userService.getAllTeachers();

    res.forEach((teacher: TeacherDTO, i) => {
      expect(teacher.firstName).toEqual(testUsers[i].firstName);
      expect(teacher.lastName).toEqual(testUsers[i].lastName);
      expect(teacher.role).toEqual(testUsers[i].role);
      expect(teacher.email).toEqual(testUsers[i].email);
      expect(teacher.school).toEqual(testSchools[i].name);
    });
  });
});
