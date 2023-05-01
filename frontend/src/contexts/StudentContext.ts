import { createContext } from "react";

import { TestResponse } from "../APIClients/types/TestClientTypes";

type StudentContextType = {
  test: TestResponse | null;
  setTest: (_test: TestResponse) => void;
  testSessionId: string;
  setTestSessionId: (_setTestSessionId: string) => void;
  testSessionNotes: string;
  setTestSessionNotes: (_setTestSessionNotes: string) => void;
};

const StudentContext = createContext<StudentContextType>({
  test: null,
  setTest: (_test: TestResponse): void => {},
  testSessionId: "",
  setTestSessionId: (_setTestSessionId: string): void => {},
  testSessionNotes: "",
  setTestSessionNotes: (_setTestSessionNotes: string): void => {},
});

export default StudentContext;
