import React from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchOutlineIcon } from "../../assets/icons";

interface SearchBarProps {
  onSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ onSearch }: SearchBarProps): React.ReactElement => {
  const handleInputChange = React.useCallback(
    (event) => {
      onSearch(event.target.value);
    },
    [onSearch],
  );

  return (
    <InputGroup width="95%">
      <Input
        borderRadius="6px"
        borderColor="grey.100"
        backgroundColor="grey.100"
        onChange={handleInputChange}
        placeholder="Search bar"
      />
      <InputRightElement pointerEvents="none" h="full">
        <SearchOutlineIcon />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
