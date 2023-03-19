import { OptionBase } from "chakra-react-select";

export interface StringOrBoolOption extends OptionBase {
  value: string | boolean;
  label: string;
}

export interface StringOption extends StringOrBoolOption {
  value: string;
}
