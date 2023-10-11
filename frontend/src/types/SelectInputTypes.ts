import type { OptionBase as ChakraOptionBase } from "chakra-react-select";

import type { StudentResponse } from "../APIClients/types/ClassClientTypes";
import type { Grade } from "../APIClients/types/UserClientTypes";

export interface OptionBase<T = unknown> extends ChakraOptionBase {
  value: T;
  label: string;
}

export type StringOrBoolOption = OptionBase<string | boolean>;

export type StringOption = OptionBase<string>;

export type GradeOption = OptionBase<Grade>;

export type StudentOption = OptionBase<StudentResponse>;
