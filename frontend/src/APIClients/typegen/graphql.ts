/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** GraphQL Date scalar type */
  Date: any;
  FileUpload: any;
  Upload: any;
};

export enum AssessmentTypeEnum {
  Beginning = 'BEGINNING',
  End = 'END'
}

export type AuthDto = {
  __typename?: 'AuthDTO';
  accessToken: Scalars['String'];
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['Boolean']>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  role: Role;
};

export type ClassRequestDto = {
  className: Scalars['String'];
  gradeLevel: GradeEnum;
  schoolYear: Scalars['Int'];
  teacher: Scalars['String'];
};

export type ClassResponseDto = {
  __typename?: 'ClassResponseDTO';
  className: Scalars['String'];
  gradeLevel: GradeEnum;
  id: Scalars['String'];
  schoolYear: Scalars['Int'];
  students: Array<Maybe<StudentResponseDto>>;
  teacher?: Maybe<UserDto>;
  testSessions: Array<Maybe<TestSessionResponseDto>>;
};

export type CreateUserDto = {
  class?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  currentlyTeachingJM?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  grades?: InputMaybe<Array<InputMaybe<GradeEnum>>>;
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: Role;
};

export type EntityRequestDto = {
  boolField: Scalars['Boolean'];
  contentType?: InputMaybe<Scalars['String']>;
  enumField: Enum;
  filePath?: InputMaybe<Scalars['String']>;
  intField: Scalars['Int'];
  stringArrayField: Array<InputMaybe<Scalars['String']>>;
  stringField: Scalars['String'];
};

export type EntityResponseDto = {
  __typename?: 'EntityResponseDTO';
  boolField: Scalars['Boolean'];
  enumField: Enum;
  fileName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  intField: Scalars['Int'];
  stringArrayField: Array<Maybe<Scalars['String']>>;
  stringField: Scalars['String'];
};

