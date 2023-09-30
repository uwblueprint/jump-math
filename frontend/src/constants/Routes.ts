// Public Routes
export const HOME_PAGE = "/";
export const ADMIN_LOGIN_PAGE = "/admin-login";
export const TEACHER_LOGIN_PAGE = "/teacher-login";
export const STUDENT_LOGIN_PAGE = "/student-login";
export const TEACHER_SIGNUP_PAGE = "/teacher-signup";
export const EMAIL_ACTION_PAGE = "/email-action";

// Private Admin Routes
export const ADMIN_LANDING_PAGE = "/admin";
export const USERS_PAGE = "/admin/users";

export const ASSESSMENTS_PAGE = "/admin/assessments";
export const ASSESSMENT_EDITOR_BASE = ({
  assessmentId,
}: {
  assessmentId?: string;
}) => "/admin/assessments/" + (assessmentId ?? "create");
export const ASSESSMENT_EDITOR_PAGE = ({
  assessmentId,
}: {
  assessmentId?: string;
}) => ASSESSMENT_EDITOR_BASE({ assessmentId }) + (assessmentId ? "/edit" : "");
export const ASSESSMENT_EDITOR_PREVIEW_PAGE = ({
  assessmentId,
}: {
  assessmentId?: string;
}) => ASSESSMENT_EDITOR_BASE({ assessmentId }) + "/preview";
export const ASSESSMENT_EDITOR_QUESTION_EDITOR_PAGE = ({
  assessmentId,
  questionIndex,
}: {
  assessmentId?: string;
  questionIndex?: string;
}) =>
  ASSESSMENT_EDITOR_BASE({ assessmentId }) +
  "/questions/" +
  (questionIndex ? `${questionIndex}/edit` : "add");
export const ASSESSMENT_EDITOR_QUESTION_PREVIEW_PAGE = ({
  assessmentId,
  questionIndex,
}: {
  assessmentId?: string;
  questionIndex?: string;
}) =>
  ASSESSMENT_EDITOR_BASE({ assessmentId }) +
  "/questions/" +
  (questionIndex ? `${questionIndex}/preview` : "add/preview");

// Private Teacher Routes
export const TEACHER_LANDING_PAGE = "/teacher";
export const TEACHER_DASHBOARD_PAGE = "/teacher/dashboard";
export const DISPLAY_ASSESSMENTS_PAGE = "/teacher/assessments";
export const DISPLAY_ASSESSMENT_RESULTS_PAGE = ({
  sessionId = ":sessionId",
} = {}) => `/teacher/assessment-results/${sessionId}`;
export const DISPLAY_ASSESSMENT_RESULTS_SUMMARY_PAGE = ({
  sessionId = ":sessionId",
} = {}) => `/teacher/assessment-results/${sessionId}/summary`;
export const DISPLAY_ASSESSMENT_RESULTS_BY_STUDENT_PAGE = ({
  sessionId = ":sessionId",
} = {}) => `/teacher/assessment-results/${sessionId}/by-student`;
export const DISTRIBUTE_ASSESSMENT_PAGE = "/teacher/assessments/create";
export const CLASSROOMS_PAGE = "/teacher/classrooms";
export const DISPLAY_CLASSROOM_PAGE = ({ classroomId = ":classroomId" } = {}) =>
  `/teacher/classrooms/${classroomId}`;
export const DISPLAY_CLASSROOM_ASSESSMENTS_PAGE = ({
  classroomId = ":classroomId",
} = {}) => `/teacher/classrooms/${classroomId}/assessments`;
export const DISPLAY_CLASSROOM_STUDENTS_PAGE = ({
  classroomId = ":classroomId",
} = {}) => `/teacher/classrooms/${classroomId}/students`;

// Private Student Routes
export const STUDENT_LANDING_PAGE = "/student";
export const ASSESSMENT_SUMMARY_PAGE = "/student/assessment-summary";
export const WRITE_ASSESSMENT_PAGE = "/student/write-assessment";

// TO DELETE BEFORE DEPLOYMENT
export const COMPONENT_LIBRARY_PAGE = "/component-library";
