// Public Routes
export const HOME_PAGE = "/";
export const ADMIN_LOGIN_PAGE = "/admin-login";
export const TEACHER_LOGIN_PAGE = "/teacher-login";
export const STUDENT_LOGIN_PAGE = "/student-login";
export const TEACHER_SIGNUP_PAGE = "/teacher-signup";
export const EMAIL_ACTION_PAGE = "/email-action";

// Private Admin Routes
export const ADMIN_LANDING_PAGE = "/admin";
export const USER_DATABASE_PAGE = "/admin/user-database";
export const ASSESSMENTS_PAGE = "/admin/assessments";
export const ASSESSMENT_EDITOR_PAGE = "/admin/assessment-editor";

// Private Teacher Routes
export const TEACHER_LANDING_PAGE = "/teacher";
export const TEACHER_DASHBOARD_PAGE = "/teacher/dashboard";
export const DISPLAY_ASSESSMENTS_PAGE = "/teacher/assessments";
export const DISPLAY_ASSESSMENT_RESULTS_PAGE = (id = ":sessionId") =>
  `/teacher/assessment-results/${id}`;
export const DISPLAY_ASSESSMENT_RESULTS_SUMMARY_PAGE = (id = ":sessionId") =>
  `/teacher/assessment-results/${id}/summary`;
export const DISPLAY_ASSESSMENT_RESULTS_BY_STUDENT_PAGE = (id = ":sessionId") =>
  `/teacher/assessment-results/${id}/by-student`;
export const DISTRIBUTE_ASSESSMENT_PAGE = "/teacher/assessments/create";
export const CLASSROOMS_PAGE = "/teacher/classrooms";
export const DISPLAY_CLASSROOM_PAGE = (id = ":classroomId") =>
  `/teacher/classrooms/${id}`;
export const DISPLAY_CLASSROOM_ASSESSMENTS_PAGE = (id = ":classroomId") =>
  `/teacher/classrooms/${id}/assessments`;
export const DISPLAY_CLASSROOM_STUDENTS_PAGE = (id = ":classroomId") =>
  `/teacher/classrooms/${id}/students`;

// Private Student Routes
export const STUDENT_LANDING_PAGE = "/student";
export const ASSESSMENT_SUMMARY_PAGE = "/student/assessment-summary";
export const WRITE_ASSESSMENT_PAGE = "/student/write-assessment";

// TO DELETE BEFORE DEPLOYMENT
export const COMPONENT_LIBRARY_PAGE = "/component-library";
