import TestService from "../testService";

import db from "../../../testUtils/testDb";

import type { Test } from "../../../models/test.model";
import MgTest, { AssessmentStatus } from "../../../models/test.model";
import {
  assertResponseMatchesExpected,
  mockArchivedTest,
  mockTestRequest,
  mockTestRequest2,
  mockTestWithId,
  imageMetadata,
  mockDeletedTest,
  mockPublishedTest,
  mockTestArray,
  mockTestWithId2,
} from "../../../testUtils/tests";
import type { TestResponseDTO } from "../../interfaces/testService";

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
    testService.imageUploadService.uploadImage = jest
      .fn()
      .mockReturnValue(imageMetadata);
    testService.imageUploadService.getImage = jest
      .fn()
      .mockReturnValue(imageMetadata);
  });

  afterEach(async () => {
    await db.clear();
  });

  it("createTest", async () => {
    const res = await testService.createTest(mockTestRequest);
    assertResponseMatchesExpected(mockTestWithId, res);
  });

  it("deleteTest", async () => {
    const savedTest = await MgTest.create(mockTestWithId);
    const deletedTestId = await testService.deleteTest(savedTest.id);
    expect(deletedTestId).toBe(savedTest.id);
  });

  it("updateTest", async () => {
    // insert test into database
    const createdTest = await MgTest.create(mockTestWithId);

    // update test and assert
    const res = await testService.updateTest(createdTest.id, mockTestRequest2);
    assertResponseMatchesExpected(mockTestWithId2, res);
  });

  it("getTestById", async () => {
    const test = await MgTest.create(mockTestWithId);
    const res = await testService.getTestById(test.id);

    expect(res.id).toEqual(test.id);
    assertResponseMatchesExpected(mockTestWithId, res);
  });

  it("getAllTests", async () => {
    await MgTest.insertMany(mockTestArray);
    const res = await testService.getAllTests();

    res.forEach((test: TestResponseDTO, i) => {
      assertResponseMatchesExpected(mockTestArray[i], test);
    });
  });

  it("publishTest", async () => {
    const test = await MgTest.create(mockTestWithId);

    const publishedTest = await testService.publishTest(test.id);
    assertResponseMatchesExpected(mockPublishedTest, publishedTest);
    expect(test.id).toEqual(publishedTest.id);
  });

  it("duplicateTest", async () => {
    const test = await MgTest.create(mockPublishedTest);

    const duplicateTest = await testService.duplicateTest(test.id);
    assertResponseMatchesExpected(mockTestWithId, duplicateTest);
    expect(test.id).not.toEqual(duplicateTest.id);

    const originalTest = await testService.getTestById(test.id);
    assertResponseMatchesExpected(mockPublishedTest, originalTest);
    expect(test.id).toEqual(originalTest.id);
  });

  it("unarchiveTest", async () => {
    const test = await MgTest.create(mockArchivedTest);

    const unarchivedTest = await testService.unarchiveTest(test.id);
    assertResponseMatchesExpected(mockTestWithId, unarchivedTest);
    expect(test.id).not.toEqual(unarchivedTest.id);

    const originalTest = await MgTest.findById(test.id);
    expect(originalTest?.status).toBe(AssessmentStatus.DELETED);
  });

  it("archiveTest", async () => {
    const test = await MgTest.create(mockTestWithId);

    const archivedTest = await testService.archiveTest(test.id);
    assertResponseMatchesExpected(mockArchivedTest, archivedTest);
    expect(test.id).toEqual(archivedTest.id);
  });

  describe("invalid id", () => {
    const notFoundId = "62c248c0f79d6c3c9ebbea95";

    it("deleteTest", async () => {
      await expect(async () => {
        await testService.deleteTest(notFoundId);
      }).rejects.toThrowError(`Test ID ${notFoundId} not found`);
    });

    it("updateTest", async () => {
      await expect(async () => {
        await testService.updateTest(notFoundId, mockTestRequest);
      }).rejects.toThrowError(`Test ID ${notFoundId} not found`);
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
      test = await MgTest.create(mockDeletedTest);
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
      }).rejects.toThrowError(
        `Test with ID ${test.id} is not in archived status`,
      );
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
