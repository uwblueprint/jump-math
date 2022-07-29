import TestService from "../testService";

import db from "../../../testUtils/testDb";
import { mockAdmin, mockTest } from "../../../testUtils/tests";
import MgTest from "../../../models/test.model";
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
      id: res.id,
      ...mockTest,
      questions: res.questions,
      admin: mockAdmin,
    });
  });

  it("createTest invalid admin userId", async () => {
    await expect(async () => {
      await testService.createTest(mockTest);
    }).rejects.toThrowError(`userId ${mockTest.admin} not found`);
  });


  it("getTestById", async () => {
    userService.getUserById = jest.fn().mockReturnValue(mockAdmin);
    const test  = await MgTest.create(mockTest);
    const res = await testService.getTestById(test.id);

    expect(res).toMatchObject(test);
  });

  it("getTestById id not found", async () => {
    const testId = "62c248c0f79d6c3c9ebbea93";
      expect(async () => {
        await testService.getTestById(testId);
      }).rejects.toThrowError(`Test ID ${testId} not found`);
  });
});