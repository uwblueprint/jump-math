import { gql } from "@apollo/client";

const CREATE_CLASS = gql`
  mutation CreateClass($classObj: ClassRequestDTO!) {
    createClass(classObj: $classObj) {
      id
      className
      schoolYear
      gradeLevel
      teacher {
        id
        firstName
        lastName
      }
    }
  }
`;

export default CREATE_CLASS;
