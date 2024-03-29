import SchoolModel from "../../../models/school.model";
import SchoolService from "../schoolService";

import db from "../../../testUtils/testDb";
import {
  testSchools,
  testSchoolInvalidTeacher,
  assertResponseMatchesExpected,
  updatedTestSchool,
} from "../../../testUtils/school";
import UserService from "../userService";
import type { SchoolResponseDTO } from "../../interfaces/schoolService";
import { testUsers } from "../../../testUtils/users";

jest.mock("firebase-admin", () => {
  const auth = jest.fn().mockReturnValue({
    getUser: jest.fn().mockReturnValue({ email: "test@test.com" }),
  });
  return { auth };
});

describe("mongo schoolService", (): void => {
  let schoolService: SchoolService;
  let userService: UserService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    userService = new UserService();
    schoolService = new SchoolService(userService);
  });

  afterEach(async () => {
    await db.clear();
  });

  it("getAllSchools", async () => {
    await SchoolModel.insertMany(testSchools);
    // mock return value of user service
    userService.findAllUsersByIds = jest.fn().mockReturnValue(testUsers);

    // execute
    const res = await schoolService.getAllSchools();

    // assert
    res.forEach((school: SchoolResponseDTO, i) => {
      assertResponseMatchesExpected(testSchools[i], school);
    });
  });

  it("create school for valid teachers", async () => {
    // mock return value of user service
    userService.findAllUsersByIds = jest.fn().mockReturnValue(testUsers);

    // execute
    const createdSchool = await schoolService.createSchool(testSchools[0]);

    // assert
    assertResponseMatchesExpected(testSchools[0], createdSchool);
  });

  it("throw error for non-existing teachers", async () => {
    // mock return value of user service
    userService.findAllUsersByIds = jest.fn().mockReturnValue([]);

    // execute and assert
    await expect(async () => {
      await schoolService.createSchool(testSchoolInvalidTeacher);
    }).rejects.toThrowError("One or more of the teacher IDs was not found");
  });

  it("update school for valid schools", async () => {
    // add test school
    const school = await SchoolModel.create(testSchools[0]);

    // mock return value
    userService.findAllUsersByIds = jest.fn().mockReturnValue(testUsers);

    // execute
    const res = await schoolService.updateSchool(school.id, updatedTestSchool);

    // assert
    assertResponseMatchesExpected(updatedTestSchool, res);
  });

  it("update school for school not found", async () => {
    const notFoundId = "62d9fc947195ae705e71f0d9";
    await expect(async () => {
      await schoolService.updateSchool(notFoundId, updatedTestSchool);
    }).rejects.toThrowError(`School id ${notFoundId} not found`);
  });

  it("getSchoolById for valid Id", async () => {
    // mock return value of user service
    userService.findAllUsersByIds = jest.fn().mockReturnValue(testUsers);

    // execute and assert
    const savedSchool = await SchoolModel.create(testSchools[0]);
    const res = await schoolService.getSchoolById(savedSchool.id);
    assertResponseMatchesExpected(savedSchool, res);
  });

  it("getSchoolById for invalid Id", async () => {
    // mock return value of user service
    userService.findAllUsersByIds = jest.fn().mockReturnValue(testUsers);

    // execute and assert
    const notFoundId = "56cb91bdc3464f14678934cd";
    await SchoolModel.create(testSchools[0]);
    expect(schoolService.getSchoolById(notFoundId)).rejects.toThrowError(
      `School id ${notFoundId} not found`,
    );
  });

  it("getSchoolByTeacherId for valid teacherId", async () => {
    // mock return value of user service
    userService.findAllUsersByIds = jest.fn().mockReturnValue(testUsers);

    // execute and assert
    const savedSchool = await SchoolModel.create(testSchools[0]);
    const teacherId = testSchools[0].teachers[0];
    const res = await schoolService.getSchoolByTeacherId(teacherId);
    assertResponseMatchesExpected(savedSchool, res);
  });

  it("getSchoolByTeacherId for invalid teacherId", async () => {
    // mock return value of user service
    userService.findAllUsersByIds = jest.fn().mockReturnValue(testUsers);

    // execute and assert
    await SchoolModel.create(testSchools[0]);
    const invalidTeacherId = "56cb91bdc3464f14678934cd";
    expect(
      schoolService.getSchoolByTeacherId(invalidTeacherId),
    ).rejects.toThrowError(`School with teacher ${invalidTeacherId} not found`);
  });
});
