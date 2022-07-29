import TestService from "../testService";

import db from "../../../testUtils/testDb";
import {
  assertResponseMatchesExpected,
  mockAdmin,
  mockTest,
  questions,
} from "../../../testUtils/tests";

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

    assertResponseMatchesExpected(mockTest, res);
  });

  it("createTest invalid admin userId", async () => {
    await expect(async () => {
      await testService.createTest(mockTest);
    }).rejects.toThrowError(`userId ${mockTest.admin} not found`);
  });

  it("updateTest", async () => {
    // insert test into database
    const createdTest = await MgTest.create(mockTest);

    // mock response of user service
    userService.getUserById = jest.fn().mockReturnValue(mockAdmin);

    // create DTO object to update to
    const testUpdate = {
      name: "newTest",
      duration: 400,
      admin: "62c248c0f79d6c3c9ebbea94",
      questions,
      grade: 10,
    };

    // update test and assert
    const res = await testService.updateTest(createdTest.id, testUpdate);

    expect(res.id).not.toBeNull();
    expect(res).toMatchObject({
      ...testUpdate,
      questions: res.questions,
      admin: mockAdmin,
      id: res.id,
    });
  });

  it("updateTest for non-existing ID", async () => {
    // insert test into database
    await MgTest.create(mockTest);

    // mock response of user service
    userService.getUserById = jest.fn().mockReturnValue(mockAdmin);

    // create DTO object to update to
    const testUpdate = {
      name: "newTest",
      duration: 400,
      admin: "62c248c0f79d6c3c9ebbea94",
      questions,
      grade: 10,
    };

    // update test and assert
    await expect(async () => {
      await testService.updateTest("62c248c0f79d6c3c9ebbea95", testUpdate);
    }).rejects.toThrowError(`Test with id 62c248c0f79d6c3c9ebbea95 not found`);
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
