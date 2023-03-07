import React from "react";
import { Text, Divider, Flex } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import type { FilterProp } from "./FilterMenu";

interface FilterRowProps {
  filterProp: FilterProp;
  lastItem: boolean;
  optionsSelected: Map<string, string[]>;
  setOptionsSelected: React.Dispatch<
    React.SetStateAction<Map<string, string[]>>
  >;
}

const FilterRow = ({
  filterProp,
  lastItem,
  optionsSelected,
  setOptionsSelected,
}: FilterRowProps): React.ReactElement => {
  return (
    <>
      <Flex pt={2} px={3} pb={4} justifyContent="space-around">
        <div style={{ width: "7rem" }}>
          <Text color="blue.300" textStyle="link">
            {filterProp.label}
          </Text>
        </div>

        <div style={{ width: "23rem" }}>
          <Select
            chakraStyles={{
              dropdownIndicator: (provided) => ({
                ...provided,
                background: "white",
              }),
              downChevron: (provided) => ({
                ...provided,
                boxSize: "1.5rem",
              }),
              crossIcon: (provided) => ({
                ...provided,
                boxSize: "0.8rem",
              }),
            }}
            focusBorderColor="blue.300"
            onChange={(choices) => {
              const values = choices.map((choice) => choice.value);
              setOptionsSelected(
                new Map(optionsSelected.set(filterProp.label, values)),
              );
            }}
            isMulti
            options={filterProp.options}
          />
        </div>
      </Flex>
      {lastItem && <Divider ml={2} mb={2} maxWidth="95%" />}
    </>
  );
};

export default FilterRow;
