import ClassModel from "../../../models/class.model";
import ClassService from "../classService";

import db from "../../../testUtils/testDb";
import {
  testClass,
  testClassInvalidTeacher,
  assertResponseMatchesExpected,
  updatedTestClass,
} from "../../../testUtils/class";
import UserService from "../userService";
import { mockTeacher } from "../../../testUtils/users";
import TestSessionService from "../testSessionService";
import TestService from "../testService";
import SchoolService from "../schoolService";
import { mockTestSessionWithId } from "../../../testUtils/testSession";

jest.mock("firebase-admin", () => {
  const auth = jest.fn().mockReturnValue({
    getUser: jest.fn().mockReturnValue({ email: "test@test.com" }),
  });
  return { auth };
});

describe("mongo classService", (): void => {
  let classService: ClassService;
  let userService: UserService;
  let testSessionService: TestSessionService;
  let testService: TestService;
  let schoolService: SchoolService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    userService = new UserService();
    testSessionService = new TestSessionService(
      testService,
      userService,
      schoolService,
    );
    classService = new ClassService(userService, testSessionService);

    if (expect.getState().currentTestName.includes("exclude mock values"))
      return;
    userService.getUserById = jest.fn().mockReturnValue(mockTeacher);
    testSessionService.getTestSessionById = jest
      .fn()
      .mockReturnValue(mockTestSessionWithId);
  });

  afterEach(async () => {
    await db.clear();
  });

  it("create class for valid teachers", async () => {
    // execute
    const createdClass = await classService.createClass(testClass[0]);
    console.log("testClass");
    console.log(testClass[0]);
    console.log("createdClass");
    console.log(createdClass);
    // assert
    assertResponseMatchesExpected(testClass[0], createdClass);
  });

  it("throw error for non-existing teachers", async () => {
    userService.getUserById = jest.fn().mockReturnValue("");

    // execute
    await expect(async () => {
      await classService.createClass(testClassInvalidTeacher);
    }).rejects.toThrowError("Teacher ID was not found");
  });

  it("update class", async () => {
    // add test class
    const classObj = await ClassModel.create(testClass[0]);

    // execute
    const res = await classService.updateClass(classObj.id, updatedTestClass);

    // assert
    assertResponseMatchesExpected(updatedTestClass, res);
  });

  it("update class for class not found", async () => {
    const notFoundId = "62d9fc947195ae705e71f0d9";
    await expect(async () => {
      await classService.updateClass(notFoundId, updatedTestClass);
    }).rejects.toThrowError(`Class id ${notFoundId} not found`);
  });

  it("getClassById for valid Id", async () => {
    // execute and assert
    const savedClass = await ClassModel.create(testClass[0]);
    const res = await classService.getClassById(savedClass.id);
    assertResponseMatchesExpected(savedClass, res);
  });

  it("getClassById for invalid Id", async () => {
    // execute and assert
    const notFoundId = "56cb91bdc3464f14678934cd";
    await ClassModel.create(testClass[0]);
    expect(classService.getClassById(notFoundId)).rejects.toThrowError(
      `Class id ${notFoundId} not found`,
    );
  });

  it("deleteClass", async () => {
    const savedClass = await ClassModel.create(testClass[0]);

    const deletedClassId = await classService.deleteClass(savedClass.id);
    expect(deletedClassId).toBe(savedClass.id);
  });

  it("deleteClass with non-existing id", async () => {
    const notFoundId = "86cb91bdc3464f14678934cd";
    await expect(async () => {
      await classService.deleteClass(notFoundId);
    }).rejects.toThrowError(`Class with id ${notFoundId} not found`);
  });
});
