import ClassModel from "../../../models/class.model";
import TestSessionModel from "../../../models/testSession.model";
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
  assertTestableStudentsResponseMatchesExpected,
} from "../../../testUtils/classAssertions";
import UserService from "../userService";
import { mockTeacher } from "../../../testUtils/users";
import TestSessionService from "../testSessionService";
import type TestService from "../testService";
import {
  mockGradedTestResult,
  mockTestSession,
  mockTestSessionWithExpiredStartDate,
  mockTestSessionWithId,
  mockTestSessions,
} from "../../../testUtils/testSession";

describe("mongo classService", (): void => {
  let classService: ClassService;
  let userService: UserService;
  let testSessionService: TestSessionService;
  let testService: TestService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    userService = new UserService();
    testSessionService = new TestSessionService(testService);
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

  describe("getTestableStudentsByTestSessionId", () => {
    it("for valid testSessionId", async () => {
      const savedClass = await ClassModel.create(testClass[0]);
      testSessionService.getTestSessionById = jest.fn().mockReturnValue({
        ...mockTestSessionWithId,
        class: savedClass.id,
      });

      const res = await classService.getTestableStudentsByTestSessionId(
        mockTestSessionWithId.id,
      );
      assertTestableStudentsResponseMatchesExpected(savedClass, res);
    });

    it("for non-existing testSessionId", async () => {
      const notFoundId = "86cb91bdc3464f14678934cd";
      await expect(async () => {
        await classService.getTestableStudentsByTestSessionId(notFoundId);
      }).rejects.toThrowError(
        `Class with test session id ${notFoundId} not found`,
      );
    });

    it("for test session with existing results", async () => {
      const savedClass = await ClassModel.create(testClassWithStudents);
      testSessionService.getTestSessionById = jest.fn().mockReturnValue({
        ...mockTestSessionWithId,
        class: savedClass.id,
        results: [
          {
            ...mockGradedTestResult,
            student: savedClass.students[0].id,
          },
        ],
      });

      const res = await classService.getTestableStudentsByTestSessionId(
        mockTestSessionWithId.id,
      );
      expect(savedClass.id).not.toBeNull();
      expect(savedClass.className).toEqual(res.className);
      assertStudentResponseMatchesExpected(res.students, [
        savedClass.students[1],
      ]);
    });
  });

  it("getClassesByTeacherId for valid teacher id", async () => {
    const savedClass = await ClassModel.create(testClass[0]);
    const res = await classService.getClassesByTeacherId(savedClass.teacher);
    assertArrayResponseMatchesExpected([savedClass], res);
  });

  it("getClassesByTeacherId for non-existing teacher id", async () => {
    const notFoundId = "86cb91bdc3464f14678934cd";
    const res = await classService.getClassesByTeacherId(notFoundId);
    expect(res).toEqual([]);
  });

  it("deleteClass", async () => {
    const savedClass = await ClassModel.create(testClass[0]);
    await TestSessionModel.insertMany(
      mockTestSessions.map((testSession) => ({
        ...testSession,
        class: savedClass.id,
      })),
    );

    // execute
    const deletedClassId = await classService.deleteClass(savedClass.id);

    // assert
    expect(deletedClassId).toBe(savedClass.id);

    const associatedTestSession = await TestSessionModel.find({
      class: savedClass.id,
    });
    expect(associatedTestSession).toEqual([]);
  });

  it("deleteClass with non-existing id", async () => {
    const notFoundId = "86cb91bdc3464f14678934cd";
    await expect(async () => {
      await classService.deleteClass(notFoundId);
    }).rejects.toThrowError(`Class with id ${notFoundId} not found`);
  });

  it("archive class", async () => {
    // add class
    const classObj = await ClassModel.create(testClass[0]);

    // add test sessions
    const [activeTestSession, upcomingTestSession] =
      await TestSessionModel.insertMany([
        {
          ...mockTestSession,
          class: classObj.id,
        },
        {
          ...mockTestSessionWithExpiredStartDate,
          class: classObj.id,
        },
      ]);

    // execute
    const nowDate = new Date();
    const archivedClassId = await classService.archiveClass(
      classObj.id,
      nowDate,
    );

    // assert
    expect(archivedClassId).toBe(classObj.id);

    const updatedActiveTestSession = await TestSessionModel.findById(
      activeTestSession.id,
    );
    expect(updatedActiveTestSession?.endDate).toEqual(nowDate);

    const updatedUpcomingTestSession = await TestSessionModel.findById(
      upcomingTestSession.id,
    );
    expect(updatedUpcomingTestSession).toBeNull();
  });

  it("archive class with non-existing id", async () => {
    const notFoundId = "86cb91bdc3464f14678934cd";
    await expect(async () => {
      await classService.archiveClass(notFoundId);
    }).rejects.toThrowError(`Class with id ${notFoundId} not found`);
  });

  it("archive class that is already archived", async () => {
    const classObj = await ClassModel.create({
      ...testClass[0],
      isActive: false,
    });
    await expect(async () => {
      await classService.archiveClass(classObj.id);
    }).rejects.toThrowError(
      `Class with id ${classObj.id} not found or not currently active`,
    );
  });

  it("create student", async () => {
    const createdClass = await ClassModel.create(testClass[0]);
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

  describe("deleteStudent", () => {
    it("with valid class and student id", async () => {
      const classObj = await ClassModel.create(testClassWithStudents);
      const savedStudent = classObj.students[0];
      const testSession = await TestSessionModel.create({
        ...mockTestSession,
        class: classObj.id,
        results: [
          mockGradedTestResult,
          {
            ...mockGradedTestResult,
            student: savedStudent.id,
          },
        ],
      });
      expect(testSession?.results?.length).toEqual(2);

      // execute
      const deletedStudentId = await classService.deleteStudent(
        savedStudent.id,
        classObj.id,
      );

      // assert
      expect(deletedStudentId).toBe(savedStudent.id);

      const updatedTestSession = await testSessionService.getTestSessionById(
        testSession.id,
      );
      expect(updatedTestSession?.results).toEqual([mockGradedTestResult]);
    });

    it("with non-existing class id", async () => {
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
});
