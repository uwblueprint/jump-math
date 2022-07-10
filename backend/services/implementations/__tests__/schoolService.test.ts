import SchoolModel from "../../../models/school.model";
import SchoolService from "../schoolService";

import db from "../../../testUtils/testDb";
import {
  testUsers,
  testSchools,
  testSchoolInvalidTeacher,
} from "../../../testUtils/school";
import UserService from "../userService";
import { SchoolResponseDTO } from "../../interfaces/schoolService";

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

    const res = await schoolService.getAllSchools();

    res.forEach((school: SchoolResponseDTO, i) => {
      expect(school.id).not.toBeNull();
      expect(school.name).toEqual(testSchools[i].name);
      expect(school.country).toEqual(testSchools[i].country);
      expect(school.subRegion).toEqual(testSchools[i].subRegion);
      expect(school.city).toEqual(testSchools[i].city);
      expect(school.address).toEqual(testSchools[i].address);
      expect(school.teachers).toEqual(testUsers);
    });
  });

  it("create school for valid teachers", async () => {
    // mock return value of user service
    userService.findAllUsersByIds = jest.fn().mockReturnValue(testUsers);

    // execute
    const createdSchool = await schoolService.createSchool(testSchools[0]);

    // assert
    expect(createdSchool.id).not.toBeNull();
    expect(createdSchool.name).toEqual(testSchools[0].name);
    expect(createdSchool.country).toEqual(testSchools[0].country);
    expect(createdSchool.subRegion).toEqual(testSchools[0].subRegion);
    expect(createdSchool.city).toEqual(testSchools[0].city);
    expect(createdSchool.address).toEqual(testSchools[0].address);
    expect(createdSchool.teachers).toEqual(testUsers);
  });

  it("throw error for non-existing teachers", async () => {
    // mock return value of user service
    userService.findAllUsersByIds = jest.fn().mockReturnValue([]);

    // execute and assert
    await expect(async () => {
      await schoolService.createSchool(testSchoolInvalidTeacher);
    }).rejects.toThrowError("One or more of the teacher IDs was not found");
  });
});
