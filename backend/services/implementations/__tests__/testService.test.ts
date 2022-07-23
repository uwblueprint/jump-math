import TestService from "../testService";
import MgTest from "../../../models/test.model";

import db from "../../../testUtils/testDb";
import { mockAdmin, mockTest } from "../../../testUtils/tests";
import UserService from "../userService";

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

    expect(res.id).not.toBeNull();
    expect(res).toMatchObject({
      ...mockTest,
      questions: res.questions,
      admin: mockAdmin,
      id: res.id,
    });
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
});
