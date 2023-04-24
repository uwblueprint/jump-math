import { createContext } from "react";

import { TestResponse } from "../APIClients/types/TestClientTypes";

type StudentContextType = {
  test: TestResponse | null;
  setTest: (_test: TestResponse) => void;
  testSessionId: string;
  setTestSessionId: (_setTestSessionId: string) => void;
};

const StudentContext = createContext<StudentContextType>({
  test: null,
  setTest: (_test: TestResponse): void => {},
  testSessionId: "",
  setTestSessionId: (_setTestSessionId: string): void => {},
});

export default StudentContext;
