/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Register_Teacher(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $grades: [GradeEnum!]!\n    $currentlyTeachingJM: Boolean!\n    $school: SchoolMetadataInput!\n  ) {\n    registerTeacher(\n      user: {\n        firstName: $firstName\n        lastName: $lastName\n        email: $email\n        password: $password\n        grades: $grades\n        currentlyTeachingJM: $currentlyTeachingJM\n        school: $school\n      }\n    ) {\n      id\n      firstName\n      lastName\n      email\n      role\n      accessToken\n    }\n  }\n": types.Register_TeacherDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      firstName\n      lastName\n      email\n      role\n      accessToken\n      emailVerified\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout($userId: ID!) {\n    logout(userId: $userId)\n  }\n": types.LogoutDocument,
    "\n  mutation Refresh {\n    refresh\n  }\n": types.RefreshDocument,
    "\n  mutation ResetPassword($email: String!) {\n    resetPassword(email: $email)\n  }\n": types.ResetPasswordDocument,
    "\n  mutation ResetPasswordCode($email: String!) {\n    resetPasswordCode(email: $email)\n  }\n": types.ResetPasswordCodeDocument,
    "\n  mutation VerifyEmail($oobCode: String!) {\n    verifyEmail(oobCode: $oobCode)\n  }\n": types.VerifyEmailDocument,
    "\n  mutation VerifyPasswordReset($oobCode: String!) {\n    verifyPasswordReset(oobCode: $oobCode)\n  }\n": types.VerifyPasswordResetDocument,
    "\n  mutation ConfirmPasswordReset($newPassword: String!, $oobCode: String!) {\n    confirmPasswordReset(newPassword: $newPassword, oobCode: $oobCode)\n  }\n": types.ConfirmPasswordResetDocument,
    "\n  mutation SendEmailVerificationLink($email: String!) {\n    sendEmailVerificationLink(email: $email)\n  }\n": types.SendEmailVerificationLinkDocument,
    "\n  mutation CreateClass($classObj: ClassRequestDTO!) {\n    createClass(classObj: $classObj) {\n      id\n      className\n      schoolYear\n      gradeLevel\n    }\n  }\n": types.CreateClassDocument,
    "\n  mutation CreateStudent($student: StudentRequestDTO!, $classId: ID!) {\n    createStudent(student: $student, classId: $classId) {\n      id\n    }\n  }\n": types.CreateStudentDocument,
    "\n  mutation PublishTest($id: ID!) {\n    publishTest(id: $id) {\n      id\n    }\n  }\n": types.PublishTestDocument,
    "\n  mutation DuplicateTest($id: ID!) {\n    duplicateTest(id: $id) {\n      id\n    }\n  }\n": types.DuplicateTestDocument,
    "\n  mutation DeleteTest($id: ID!) {\n    deleteTest(id: $id)\n  }\n": types.DeleteTestDocument,
    "\n  mutation UnarchiveTest($id: ID!) {\n    unarchiveTest(id: $id) {\n      id\n    }\n  }\n": types.UnarchiveTestDocument,
    "\n  mutation ArchiveTest($id: ID!) {\n    archiveTest(id: $id) {\n      id\n    }\n  }\n": types.ArchiveTestDocument,
    "\n  mutation CreateTest($test: TestRequestDTO!) {\n    createTest(test: $test) {\n      id\n    }\n  }\n": types.CreateTestDocument,
    "\n  mutation UpdateTest($id: ID!, $test: TestRequestDTO!) {\n    updateTest(id: $id, test: $test) {\n      id\n    }\n  }\n": types.UpdateTestDocument,
    "\n  mutation CreateTestSession($testSession: TestSessionRequestDTO!) {\n    createTestSession(testSession: $testSession) {\n      id\n    }\n  }\n": types.CreateTestSessionDocument,
    "\n  mutation AddUser($user: CreateUserDTO!) {\n    createUser(user: $user) {\n      id\n      firstName\n      lastName\n      email\n      role\n    }\n  }\n": types.AddUserDocument,
    "\n  mutation DeleteUserByEmail($email: String!) {\n    deleteUserByEmail(email: $email)\n  }\n": types.DeleteUserByEmailDocument,
    "\n  query ClassByTestSession($testSessionId: ID!) {\n    classByTestSession(testSessionId: $testSessionId) {\n      id\n      className\n      students {\n        id\n        firstName\n        lastName\n        studentNumber\n      }\n    }\n  }\n": types.ClassByTestSessionDocument,
    "\n  query ClassesByTeacher($teacherId: ID!) {\n    classesByTeacher(teacherId: $teacherId) {\n      id\n      students {\n        id\n        firstName\n        lastName\n        studentNumber\n      }\n    }\n  }\n": types.ClassesByTeacherDocument,
    "\n  query GetSchool($id: ID!) {\n    school(id: $id) {\n      id\n      name\n      country\n      subRegion\n      city\n      address\n      teachers {\n        id\n        firstName\n        lastName\n        email\n        role\n      }\n    }\n  }\n": types.GetSchoolDocument,
    "\n  query GetAllSchools {\n    schools {\n      id\n      name\n      country\n      subRegion\n      city\n      address\n      teachers {\n        id\n        firstName\n        lastName\n        email\n        role\n      }\n    }\n  }\n": types.GetAllSchoolsDocument,
    "\n  query GetTest($id: ID!) {\n    test(id: $id) {\n      id\n      name\n      questions {\n        type\n        metadata {\n          ... on QuestionTextMetadata {\n            questionText\n          }\n          ... on TextMetadata {\n            text\n          }\n          ... on ImageMetadata {\n            filePath\n            url\n          }\n          ... on MultipleChoiceMetadata {\n            options\n            answerIndex\n          }\n          ... on MultiSelectMetadata {\n            options\n            answerIndices\n          }\n          ... on ShortAnswerMetadata {\n            answer\n          }\n        }\n      }\n      grade\n      assessmentType\n      curriculumCountry\n      curriculumRegion\n      status\n      updatedAt\n    }\n  }\n": types.GetTestDocument,
    "\n  query GetAllTests {\n    tests {\n      id\n      name\n      grade\n      assessmentType\n      curriculumCountry\n      curriculumRegion\n      status\n      updatedAt\n    }\n  }\n": types.GetAllTestsDocument,
    "\n  query TestSessionByAccessCode($accessCode: String!) {\n    testSessionByAccessCode(accessCode: $accessCode) {\n      id\n      test {\n        id\n      }\n      notes\n      startDate\n    }\n  }\n": types.TestSessionByAccessCodeDocument,
    "\n  query TestSessionsByTeacherId($teacherId: String!) {\n    testSessionsByTeacherId(teacherId: $teacherId) {\n      id\n      test {\n        name\n      }\n      class {\n        className\n      }\n      startDate\n      endDate\n      accessCode\n    }\n  }\n": types.TestSessionsByTeacherIdDocument,
    "\n  query GetUsersByRole($role: String!) {\n    usersByRole(role: $role) {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n": types.GetUsersByRoleDocument,
    "\n  query GetUserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      id\n      firstName\n      lastName\n      email\n      role\n    }\n  }\n": types.GetUserByEmailDocument,
    "\n  query GetAllTeachers {\n    teachers {\n      id\n      firstName\n      lastName\n      email\n      school\n    }\n  }\n": types.GetAllTeachersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register_Teacher(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $grades: [GradeEnum!]!\n    $currentlyTeachingJM: Boolean!\n    $school: SchoolMetadataInput!\n  ) {\n    registerTeacher(\n      user: {\n        firstName: $firstName\n        lastName: $lastName\n        email: $email\n        password: $password\n        grades: $grades\n        currentlyTeachingJM: $currentlyTeachingJM\n        school: $school\n      }\n    ) {\n      id\n      firstName\n      lastName\n      email\n      role\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation Register_Teacher(\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $password: String!\n    $grades: [GradeEnum!]!\n    $currentlyTeachingJM: Boolean!\n    $school: SchoolMetadataInput!\n  ) {\n    registerTeacher(\n      user: {\n        firstName: $firstName\n        lastName: $lastName\n        email: $email\n        password: $password\n        grades: $grades\n        currentlyTeachingJM: $currentlyTeachingJM\n        school: $school\n      }\n    ) {\n      id\n      firstName\n      lastName\n      email\n      role\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      firstName\n      lastName\n      email\n      role\n      accessToken\n      emailVerified\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      firstName\n      lastName\n      email\n      role\n      accessToken\n      emailVerified\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout($userId: ID!) {\n    logout(userId: $userId)\n  }\n"): (typeof documents)["\n  mutation Logout($userId: ID!) {\n    logout(userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Refresh {\n    refresh\n  }\n"): (typeof documents)["\n  mutation Refresh {\n    refresh\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResetPassword($email: String!) {\n    resetPassword(email: $email)\n  }\n"): (typeof documents)["\n  mutation ResetPassword($email: String!) {\n    resetPassword(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResetPasswordCode($email: String!) {\n    resetPasswordCode(email: $email)\n  }\n"): (typeof documents)["\n  mutation ResetPasswordCode($email: String!) {\n    resetPasswordCode(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VerifyEmail($oobCode: String!) {\n    verifyEmail(oobCode: $oobCode)\n  }\n"): (typeof documents)["\n  mutation VerifyEmail($oobCode: String!) {\n    verifyEmail(oobCode: $oobCode)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VerifyPasswordReset($oobCode: String!) {\n    verifyPasswordReset(oobCode: $oobCode)\n  }\n"): (typeof documents)["\n  mutation VerifyPasswordReset($oobCode: String!) {\n    verifyPasswordReset(oobCode: $oobCode)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ConfirmPasswordReset($newPassword: String!, $oobCode: String!) {\n    confirmPasswordReset(newPassword: $newPassword, oobCode: $oobCode)\n  }\n"): (typeof documents)["\n  mutation ConfirmPasswordReset($newPassword: String!, $oobCode: String!) {\n    confirmPasswordReset(newPassword: $newPassword, oobCode: $oobCode)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendEmailVerificationLink($email: String!) {\n    sendEmailVerificationLink(email: $email)\n  }\n"): (typeof documents)["\n  mutation SendEmailVerificationLink($email: String!) {\n    sendEmailVerificationLink(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateClass($classObj: ClassRequestDTO!) {\n    createClass(classObj: $classObj) {\n      id\n      className\n      schoolYear\n      gradeLevel\n    }\n  }\n"): (typeof documents)["\n  mutation CreateClass($classObj: ClassRequestDTO!) {\n    createClass(classObj: $classObj) {\n      id\n      className\n      schoolYear\n      gradeLevel\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateStudent($student: StudentRequestDTO!, $classId: ID!) {\n    createStudent(student: $student, classId: $classId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateStudent($student: StudentRequestDTO!, $classId: ID!) {\n    createStudent(student: $student, classId: $classId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation PublishTest($id: ID!) {\n    publishTest(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation PublishTest($id: ID!) {\n    publishTest(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DuplicateTest($id: ID!) {\n    duplicateTest(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DuplicateTest($id: ID!) {\n    duplicateTest(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTest($id: ID!) {\n    deleteTest(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteTest($id: ID!) {\n    deleteTest(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnarchiveTest($id: ID!) {\n    unarchiveTest(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UnarchiveTest($id: ID!) {\n    unarchiveTest(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ArchiveTest($id: ID!) {\n    archiveTest(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation ArchiveTest($id: ID!) {\n    archiveTest(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTest($test: TestRequestDTO!) {\n    createTest(test: $test) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTest($test: TestRequestDTO!) {\n    createTest(test: $test) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTest($id: ID!, $test: TestRequestDTO!) {\n    updateTest(id: $id, test: $test) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTest($id: ID!, $test: TestRequestDTO!) {\n    updateTest(id: $id, test: $test) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTestSession($testSession: TestSessionRequestDTO!) {\n    createTestSession(testSession: $testSession) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTestSession($testSession: TestSessionRequestDTO!) {\n    createTestSession(testSession: $testSession) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddUser($user: CreateUserDTO!) {\n    createUser(user: $user) {\n      id\n      firstName\n      lastName\n      email\n      role\n    }\n  }\n"): (typeof documents)["\n  mutation AddUser($user: CreateUserDTO!) {\n    createUser(user: $user) {\n      id\n      firstName\n      lastName\n      email\n      role\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUserByEmail($email: String!) {\n    deleteUserByEmail(email: $email)\n  }\n"): (typeof documents)["\n  mutation DeleteUserByEmail($email: String!) {\n    deleteUserByEmail(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ClassByTestSession($testSessionId: ID!) {\n    classByTestSession(testSessionId: $testSessionId) {\n      id\n      className\n      students {\n        id\n        firstName\n        lastName\n        studentNumber\n      }\n    }\n  }\n"): (typeof documents)["\n  query ClassByTestSession($testSessionId: ID!) {\n    classByTestSession(testSessionId: $testSessionId) {\n      id\n      className\n      students {\n        id\n        firstName\n        lastName\n        studentNumber\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ClassesByTeacher($teacherId: ID!) {\n    classesByTeacher(teacherId: $teacherId) {\n      id\n      students {\n        id\n        firstName\n        lastName\n        studentNumber\n      }\n    }\n  }\n"): (typeof documents)["\n  query ClassesByTeacher($teacherId: ID!) {\n    classesByTeacher(teacherId: $teacherId) {\n      id\n      students {\n        id\n        firstName\n        lastName\n        studentNumber\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSchool($id: ID!) {\n    school(id: $id) {\n      id\n      name\n      country\n      subRegion\n      city\n      address\n      teachers {\n        id\n        firstName\n        lastName\n        email\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSchool($id: ID!) {\n    school(id: $id) {\n      id\n      name\n      country\n      subRegion\n      city\n      address\n      teachers {\n        id\n        firstName\n        lastName\n        email\n        role\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllSchools {\n    schools {\n      id\n      name\n      country\n      subRegion\n      city\n      address\n      teachers {\n        id\n        firstName\n        lastName\n        email\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllSchools {\n    schools {\n      id\n      name\n      country\n      subRegion\n      city\n      address\n      teachers {\n        id\n        firstName\n        lastName\n        email\n        role\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTest($id: ID!) {\n    test(id: $id) {\n      id\n      name\n      questions {\n        type\n        metadata {\n          ... on QuestionTextMetadata {\n            questionText\n          }\n          ... on TextMetadata {\n            text\n          }\n          ... on ImageMetadata {\n            filePath\n            url\n          }\n          ... on MultipleChoiceMetadata {\n            options\n            answerIndex\n          }\n          ... on MultiSelectMetadata {\n            options\n            answerIndices\n          }\n          ... on ShortAnswerMetadata {\n            answer\n          }\n        }\n      }\n      grade\n      assessmentType\n      curriculumCountry\n      curriculumRegion\n      status\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetTest($id: ID!) {\n    test(id: $id) {\n      id\n      name\n      questions {\n        type\n        metadata {\n          ... on QuestionTextMetadata {\n            questionText\n          }\n          ... on TextMetadata {\n            text\n          }\n          ... on ImageMetadata {\n            filePath\n            url\n          }\n          ... on MultipleChoiceMetadata {\n            options\n            answerIndex\n          }\n          ... on MultiSelectMetadata {\n            options\n            answerIndices\n          }\n          ... on ShortAnswerMetadata {\n            answer\n          }\n        }\n      }\n      grade\n      assessmentType\n      curriculumCountry\n      curriculumRegion\n      status\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllTests {\n    tests {\n      id\n      name\n      grade\n      assessmentType\n      curriculumCountry\n      curriculumRegion\n      status\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetAllTests {\n    tests {\n      id\n      name\n      grade\n      assessmentType\n      curriculumCountry\n      curriculumRegion\n      status\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TestSessionByAccessCode($accessCode: String!) {\n    testSessionByAccessCode(accessCode: $accessCode) {\n      id\n      test {\n        id\n      }\n      notes\n      startDate\n    }\n  }\n"): (typeof documents)["\n  query TestSessionByAccessCode($accessCode: String!) {\n    testSessionByAccessCode(accessCode: $accessCode) {\n      id\n      test {\n        id\n      }\n      notes\n      startDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TestSessionsByTeacherId($teacherId: String!) {\n    testSessionsByTeacherId(teacherId: $teacherId) {\n      id\n      test {\n        name\n      }\n      class {\n        className\n      }\n      startDate\n      endDate\n      accessCode\n    }\n  }\n"): (typeof documents)["\n  query TestSessionsByTeacherId($teacherId: String!) {\n    testSessionsByTeacherId(teacherId: $teacherId) {\n      id\n      test {\n        name\n      }\n      class {\n        className\n      }\n      startDate\n      endDate\n      accessCode\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsersByRole($role: String!) {\n    usersByRole(role: $role) {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetUsersByRole($role: String!) {\n    usersByRole(role: $role) {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      id\n      firstName\n      lastName\n      email\n      role\n    }\n  }\n"): (typeof documents)["\n  query GetUserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      id\n      firstName\n      lastName\n      email\n      role\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllTeachers {\n    teachers {\n      id\n      firstName\n      lastName\n      email\n      school\n    }\n  }\n"): (typeof documents)["\n  query GetAllTeachers {\n    teachers {\n      id\n      firstName\n      lastName\n      email\n      school\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;