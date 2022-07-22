import SchoolModel from "../../../models/school.model";
import SchoolService from "../schoolService";

import db from "../../../testUtils/testDb";
import {
  testUsers,
  testSchools,
  testSchools2,
  testSchoolInvalidTeacher,
  assertResponseMatchesExpected,
  testSchool,
  updatedTestSchool,
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
    const res = await schoolService.getSchoolsBySubregion(invalidRegion);
    expect(res.length).toEqual(0);
  });

  it("getSchoolByCountry for valid country", async () => {
    await SchoolModel.insertMany(testSchools2);
    // mock return value of user service
    userService.findAllUsersByIds = jest.fn().mockReturnValue(testUsers);

    // execute
    const res = await schoolService.getSchoolsByCountry("some-country1");

    // assert
    assertResponseMatchesExpected(testSchools2[0], res[0]);
    assertResponseMatchesExpected(testSchools2[1], res[1]);
  });

  it("getSchoolByCountry for invalid country", async () => {
    // mock return value of user service
    userService.findAllUsersByIds = jest.fn().mockReturnValue(testUsers);
    const invalidCountry = "fake-country";

    // execute
    const res = await schoolService.getSchoolsByCountry(invalidCountry);

    // assert
    expect(res).toEqual([]);
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
    const savedId = await SchoolModel.create(testSchool);

    // mock return value
    userService.findAllUsersByIds = jest.fn().mockReturnValue(testUsers);

    // execute
    const res = await schoolService.updateSchool(savedId.id, updatedTestSchool);

    // assert
    assertResponseMatchesExpected(updatedTestSchool, res);
  });

  it("update school for school not found", async () => {
    const notFoundId = "62d9fc947195ae705e71f0d9";
    await expect(async () => {
      await schoolService.updateSchool(notFoundId, updatedTestSchool);
    }).rejects.toThrowError(`School id ${notFoundId} not found`);
  });
});