export enum Enum {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export type FractionMetadata = {
  __typename?: 'FractionMetadata';
  denominator: Scalars['Int'];
  numerator: Scalars['Int'];
};

export type FractionMetadataInput = {
  denominator: Scalars['Int'];
  numerator: Scalars['Int'];
};

export enum GradeEnum {
  Grade_1 = 'GRADE_1',
  Grade_2 = 'GRADE_2',
  Grade_3 = 'GRADE_3',
  Grade_4 = 'GRADE_4',
  Grade_5 = 'GRADE_5',
  Grade_6 = 'GRADE_6',
  Grade_7 = 'GRADE_7',
  Grade_8 = 'GRADE_8',
  K = 'K'
}

export type ImageMetadata = {
  __typename?: 'ImageMetadata';
  filePath: Scalars['String'];
  url: Scalars['String'];
};

export type ImageMetadataRequestInput = {
  file?: InputMaybe<Scalars['FileUpload']>;
  previewUrl: Scalars['String'];
};

export type MultiSelectMetadata = {
  __typename?: 'MultiSelectMetadata';
  answerIndices: Array<Scalars['Int']>;
  options: Array<Scalars['String']>;
};

export type MultiSelectMetadataInput = {
  answerIndices: Array<Scalars['Int']>;
  options: Array<Scalars['String']>;
};

export type MultipleChoiceMetadata = {
  __typename?: 'MultipleChoiceMetadata';
  answerIndex: Scalars['Int'];
  options: Array<Scalars['String']>;
};

export type MultipleChoiceMetadataInput = {
  answerIndex: Scalars['Int'];
  options: Array<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  archiveTest: TestResponseDto;
  confirmPasswordReset: Scalars['Boolean'];
  createClass: ClassResponseDto;
  createEntity: EntityResponseDto;
  createSimpleEntity: SimpleEntityResponseDto;
  createStudent: ClassResponseDto;
  createTest: TestResponseDto;
  createTestSession: TestSessionResponseDto;
  createUser: UserDto;
  deleteEntity?: Maybe<Scalars['ID']>;
  deleteSimpleEntity?: Maybe<Scalars['ID']>;
  deleteTest?: Maybe<Scalars['ID']>;
  deleteUserByEmail?: Maybe<Scalars['ID']>;
  deleteUserById?: Maybe<Scalars['ID']>;
  duplicateTest: TestResponseDto;
  login: AuthDto;
  logout?: Maybe<Scalars['ID']>;
  publishTest: TestResponseDto;
  refresh: Scalars['String'];
  registerTeacher: AuthDto;
  resetPassword: Scalars['Boolean'];
  resetPasswordCode: Scalars['String'];
  sendEmailVerificationLink: Scalars['Boolean'];
  unarchiveTest: TestResponseDto;
  updateEntity: EntityResponseDto;
  updateSimpleEntity: SimpleEntityResponseDto;
  updateTest: TestResponseDto;
  updateUser: UserDto;
  verifyEmail: Scalars['String'];
  verifyPasswordReset: Scalars['String'];
};


export type MutationArchiveTestArgs = {
  id: Scalars['ID'];
};


export type MutationConfirmPasswordResetArgs = {
  newPassword: Scalars['String'];
  oobCode: Scalars['String'];
};


export type MutationCreateClassArgs = {
  classObj: ClassRequestDto;
};


export type MutationCreateEntityArgs = {
  entity: EntityRequestDto;
  file?: InputMaybe<Scalars['Upload']>;
};


export type MutationCreateSimpleEntityArgs = {
  entity: SimpleEntityRequestDto;
};


export type MutationCreateStudentArgs = {
  classId: Scalars['ID'];
  student: StudentRequestDto;
};


export type MutationCreateTestArgs = {
  test: TestRequestDto;
};


export type MutationCreateTestSessionArgs = {
  testSession: TestSessionRequestDto;
};


export type MutationCreateUserArgs = {
  user: CreateUserDto;
};


export type MutationDeleteEntityArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSimpleEntityArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTestArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserByEmailArgs = {
  email: Scalars['String'];
};


export type MutationDeleteUserByIdArgs = {
  id: Scalars['ID'];
};


export type MutationDuplicateTestArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLogoutArgs = {
  userId: Scalars['ID'];
};


export type MutationPublishTestArgs = {
  id: Scalars['ID'];
};


export type MutationRegisterTeacherArgs = {
  user: RegisterTeacherDto;
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordCodeArgs = {
  email: Scalars['String'];
};


export type MutationSendEmailVerificationLinkArgs = {
  email: Scalars['String'];
};


export type MutationUnarchiveTestArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateEntityArgs = {
  entity: EntityRequestDto;
  file?: InputMaybe<Scalars['Upload']>;
  id: Scalars['ID'];
};


export type MutationUpdateSimpleEntityArgs = {
  entity: SimpleEntityRequestDto;
  id: Scalars['ID'];
};


export type MutationUpdateTestArgs = {
  id: Scalars['ID'];
  test: TestRequestDto;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  user: UpdateUserDto;
};


export type MutationVerifyEmailArgs = {
  oobCode: Scalars['String'];
};


export type MutationVerifyPasswordResetArgs = {
  oobCode: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  classByTestSession: ClassResponseDto;
  classesByTeacher: Array<ClassResponseDto>;
  entities: Array<EntityResponseDto>;
  entitiesCSV: Scalars['String'];
  entity: EntityResponseDto;
  file: Scalars['String'];
  school: SchoolResponseDto;
  schools?: Maybe<Array<SchoolResponseDto>>;
  simpleEntities: Array<SimpleEntityResponseDto>;
  simpleEntitiesCSV: Scalars['String'];
  simpleEntity: SimpleEntityResponseDto;
  teachers?: Maybe<Array<Maybe<TeacherDto>>>;
  test: TestResponseDto;
  testSession: TestSessionResponseDto;
  testSessionByAccessCode: TestSessionResponseDto;
  testSessions: Array<Maybe<TestSessionResponseDto>>;
  testSessionsByTeacherId: Array<TestSessionResponseDto>;
  tests: Array<Maybe<TestResponseDto>>;
  userByEmail: UserDto;
  userById: UserDto;
  users: Array<UserDto>;
  usersByRole: Array<UserDto>;
  usersCSV: Scalars['String'];
};


export type QueryClassByTestSessionArgs = {
  testSessionId: Scalars['ID'];
};


export type QueryClassesByTeacherArgs = {
  teacherId: Scalars['ID'];
};


export type QueryEntityArgs = {
  id: Scalars['ID'];
};


export type QueryFileArgs = {
  fileUUID: Scalars['ID'];
};


export type QuerySchoolArgs = {
  id: Scalars['ID'];
};


export type QuerySimpleEntityArgs = {
  id: Scalars['ID'];
};


export type QueryTestArgs = {
  id: Scalars['ID'];
};


export type QueryTestSessionArgs = {
  id: Scalars['String'];
};


export type QueryTestSessionByAccessCodeArgs = {
  accessCode: Scalars['String'];
};


export type QueryTestSessionsByTeacherIdArgs = {
  teacherId: Scalars['String'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUsersByRoleArgs = {
  role: Scalars['String'];
};

export type QuestionComponent = {
  __typename?: 'QuestionComponent';
  metadata: QuestionComponentMetadata;
  type: QuestionComponentTypeEnum;
};

export type QuestionComponentInput = {
  fractionMetadata?: InputMaybe<FractionMetadataInput>;
  imageMetadataRequest?: InputMaybe<ImageMetadataRequestInput>;
  multiSelectMetadata?: InputMaybe<MultiSelectMetadataInput>;
  multipleChoiceMetadata?: InputMaybe<MultipleChoiceMetadataInput>;
  questionTextMetadata?: InputMaybe<QuestionTextMetadataInput>;
  shortAnswerMetadata?: InputMaybe<ShortAnswerMetadataInput>;
  textMetadata?: InputMaybe<TextMetadataInput>;
  type: QuestionComponentTypeEnum;
};

export type QuestionComponentMetadata = FractionMetadata | ImageMetadata | MultiSelectMetadata | MultipleChoiceMetadata | QuestionTextMetadata | ShortAnswerMetadata | TextMetadata;

export enum QuestionComponentTypeEnum {
  Fraction = 'FRACTION',
  Image = 'IMAGE',
  MultipleChoice = 'MULTIPLE_CHOICE',
  MultiSelect = 'MULTI_SELECT',
  QuestionText = 'QUESTION_TEXT',
  ShortAnswer = 'SHORT_ANSWER',
  Text = 'TEXT'
}

export type QuestionTextMetadata = {
  __typename?: 'QuestionTextMetadata';
  questionText: Scalars['String'];
};

export type QuestionTextMetadataInput = {
  questionText: Scalars['String'];
};

export type RegisterTeacherDto = {
  currentlyTeachingJM: Scalars['Boolean'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  grades: Array<GradeEnum>;
  lastName: Scalars['String'];
  password: Scalars['String'];
  school: SchoolMetadataInput;
};

export type ResultRequestDto = {
  answers: Array<InputMaybe<Array<InputMaybe<Array<InputMaybe<Scalars['Float']>>>>>>;
  student: Scalars['String'];
};

export type ResultResponseDto = {
  __typename?: 'ResultResponseDTO';
  answers: Array<Maybe<Array<Maybe<Array<Maybe<Scalars['Float']>>>>>>;
  breakdown: Array<Maybe<Array<Maybe<Scalars['Boolean']>>>>;
  score: Scalars['Float'];
  student: Scalars['String'];
};

export enum Role {
  Admin = 'Admin',
  Teacher = 'Teacher'
}

export type SchoolMetadataInput = {
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  district: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type SchoolResponseDto = {
  __typename?: 'SchoolResponseDTO';
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  subRegion: Scalars['String'];
  teachers: Array<UserDto>;
};

export type ShortAnswerMetadata = {
  __typename?: 'ShortAnswerMetadata';
  answer: Scalars['Float'];
};

export type ShortAnswerMetadataInput = {
  answer: Scalars['Float'];
};

export enum SimpleEntityEnum {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export type SimpleEntityRequestDto = {
  boolField: Scalars['Boolean'];
  enumField: Enum;
  intField: Scalars['Int'];
  stringArrayField: Array<InputMaybe<Scalars['String']>>;
  stringField: Scalars['String'];
};

export type SimpleEntityResponseDto = {
  __typename?: 'SimpleEntityResponseDTO';
  boolField: Scalars['Boolean'];
  enumField: SimpleEntityEnum;
  id: Scalars['ID'];
  intField: Scalars['Int'];
  stringArrayField: Array<Maybe<Scalars['String']>>;
  stringField: Scalars['String'];
};

export enum StatusEnum {
  Archived = 'ARCHIVED',
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type StudentRequestDto = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  studentNumber?: InputMaybe<Scalars['String']>;
};

export type StudentResponseDto = {
  __typename?: 'StudentResponseDTO';
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  studentNumber?: Maybe<Scalars['String']>;
};

export type TeacherDto = {
  __typename?: 'TeacherDTO';
  class?: Maybe<Array<Maybe<Scalars['String']>>>;
  currentlyTeachingJM?: Maybe<Scalars['Boolean']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  grades?: Maybe<Array<Maybe<GradeEnum>>>;
  id: Scalars['ID'];
  lastName: Scalars['String'];
  school: Scalars['String'];
};

export type TestRequestDto = {
  assessmentType: AssessmentTypeEnum;
  curriculumCountry: Scalars['String'];
  curriculumRegion: Scalars['String'];
  grade: GradeEnum;
  name: Scalars['String'];
  questions: Array<InputMaybe<Array<InputMaybe<QuestionComponentInput>>>>;
  status: StatusEnum;
};

export type TestResponseDto = {
  __typename?: 'TestResponseDTO';
  assessmentType: AssessmentTypeEnum;
  curriculumCountry: Scalars['String'];
  curriculumRegion: Scalars['String'];
  grade: GradeEnum;
  id: Scalars['ID'];
  name: Scalars['String'];
  questions: Array<Maybe<Array<Maybe<QuestionComponent>>>>;
  status: StatusEnum;
  updatedAt: Scalars['Date'];
};

export type TestSessionRequestDto = {
  accessCode: Scalars['String'];
  class: Scalars['ID'];
  endDate: Scalars['Date'];
  notes?: InputMaybe<Scalars['String']>;
  school: Scalars['ID'];
  startDate: Scalars['Date'];
  teacher: Scalars['ID'];
  test: Scalars['ID'];
};

export type TestSessionResponseDto = {
  __typename?: 'TestSessionResponseDTO';
  accessCode: Scalars['String'];
  class: ClassResponseDto;
  endDate: Scalars['Date'];
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
  results?: Maybe<Array<Maybe<ResultResponseDto>>>;
  school: SchoolResponseDto;
  startDate: Scalars['Date'];
  teacher: UserDto;
  test: TestResponseDto;
};

export type TextMetadata = {
  __typename?: 'TextMetadata';
  text: Scalars['String'];
};

export type TextMetadataInput = {
  text: Scalars['String'];
};

export type UpdateUserDto = {
  class?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  currentlyTeachingJM?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  grades?: InputMaybe<Array<InputMaybe<GradeEnum>>>;
  lastName: Scalars['String'];
  role: Role;
};

export type UserDto = {
  __typename?: 'UserDTO';
  class?: Maybe<Array<Maybe<Scalars['String']>>>;
  currentlyTeachingJM?: Maybe<Scalars['Boolean']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  grades?: Maybe<Array<Maybe<GradeEnum>>>;
  id: Scalars['ID'];
  lastName: Scalars['String'];
  role: Role;
};

export type Register_TeacherMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  grades: Array<GradeEnum> | GradeEnum;
  currentlyTeachingJM: Scalars['Boolean'];
  school: SchoolMetadataInput;
}>;


export type Register_TeacherMutation = { __typename?: 'Mutation', registerTeacher: { __typename?: 'AuthDTO', id: string, firstName: string, lastName: string, email: string, role: Role, accessToken: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthDTO', id: string, firstName: string, lastName: string, email: string, role: Role, accessToken: string, emailVerified?: boolean | null } };

export type LogoutMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: string | null };

export type RefreshMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshMutation = { __typename?: 'Mutation', refresh: string };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type ResetPasswordCodeMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResetPasswordCodeMutation = { __typename?: 'Mutation', resetPasswordCode: string };

export type VerifyEmailMutationVariables = Exact<{
  oobCode: Scalars['String'];
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: string };

export type VerifyPasswordResetMutationVariables = Exact<{
  oobCode: Scalars['String'];
}>;


export type VerifyPasswordResetMutation = { __typename?: 'Mutation', verifyPasswordReset: string };

export type ConfirmPasswordResetMutationVariables = Exact<{
  newPassword: Scalars['String'];
  oobCode: Scalars['String'];
}>;


export type ConfirmPasswordResetMutation = { __typename?: 'Mutation', confirmPasswordReset: boolean };

export type SendEmailVerificationLinkMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendEmailVerificationLinkMutation = { __typename?: 'Mutation', sendEmailVerificationLink: boolean };

export type CreateClassMutationVariables = Exact<{
  classObj: ClassRequestDto;
}>;


export type CreateClassMutation = { __typename?: 'Mutation', createClass: { __typename?: 'ClassResponseDTO', id: string, className: string, schoolYear: number, gradeLevel: GradeEnum } };

export type CreateStudentMutationVariables = Exact<{
  student: StudentRequestDto;
  classId: Scalars['ID'];
}>;


export type CreateStudentMutation = { __typename?: 'Mutation', createStudent: { __typename?: 'ClassResponseDTO', id: string } };

export type PublishTestMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PublishTestMutation = { __typename?: 'Mutation', publishTest: { __typename?: 'TestResponseDTO', id: string } };

export type DuplicateTestMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DuplicateTestMutation = { __typename?: 'Mutation', duplicateTest: { __typename?: 'TestResponseDTO', id: string } };

export type DeleteTestMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTestMutation = { __typename?: 'Mutation', deleteTest?: string | null };

export type UnarchiveTestMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnarchiveTestMutation = { __typename?: 'Mutation', unarchiveTest: { __typename?: 'TestResponseDTO', id: string } };

export type ArchiveTestMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArchiveTestMutation = { __typename?: 'Mutation', archiveTest: { __typename?: 'TestResponseDTO', id: string } };

export type CreateTestMutationVariables = Exact<{
  test: TestRequestDto;
}>;


export type CreateTestMutation = { __typename?: 'Mutation', createTest: { __typename?: 'TestResponseDTO', id: string } };

export type UpdateTestMutationVariables = Exact<{
  id: Scalars['ID'];
  test: TestRequestDto;
}>;


export type UpdateTestMutation = { __typename?: 'Mutation', updateTest: { __typename?: 'TestResponseDTO', id: string } };

export type CreateTestSessionMutationVariables = Exact<{
  testSession: TestSessionRequestDto;
}>;


export type CreateTestSessionMutation = { __typename?: 'Mutation', createTestSession: { __typename?: 'TestSessionResponseDTO', id: string } };

export type AddUserMutationVariables = Exact<{
  user: CreateUserDto;
}>;


export type AddUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserDTO', id: string, firstName: string, lastName: string, email: string, role: Role } };

export type DeleteUserByEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type DeleteUserByEmailMutation = { __typename?: 'Mutation', deleteUserByEmail?: string | null };

export type ClassByTestSessionQueryVariables = Exact<{
  testSessionId: Scalars['ID'];
}>;


export type ClassByTestSessionQuery = { __typename?: 'Query', classByTestSession: { __typename?: 'ClassResponseDTO', id: string, className: string, students: Array<{ __typename?: 'StudentResponseDTO', id: string, firstName: string, lastName: string, studentNumber?: string | null } | null> } };

export type ClassesByTeacherQueryVariables = Exact<{
  teacherId: Scalars['ID'];
}>;


export type ClassesByTeacherQuery = { __typename?: 'Query', classesByTeacher: Array<{ __typename?: 'ClassResponseDTO', id: string, students: Array<{ __typename?: 'StudentResponseDTO', id: string, firstName: string, lastName: string, studentNumber?: string | null } | null> }> };

export type GetSchoolQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetSchoolQuery = { __typename?: 'Query', school: { __typename?: 'SchoolResponseDTO', id: string, name: string, country: string, subRegion: string, city: string, address: string, teachers: Array<{ __typename?: 'UserDTO', id: string, firstName: string, lastName: string, email: string, role: Role }> } };

export type GetAllSchoolsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSchoolsQuery = { __typename?: 'Query', schools?: Array<{ __typename?: 'SchoolResponseDTO', id: string, name: string, country: string, subRegion: string, city: string, address: string, teachers: Array<{ __typename?: 'UserDTO', id: string, firstName: string, lastName: string, email: string, role: Role }> }> | null };

export type GetTestQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTestQuery = { __typename?: 'Query', test: { __typename?: 'TestResponseDTO', id: string, name: string, grade: GradeEnum, assessmentType: AssessmentTypeEnum, curriculumCountry: string, curriculumRegion: string, status: StatusEnum, updatedAt: any, questions: Array<Array<{ __typename?: 'QuestionComponent', type: QuestionComponentTypeEnum, metadata: { __typename?: 'FractionMetadata' } | { __typename?: 'ImageMetadata', filePath: string, url: string } | { __typename?: 'MultiSelectMetadata', options: Array<string>, answerIndices: Array<number> } | { __typename?: 'MultipleChoiceMetadata', options: Array<string>, answerIndex: number } | { __typename?: 'QuestionTextMetadata', questionText: string } | { __typename?: 'ShortAnswerMetadata', answer: number } | { __typename?: 'TextMetadata', text: string } } | null> | null> } };

export type GetAllTestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTestsQuery = { __typename?: 'Query', tests: Array<{ __typename?: 'TestResponseDTO', id: string, name: string, grade: GradeEnum, assessmentType: AssessmentTypeEnum, curriculumCountry: string, curriculumRegion: string, status: StatusEnum, updatedAt: any } | null> };

export type TestSessionByAccessCodeQueryVariables = Exact<{
  accessCode: Scalars['String'];
}>;


export type TestSessionByAccessCodeQuery = { __typename?: 'Query', testSessionByAccessCode: { __typename?: 'TestSessionResponseDTO', id: string, notes?: string | null, startDate: any, test: { __typename?: 'TestResponseDTO', id: string } } };

export type TestSessionsByTeacherIdQueryVariables = Exact<{
  teacherId: Scalars['String'];
}>;


export type TestSessionsByTeacherIdQuery = { __typename?: 'Query', testSessionsByTeacherId: Array<{ __typename?: 'TestSessionResponseDTO', id: string, startDate: any, endDate: any, accessCode: string, test: { __typename?: 'TestResponseDTO', name: string }, class: { __typename?: 'ClassResponseDTO', className: string } }> };

export type GetUsersByRoleQueryVariables = Exact<{
  role: Scalars['String'];
}>;


export type GetUsersByRoleQuery = { __typename?: 'Query', usersByRole: Array<{ __typename?: 'UserDTO', id: string, firstName: string, lastName: string, email: string }> };

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', userByEmail: { __typename?: 'UserDTO', id: string, firstName: string, lastName: string, email: string, role: Role } };

export type GetAllTeachersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTeachersQuery = { __typename?: 'Query', teachers?: Array<{ __typename?: 'TeacherDTO', id: string, firstName: string, lastName: string, email: string, school: string } | null> | null };


export const Register_TeacherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register_Teacher"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"grades"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GradeEnum"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentlyTeachingJM"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"school"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SchoolMetadataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerTeacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"grades"},"value":{"kind":"Variable","name":{"kind":"Name","value":"grades"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"currentlyTeachingJM"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentlyTeachingJM"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"school"},"value":{"kind":"Variable","name":{"kind":"Name","value":"school"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<Register_TeacherMutation, Register_TeacherMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RefreshDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Refresh"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"}}]}}]} as unknown as DocumentNode<RefreshMutation, RefreshMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ResetPasswordCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPasswordCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPasswordCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordCodeMutation, ResetPasswordCodeMutationVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oobCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"oobCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oobCode"}}}]}]}}]} as unknown as DocumentNode<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const VerifyPasswordResetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyPasswordReset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oobCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyPasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"oobCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oobCode"}}}]}]}}]} as unknown as DocumentNode<VerifyPasswordResetMutation, VerifyPasswordResetMutationVariables>;
export const ConfirmPasswordResetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmPasswordReset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oobCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmPasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"oobCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oobCode"}}}]}]}}]} as unknown as DocumentNode<ConfirmPasswordResetMutation, ConfirmPasswordResetMutationVariables>;
export const SendEmailVerificationLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendEmailVerificationLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendEmailVerificationLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<SendEmailVerificationLinkMutation, SendEmailVerificationLinkMutationVariables>;
export const CreateClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"classObj"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClassRequestDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"classObj"},"value":{"kind":"Variable","name":{"kind":"Name","value":"classObj"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"className"}},{"kind":"Field","name":{"kind":"Name","value":"schoolYear"}},{"kind":"Field","name":{"kind":"Name","value":"gradeLevel"}}]}}]}}]} as unknown as DocumentNode<CreateClassMutation, CreateClassMutationVariables>;
export const CreateStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"student"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StudentRequestDTO"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"classId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"student"},"value":{"kind":"Variable","name":{"kind":"Name","value":"student"}}},{"kind":"Argument","name":{"kind":"Name","value":"classId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"classId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateStudentMutation, CreateStudentMutationVariables>;
export const PublishTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublishTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<PublishTestMutation, PublishTestMutationVariables>;
export const DuplicateTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DuplicateTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duplicateTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DuplicateTestMutation, DuplicateTestMutationVariables>;
export const DeleteTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTestMutation, DeleteTestMutationVariables>;
export const UnarchiveTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnarchiveTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unarchiveTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UnarchiveTestMutation, UnarchiveTestMutationVariables>;
export const ArchiveTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ArchiveTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"archiveTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ArchiveTestMutation, ArchiveTestMutationVariables>;
export const CreateTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"test"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TestRequestDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"test"},"value":{"kind":"Variable","name":{"kind":"Name","value":"test"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTestMutation, CreateTestMutationVariables>;
export const UpdateTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"test"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TestRequestDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"test"},"value":{"kind":"Variable","name":{"kind":"Name","value":"test"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTestMutation, UpdateTestMutationVariables>;
export const CreateTestSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTestSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testSession"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TestSessionRequestDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTestSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testSession"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testSession"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTestSessionMutation, CreateTestSessionMutationVariables>;
export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserDTO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const DeleteUserByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUserByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUserByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<DeleteUserByEmailMutation, DeleteUserByEmailMutationVariables>;
export const ClassByTestSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ClassByTestSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testSessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"classByTestSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testSessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testSessionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"className"}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"studentNumber"}}]}}]}}]}}]} as unknown as DocumentNode<ClassByTestSessionQuery, ClassByTestSessionQueryVariables>;
export const ClassesByTeacherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ClassesByTeacher"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teacherId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"classesByTeacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teacherId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teacherId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"studentNumber"}}]}}]}}]}}]} as unknown as DocumentNode<ClassesByTeacherQuery, ClassesByTeacherQueryVariables>;
export const GetSchoolDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSchool"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"school"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"subRegion"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"teachers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<GetSchoolQuery, GetSchoolQueryVariables>;
export const GetAllSchoolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllSchools"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schools"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"subRegion"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"teachers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllSchoolsQuery, GetAllSchoolsQueryVariables>;
export const GetTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"test"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QuestionTextMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questionText"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filePath"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MultipleChoiceMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"answerIndex"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MultiSelectMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"answerIndices"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ShortAnswerMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answer"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"grade"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentType"}},{"kind":"Field","name":{"kind":"Name","value":"curriculumCountry"}},{"kind":"Field","name":{"kind":"Name","value":"curriculumRegion"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetTestQuery, GetTestQueryVariables>;
export const GetAllTestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"grade"}},{"kind":"Field","name":{"kind":"Name","value":"assessmentType"}},{"kind":"Field","name":{"kind":"Name","value":"curriculumCountry"}},{"kind":"Field","name":{"kind":"Name","value":"curriculumRegion"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllTestsQuery, GetAllTestsQueryVariables>;
export const TestSessionByAccessCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestSessionByAccessCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accessCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testSessionByAccessCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accessCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accessCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"test"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}}]}}]}}]} as unknown as DocumentNode<TestSessionByAccessCodeQuery, TestSessionByAccessCodeQueryVariables>;
export const TestSessionsByTeacherIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestSessionsByTeacherId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teacherId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testSessionsByTeacherId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teacherId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teacherId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"test"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"className"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"accessCode"}}]}}]}}]} as unknown as DocumentNode<TestSessionsByTeacherIdQuery, TestSessionsByTeacherIdQueryVariables>;
export const GetUsersByRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersByRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersByRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetUsersByRoleQuery, GetUsersByRoleQueryVariables>;
export const GetUserByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const GetAllTeachersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTeachers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teachers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"school"}}]}}]}}]} as unknown as DocumentNode<GetAllTeachersQuery, GetAllTeachersQueryVariables>;