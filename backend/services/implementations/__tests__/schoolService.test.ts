import SchoolModel from "../../../models/school.model";
import SchoolService from "../schoolService";

import db from "../../../testUtils/testDb";
import {
  testUsers,
  testSchools,
  testSchoolInvalidTeacher,
  assertResponseMatchesExpected,
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

    // execute
    const res = await schoolService.getAllSchools();

    // assert
    res.forEach((school: SchoolResponseDTO, i) => {
      assertResponseMatchesExpected(testSchools[i], school);
    });
  });

  it("getSchoolsBySubregion for valid region", async () => {
    await SchoolModel.insertMany(testSchools);
    // mock return value of user service
    userService.findAllUsersByIds = jest.fn().mockReturnValue(testUsers);

    // execute
    const res = await schoolService.getSchoolsBySubregion("some-region1");

    // assert
    res.forEach((school: SchoolResponseDTO) => {
      assertResponseMatchesExpected(testSchools[0], school);
    });
  });

  it("getSchoolsBySubregion for invalid region", async () => {
    // mock return value of user service
    userService.findAllUsersByIds = jest.fn().mockReturnValue([]);
    const invalidRegion = "fake-region";

    // execute and assert
    await expect(async () => {
      await schoolService.getSchoolsBySubregion(invalidRegion);
    }).rejects.toThrowError(`Sub region ${invalidRegion} not found`);
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
});
