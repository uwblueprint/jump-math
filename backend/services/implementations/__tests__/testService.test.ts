import TestService from "../testService";

import db from "../../../testUtils/testDb";

import MgTest from "../../../models/test.model";
import {
  assertResponseMatchesExpected,
  mockTest,
} from "../../../testUtils/tests";
import UserService from "../userService";
import mockAdmin from "../../../testUtils/users";

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
});
