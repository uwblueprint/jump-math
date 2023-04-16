import { gql } from "@apollo/client";

const CREATE_STUDENT = gql`
  mutation createStudent($student: StudentRequestDTO!, $classId: String!) {
    createStudent(student: $student, classId: $classId) {
      id
    }
  }
`;

export default CREATE_STUDENT;
