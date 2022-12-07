import { gql } from "@apollo/client";

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

export default GET_SCHOOLS;
