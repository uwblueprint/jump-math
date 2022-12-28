import { gql } from "@apollo/client";

const GET_SCHOOL = gql`
  query GetSchool($id: ID!)) {
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

const GET_SCHOOLS = gql`
  query GetSchools {
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

export default { GET_SCHOOL, GET_SCHOOLS };
