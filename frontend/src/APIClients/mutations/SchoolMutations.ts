import { gql } from "@apollo/client";

const ADD_TEACHER_TO_SCHOOL = gql`
  mutation Add_Teacher_To_School(
    $school: SchoolRequestDTO!
    $schoolId: String!
    $teacherId: String!
  ) {
    addTeacherToSchool(
      school: $school
      schoolId: $schoolId
      teacherId: $teacherId
    ) {
      id
      name
      country
      subRegion
      city
      address
      teachers
    }
  }
`;

export default ADD_TEACHER_TO_SCHOOL;
