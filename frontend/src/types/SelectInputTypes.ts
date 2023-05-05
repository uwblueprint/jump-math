import { OptionBase } from "chakra-react-select";

import { StudentResponse } from "../APIClients/types/ClassClientTypes";
import { Grade } from "../APIClients/types/UserClientTypes";

export interface StringOrBoolOption extends OptionBase {
  value: string | boolean;
  label: string;
}

export interface StringOption extends StringOrBoolOption {
  value: string;
}

export interface GradeOption extends OptionBase {
  value: Grade;
  label: string;
}

export interface StudentOption extends OptionBase {
  value: StudentResponse;
  label: string;
}
