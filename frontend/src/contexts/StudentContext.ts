import { createContext } from "react";

import { TestResponse } from "../APIClients/types/TestClientTypes";

type StudentContextType = {
  test: TestResponse | null;
  setTest: (_test: TestResponse) => void;
  testSession: string;
  setTestSession: (_setTestSession: string) => void;
};

const StudentContext = createContext<StudentContextType>({
  test: null,
  setTest: (_test: TestResponse): void => {},
  testSession: "",
  setTestSession: (_setTestSession: string): void => {},
});

export default StudentContext;
