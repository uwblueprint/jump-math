import type { ReactElement } from "react";
import React from "react";
import { Flex, Text } from "@chakra-ui/react";

import Select from "../form/Select";

import type { FilterProp } from "./FilterMenu";

interface FilterRowProps {
  filterProp: FilterProp;
  optionsSelected: Map<string, string[]>;
  setOptionsSelected: React.Dispatch<
    React.SetStateAction<Map<string, string[]>>
  >;
}

const FilterRow = ({
  filterProp,
  optionsSelected,
  setOptionsSelected,
}: FilterRowProps): ReactElement => {
  return (
    <>
      <Flex justifyContent="space-around" pb={4} pt={2} px={3}>
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
            isMulti
            onChange={(choices) => {
              setOptionsSelected(
                new Map(optionsSelected.set(filterProp.label, choices)),
              );
            }}
            options={filterProp.options}
            useBasicStyles={false}
          />
        </div>
      </Flex>
    </>
  );
};

export default FilterRow;
