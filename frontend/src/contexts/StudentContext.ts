/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext } from "react";

import type { TestResponse } from "../APIClients/types/TestClientTypes";
import type { TestSessionSetupData } from "../APIClients/types/TestSessionClientTypes";

type StudentContextType = {
  test: TestResponse | null;
  setTest: (_test: TestResponse) => void;
  testSession: TestSessionSetupData | null;
  setTestSession: (_testSession: TestSessionSetupData) => void;
  className: string;
  setClassName: (_className: string) => void;
};

const StudentContext = createContext<StudentContextType>({
  test: null,
  setTest: (_test: TestResponse): void => {},
  testSession: null,
  setTestSession: (_testSession: TestSessionSetupData): void => {},
  className: "",
  setClassName: (_className: string): void => {},
});

export default StudentContext;
