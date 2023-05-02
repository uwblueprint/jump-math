import TestService from "../testService";

import db from "../../../testUtils/testDb";

import MgTest, {
  AssessmentStatus,
  AssessmentType,
  Test,
} from "../../../models/test.model";
import {
  assertResponseMatchesExpected,
  mockTest,
  mockTestArray,
  questions,
} from "../../../testUtils/tests";
import { TestResponseDTO, TestRequestDTO } from "../../interfaces/testService";
import { Grade } from "../../../types";

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
    testService.imageUploadService.getImage = jest.fn().mockReturnValue({
      url:
        "https://storage.googleapis.com/jump-math-98edf.appspot.com/assessment-images/test.png",
      filePath: "/assessment-images/test.png",
    });
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

  it("updateTest", async () => {
    // insert test into database
    const createdTest = await MgTest.create(mockTest);

    // create DTO object to update to
    const testUpdate: TestRequestDTO = {
      name: "newTest",
      questions,
      grade: Grade.GRADE_8,
      assessmentType: AssessmentType.END,
      curriculumCountry: "country",
      curriculumRegion: "region",
      status: AssessmentStatus.DRAFT,
    };

    // update test and assert
    const res = await testService.updateTest(createdTest.id, testUpdate);
    assertResponseMatchesExpected(testUpdate, res);
  });

  it("getTestById", async () => {
    const test = await MgTest.create(mockTest);
    const res = await testService.getTestById(test.id);

    expect(res.id).toEqual(test.id);
    assertResponseMatchesExpected(mockTest, res);
  });

  it("getAllTests", async () => {
    await MgTest.insertMany(mockTestArray);
    const res = await testService.getAllTests();

    res.forEach((test: TestResponseDTO, i) => {
      assertResponseMatchesExpected(mockTestArray[i], test);
    });
  });

  it("publishTest", async () => {
    const test = await MgTest.create(mockTest);

    const publishedTest = await testService.publishTest(test.id);
    assertResponseMatchesExpected(
      {
        ...mockTest,
        status: AssessmentStatus.PUBLISHED,
      },
      publishedTest,
    );
    expect(test.id).toEqual(publishedTest.id);
  });

  it("duplicateTest", async () => {
    const test = await MgTest.create({
      ...mockTest,
      status: AssessmentStatus.PUBLISHED,
    });

    const duplicateTest = await testService.duplicateTest(test.id);
    assertResponseMatchesExpected(mockTest, duplicateTest);
    expect(test.id).not.toEqual(duplicateTest.id);

    const originalTest = await testService.getTestById(test.id);
    assertResponseMatchesExpected(test, originalTest);
    expect(test.id).toEqual(originalTest.id);
  });

  it("unarchiveTest", async () => {
    const test = await MgTest.create({
      ...mockTest,
      status: AssessmentStatus.ARCHIVED,
    });

    const unarchivedTest = await testService.unarchiveTest(test.id);
    assertResponseMatchesExpected(
      {
        ...mockTest,
        status: AssessmentStatus.DRAFT,
      },
      unarchivedTest,
    );
    expect(test.id).not.toEqual(unarchivedTest.id);

    const originalTest = await MgTest.findById(test.id);
    // TODO: update this to be soft delete instead of hard delete
    expect(originalTest?.status).toBe(AssessmentStatus.DELETED);
  });

  it("archiveTest", async () => {
    const test = await MgTest.create(mockTest);

    const archivedTest = await testService.archiveTest(test.id);
    assertResponseMatchesExpected(
      {
        ...mockTest,
        status: AssessmentStatus.ARCHIVED,
      },
      archivedTest,
    );
    expect(test.id).toEqual(archivedTest.id);
  });

  describe("invalid id", () => {
    const notFoundId = "62c248c0f79d6c3c9ebbea95";

    it("deleteTest", async () => {
      await expect(async () => {
        await testService.deleteTest(notFoundId);
      }).rejects.toThrowError(`Test ${notFoundId} not found`);
    });

    it("updateTest for non-existing ID", async () => {
      await expect(async () => {
        await testService.updateTest(notFoundId, mockTest);
      }).rejects.toThrowError(`Test with id ${notFoundId} not found`);
    });

    it("getTestById", async () => {
      await expect(async () => {
        await testService.getTestById(notFoundId);
      }).rejects.toThrowError(`Test ID ${notFoundId} not found`);
    });

    it("publishTest", async () => {
      await expect(async () => {
        await testService.publishTest(notFoundId);
      }).rejects.toThrowError(
        `Test with ID ${notFoundId} is not found or not in draft status`,
      );
    });

    it("duplicateTest", async () => {
      await expect(async () => {
        await testService.duplicateTest(notFoundId);
      }).rejects.toThrowError(`Test ID ${notFoundId} not found`);
    });

    it("unarchiveTest", async () => {
      await expect(async () => {
        await testService.unarchiveTest(notFoundId);
      }).rejects.toThrowError(`Test ID ${notFoundId} not found`);
    });

    it("archiveTest", async () => {
      await expect(async () => {
        await testService.archiveTest(notFoundId);
      }).rejects.toThrowError(
        `Test with ID ${notFoundId} is not found or not in draft / published status`,
      );
    });
  });

  describe("invalid status", () => {
    let test: Test;
    beforeEach(async () => {
      test = await MgTest.create({
        ...mockTest,
        status: AssessmentStatus.DELETED,
      });
    });

    it("publishTest", async () => {
      await expect(async () => {
        await testService.publishTest(test.id);
      }).rejects.toThrowError(
        `Test with ID ${test.id} is not found or not in draft status`,
      );
    });

    it("unarchiveTest", async () => {
      await expect(async () => {
        await testService.unarchiveTest(test.id);
      }).rejects.toThrowError(`Test ID ${test.id} is not in archived status`);
    });

    it("archiveTest", async () => {
      await expect(async () => {
        await testService.archiveTest(test.id);
      }).rejects.toThrowError(
        `Test with ID ${test.id} is not found or not in draft / published status`,
      );
    });
  });
});
