import { createContext } from "react";

import { TestResponse } from "../APIClients/types/TestClientTypes";

type StudentContextType = {
  test: TestResponse | null;
  setTest: (_test: TestResponse) => void;
  testSessionId: string;
  setTestSessionId: (_testSessionId: string) => void;
  testSessionNotes: string;
  setTestSessionNotes: (_testSessionNotes: string) => void;
  startDate: Date | null;
  setStartDate: (_startDate: Date | null) => void;
  endDate: Date | null;
  setEndDate: (_endDate: Date | null) => void;
};

const StudentContext = createContext<StudentContextType>({
  test: null,
  setTest: (_test: TestResponse): void => {},
  testSessionId: "",
  setTestSessionId: (_testSessionId: string): void => {},
  testSessionNotes: "",
  setTestSessionNotes: (_testSessionNotes: string): void => {},
  startDate: null,
  setStartDate: (_startDate: Date | null): void => {},
  endDate: null,
  setEndDate: (endDate: Date | null): void => {},
});

export default StudentContext;
