import { createContext } from "react";

type StudentContextType = {
  testId: string;
  setTestId: (_testId: string) => void;
};

const StudentContext = createContext<StudentContextType>({
  testId: "",
  setTestId: (_testId: string): void => {},
});

export default StudentContext;
