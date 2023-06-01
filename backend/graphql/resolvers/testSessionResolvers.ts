import TestSessionService from "../../services/implementations/testSessionService";
import UserService from "../../services/implementations/userService";
import TestService from "../../services/implementations/testService";
import SchoolService from "../../services/implementations/schoolService";
import type {
  ITestSessionService,
  ResultRequestDTO,
  TestSessionRequestDTO,
  TestSessionResponseDTO,
} from "../../services/interfaces/testSessionService";
import type { ITestService } from "../../services/interfaces/testService";
import type IUserService from "../../services/interfaces/userService";
import type { ISchoolService } from "../../services/interfaces/schoolService";
import ClassService from "../../services/implementations/classService";
import type {
  IClassService,
  StudentResponseDTO,
} from "../../services/interfaces/classService";

const userService: IUserService = new UserService();
const schoolService: ISchoolService = new SchoolService(userService);
const testService: ITestService = new TestService();
const testSessionService: ITestSessionService = new TestSessionService(
  testService,
  userService,
  schoolService,
);
const classService: IClassService = new ClassService(
  userService,
  testSessionService,
);
testSessionService.bindClassService(classService);

const testSessionResolvers = {
  Query: {
    testSession: (_parent: undefined, { id }: { id: string }) =>
      testSessionService.getTestSessionById(id),
    testSessions: () => testSessionService.getAllTestSessions(),
    testSessionByAccessCode: (
      _parent: undefined,
      { accessCode }: { accessCode: string },
    ) => testSessionService.getTestSessionByAccessCode(accessCode),
    testSessionsByTeacherId: (
      _parent: undefined,
      { teacherId }: { teacherId: string },
    ) => testSessionService.getTestSessionsByTeacherId(teacherId),
  },
  Mutation: {
    createTestSession: (
      _req: undefined,
      { testSession }: { classId: string; testSession: TestSessionRequestDTO },
    ) => testSessionService.createTestSession(testSession),
    createTestSessionResult: (
      _req: undefined,
      { id, result }: { id: string; result: ResultRequestDTO },
    ) => testSessionService.createTestSessionResult(id, result),
    deleteTestSession: (_req: undefined, { id }: { id: string }) =>
      testSessionService.deleteTestSession(id),
  },
  TestSessionResponseDTO: {
    class: ({ class: parentClass }: TestSessionResponseDTO) =>
      classService.getClassById(parentClass),
    teacher: ({ teacher }: TestSessionResponseDTO) =>
      userService.getUserById(teacher),
    school: ({ school }: TestSessionResponseDTO) =>
      schoolService.getSchoolById(school),
    test: ({ test }: TestSessionResponseDTO) => testService.getTestById(test),
    results: async ({
      class: parentClass,
      results,
    }: TestSessionResponseDTO) => {
      // Returning all students whenever results are requested is not ideal, but
      // it's better than making the same request for each result when the
      // students are needed.
      const { students } = await classService.getClassById(parentClass);
      const studentsById = students.reduce<Record<string, StudentResponseDTO>>(
        (acc, student) => ({ ...acc, [student.id]: student }),
        {},
      );
      return results.map((result) => ({
        ...result,
        student: studentsById[result.student],
      }));
    },
  },
};
export default testSessionResolvers;
