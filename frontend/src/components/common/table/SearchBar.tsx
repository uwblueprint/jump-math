import React, {
  type ChangeEvent,
  type Dispatch,
  type ReactElement,
  type SetStateAction,
  useCallback,
} from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";

import { SearchOutlineIcon } from "../../../assets/icons";

export interface SearchBarProps {
  onSearch: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ onSearch }: SearchBarProps): ReactElement => {
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSearch(event.target.value);
    },
    [onSearch],
  );

  return (
    <InputGroup width="95%">
      <Input
        _focus={{ bg: "grey.100" }}
        bg="grey.100"
        borderColor="grey.100"
        borderRadius="6px"
        onChange={handleInputChange}
        placeholder="Search bar"
      />
      <InputRightElement h="full" pointerEvents="none">
        <SearchOutlineIcon />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
