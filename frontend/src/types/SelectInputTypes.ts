import { OptionBase } from "chakra-react-select";

export interface Option extends OptionBase {
  value: string | boolean;
  label: string;
}

export interface MultiOption extends Option {
  value: string;
}
