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
import {
  TestResponseDTO,
  CreateTestRequestDTO,
} from "../../interfaces/testService";

describe("mongo testService", (): void => {
  let testService: TestService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    testService = new TestService();
  });

  afterEach(async () => {
    await db.clear();
  });

  it("createTest", async () => {
    const res = await testService.createTest(mockTest);

    assertResponseMatchesExpected(mockTest, res);
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

    // create DTO object to update to
    const testUpdate: CreateTestRequestDTO = {
      name: "newTest",
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

    // create DTO object to update to
    const testUpdate: CreateTestRequestDTO = {
      name: "newTest",
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
    await MgTest.insertMany(mockTestArray);
    const res = await testService.getAllTests();

    res.forEach((test: TestResponseDTO, i) => {
      assertResponseMatchesExpected(mockTestArray[i], test);
    });
  });
});
