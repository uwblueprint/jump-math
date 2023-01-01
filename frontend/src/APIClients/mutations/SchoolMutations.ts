import { gql } from "@apollo/client";

export const ADD_TEACHER_TO_SCHOOL = gql`
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
      teachers {
        id
        firstName
        lastName
        email
        role
      }
    }
  }
`;

export const CREATE_SCHOOL = gql`
  mutation Create_School($school: SchoolRequestDTO!) {
    createSchool(school: $school) {
      id
      name
      country
      subRegion
      city
      address
      teachers {
        id
        firstName
        lastName
        email
        role
      }
    }
  }
`;
