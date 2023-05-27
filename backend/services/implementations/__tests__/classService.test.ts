import ClassModel from "../../../models/class.model";
import ClassService from "../classService";

import db from "../../../testUtils/testDb";
import {
  testClass,
  testClassInvalidTeacher,
  updatedTestClass,
  testStudents,
  testClassWithStudents,
  updatedTestClassWithStudent,
  updatedTestStudents,
} from "../../../testUtils/class";
import {
  assertResponseMatchesExpected,
  assertArrayResponseMatchesExpected,
  assertStudentResponseMatchesExpected,
} from "../../../testUtils/classAssertions";
import UserService from "../userService";
import { mockTeacher } from "../../../testUtils/users";
import TestSessionService from "../testSessionService";
import type TestService from "../testService";
import type SchoolService from "../schoolService";
import { mockTestSessionWithId } from "../../../testUtils/testSession";

const testClassWithTestSessions = {
  ...testClass[0],
  testSessions: [mockTestSessionWithId.id],
};

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

    // assert
    assertResponseMatchesExpected(testClass[0], createdClass);
  });

  it("throw error for non-existing teachers", async () => {
    userService.getUserById = jest.fn().mockReturnValue("");

    // execute and assert
    await expect(async () => {
      await classService.createClass(testClassInvalidTeacher);
    }).rejects.toThrowError("Teacher ID was not found");
  });

  it("update class", async () => {
    // add test class
    const classObj = await ClassModel.create(testClassWithStudents);

    // execute
    const res = await classService.updateClass(classObj.id, updatedTestClass);

    // assert
    assertResponseMatchesExpected(updatedTestClass, res);
    assertStudentResponseMatchesExpected(
      testClassWithStudents.students,
      res.students,
    );
  });

  it("update class for class not found", async () => {
    // execute and assert
    const notFoundId = "62d9fc947195ae705e71f0d9";
    await expect(async () => {
      await classService.updateClass(notFoundId, updatedTestClass);
    }).rejects.toThrowError(`Class id ${notFoundId} not found`);
  });

  it("getClassById for valid Id", async () => {
    // execute and assert
    const savedClass = await ClassModel.create(testClassWithTestSessions);
    const res = await classService.getClassById(savedClass.id);
    assertResponseMatchesExpected(savedClass, res);
  });

  it("getClassById for invalid Id", async () => {
    // execute and assert
    const notFoundId = "56cb91bdc3464f14678934cd";
    await ClassModel.create(mockTestClass);
    expect(classService.getClassById(notFoundId)).rejects.toThrowError(
      `Class id ${notFoundId} not found`,
    );
  });

  it("getClassByTestSessionId for valid testSessionId", async () => {
    const savedClass = await ClassModel.create(testClassWithTestSessions);
    const res = await classService.getClassByTestSessionId(
      savedClass.testSessions[0],
    );
    assertResponseMatchesExpected(savedClass, res);
  });

  it("getClassByTestSessionId for non-existing testSessionId", async () => {
    const notFoundId = "86cb91bdc3464f14678934cd";
    await expect(async () => {
      await classService.getClassByTestSessionId(notFoundId);
    }).rejects.toThrowError(
      `Class with test session id ${notFoundId} not found`,
    );
  });

  it("getClassByTestSessionId for classes with same testSessionId", async () => {
    await ClassModel.create(testClassWithTestSessions);
    await ClassModel.create(testClassWithTestSessions);
    const testSessionId = testClassWithTestSessions.testSessions[0];
    await expect(async () => {
      await classService.getClassByTestSessionId(testSessionId);
    }).rejects.toThrowError(
      `More than one class has the same Test Session of id ${testSessionId}`,
    );
  });

  it("getClassesByTeacherId for valid testSessionId", async () => {
    const savedClass = await ClassModel.create(testClassWithTestSessions);
    const res = await classService.getClassesByTeacherId(savedClass.teacher);
    assertArrayResponseMatchesExpected([savedClass], res);
  });

  it("getClassesByTeacherId for non-existing testSessionId", async () => {
    const notFoundId = "86cb91bdc3464f14678934cd";
    const res = await classService.getClassesByTeacherId(notFoundId);
    expect(res).toEqual([]);
  });

  it("deleteClass", async () => {
    // execute
    const savedClass = await ClassModel.create(mockTestClass);

    const deletedClassId = await classService.deleteClass(savedClass.id);

    // assert
    expect(deletedClassId).toBe(savedClass.id);
  });

  it("deleteClass with non-existing id", async () => {
    const notFoundId = "86cb91bdc3464f14678934cd";
    await expect(async () => {
      await classService.deleteClass(notFoundId);
    }).rejects.toThrowError(`Class with id ${notFoundId} not found`);
  });

  it("archive class", async () => {
    // add test class
    const classObj = await ClassModel.create(mockTestClass);

    // execute
    const res = await classService.archiveClass(classObj.id);

    // assert
    expect(res.isActive).toEqual(false);
  });

  it("create student", async () => {
    const createdClass = await ClassModel.create(mockTestClass);
    // execute
    const createdClassWithStudent = await classService.createStudent(
      testStudents[0],
      createdClass.id,
    );

    // assert
    assertResponseMatchesExpected(
      testClassWithStudents,
      createdClassWithStudent,
    );
    assertStudentResponseMatchesExpected(
      testClassWithStudents.students,
      createdClassWithStudent.students,
    );
  });

  it("create student for class id not found", async () => {
    const notFoundId = "62d9fc947195ae705e71f0d9";
    // assert
    await expect(async () => {
      await classService.createStudent(testStudents[0], notFoundId);
    }).rejects.toThrowError(`Class with id ${notFoundId} not found`);
  });

  it("update student", async () => {
    // add test class
    const createdClassWithStudent = await ClassModel.create(
      testClassWithStudents,
    );

    // execute
    const res = await classService.updateStudent(
      createdClassWithStudent.students[0].id,
      createdClassWithStudent.id,
      updatedTestStudents[0],
    );

    // assert
    assertResponseMatchesExpected(updatedTestClassWithStudent, res);
    assertStudentResponseMatchesExpected(
      updatedTestClassWithStudent.students,
      res.students,
    );
  });

  it("update student for student not found", async () => {
    // execute and assert
    const createdClassWithStudent = await ClassModel.create(
      testClassWithStudents,
    );
    const notFoundId = "62d9fc947195ae705e71f0d9";
    await expect(async () => {
      await classService.updateStudent(
        notFoundId,
        createdClassWithStudent.id,
        updatedTestStudents[0],
      );
    }).rejects.toThrowError(
      `Student with id ${notFoundId} could not be updated for class with id ${createdClassWithStudent.id}`,
    );
  });

  it("deleteStudent", async () => {
    const classObj = await ClassModel.create(testClassWithStudents);
    const savedStudent = classObj.students[0];

    // execute
    const deletedStudentId = await classService.deleteStudent(
      savedStudent.id,
      classObj.id,
    );

    // assert
    expect(deletedStudentId).toBe(savedStudent.id);
  });

  it("deleteStudent with non-existing class id", async () => {
    // execute and assert
    const classObj = await ClassModel.create(testClassWithStudents);
    const notFoundId = "86cb91bdc3464f14678934cd";
    await expect(async () => {
      await classService.deleteStudent(classObj.students[0].id, notFoundId);
    }).rejects.toThrowError(
      `Student with id ${classObj.students[0].id} in class with id ${notFoundId} was not deleted`,
    );
  });
});
