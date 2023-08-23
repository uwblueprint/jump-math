import { gql } from "@apollo/client";

export const GET_SCHOOL = gql`
  query GetSchool($id: ID!) {
    school(id: $id) {
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

export const GET_SCHOOL_BY_TEACHER_ID = gql`
  query GetSchoolByTeacherId($teacherId: ID!) {
    schoolByTeacherId(teacherId: $teacherId) {
      id
    }
  }
`;

export const GET_ALL_SCHOOLS = gql`
  query GetAllSchools {
    schools {
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
