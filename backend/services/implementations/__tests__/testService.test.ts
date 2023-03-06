import TestService from "../testService";

import db from "../../../testUtils/testDb";

import MgTest, {
  AssessmentStatus,
  AssessmentType,
} from "../../../models/test.model";
import {
  assertResponseMatchesExpected,
  mockTest,
  mockTestArray,
  questions,
} from "../../../testUtils/tests";

import UserService from "../userService";
import {
  TestResponseDTO,
  CreateTestRequestDTO,
} from "../../interfaces/testService";
import { mockAdmin } from "../../../testUtils/users";

describe("mongo testService", (): void => {
  let testService: TestService;
  let userService: UserService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    userService = new UserService();
    testService = new TestService(userService);
  });

  afterEach(async () => {
    await db.clear();
  });

  it("createTest", async () => {
    userService.getUserById = jest.fn().mockReturnValue(mockAdmin);
    const res = await testService.createTest(mockTest);

    assertResponseMatchesExpected(mockTest, res);
  });

  it("createTest invalid admin userId", async () => {
    await expect(async () => {
      await testService.createTest(mockTest);
    }).rejects.toThrowError(`userId ${mockTest.admin} not found`);
  });

  it("deleteTest", async () => {
    const savedTest = await MgTest.create(mockTest);
    const deletedTestId = await testService.deleteTest(savedTest.id);
    expect(deletedTestId).toBe(savedTest.id);
  });

  it("deleteTest not found", async () => {
    const notFoundId = "62c248c0f79d6c3c9ebbea95";
    expect(testService.deleteTest(notFoundId)).rejects.toThrowError(
      `Test ${notFoundId} not found`,
    );
  });

  it("updateTest", async () => {
    // insert test into database
    const createdTest = await MgTest.create(mockTest);

    // mock response of user service
    userService.getUserById = jest.fn().mockReturnValue(mockAdmin);

    // create DTO object to update to
    const testUpdate: CreateTestRequestDTO = {
      name: "newTest",
      admin: "62c248c0f79d6c3c9ebbea94",
      questions,
      grade: 10,
      assessmentType: AssessmentType.END,
      curriculumCountry: "country",
      curriculumRegion: "region",
      status: AssessmentStatus.DRAFT,
    };

    // update test and assert
    const res = await testService.updateTest(createdTest.id, testUpdate);
    assertResponseMatchesExpected(testUpdate, res);
  });

  it("updateTest for non-existing ID", async () => {
    // insert test into database
    await MgTest.create(mockTest);

    // mock response of user service
    userService.getUserById = jest.fn().mockReturnValue(mockAdmin);

    // create DTO object to update to
    const testUpdate: CreateTestRequestDTO = {
      name: "newTest",
      admin: "62c248c0f79d6c3c9ebbea94",
      questions,
      grade: 10,
      assessmentType: AssessmentType.END,
      curriculumCountry: "country",
      curriculumRegion: "region",
      status: AssessmentStatus.DRAFT,
    };

    const notFoundId = "62c248c0f79d6c3c9ebbea95";

    // update test and assert
    await expect(async () => {
      await testService.updateTest(notFoundId, testUpdate);
    }).rejects.toThrowError(`Test with id ${notFoundId} not found`);
  });

  it("getTestById", async () => {
    userService.getUserById = jest.fn().mockReturnValue(mockAdmin);
    const test = await MgTest.create(mockTest);
    const res = await testService.getTestById(test.id);

    expect(res.id).toEqual(test.id);
    assertResponseMatchesExpected(mockTest, res);
  });

  it("getTestById id not found", async () => {
    const testId = "62c248c0f79d6c3c9ebbea93";
    expect(async () => {
      await testService.getTestById(testId);
    }).rejects.toThrowError(`Test ID ${testId} not found`);
  });

  it("getAllTests", async () => {
    userService.getUserById = jest.fn().mockReturnValue(mockAdmin);
    await MgTest.insertMany(mockTestArray);
    const res = await testService.getAllTests();

    res.forEach((test: TestResponseDTO, i) => {
      assertResponseMatchesExpected(mockTestArray[i], test);
    });
  });

  it("duplicateTest", async () => {
    userService.getUserById = jest.fn().mockReturnValue(mockAdmin);
    const test = await MgTest.create(mockTest);

    const duplicateTest = await testService.duplicateTest(test.id);
    assertResponseMatchesExpected(test, duplicateTest);
    expect(test.id).not.toEqual(duplicateTest.id);

    const originalTest = await testService.getTestById(test.id);
    assertResponseMatchesExpected(test, originalTest);
    expect(test.id).toEqual(originalTest.id);
  });
});
