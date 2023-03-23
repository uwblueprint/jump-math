import React, { SetStateAction } from "react";
import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  StackDivider,
  VStack,
} from "@chakra-ui/react";

import { FunnelIcon } from "../../../assets/icons";
import { StringOption } from "../../../types/SelectInputTypes";

import FilterRow from "./FilterRow";

export type FilterProp = {
  label: string;
  setState: React.Dispatch<SetStateAction<Array<string>>>;
  options: StringOption[];
};

export interface FilterMenuProps {
  filterProps: FilterProp[];
}

const addFilter = (
  optionsSelected: Map<string, string[]>,
  filterProps: FilterProp[],
) => {
  filterProps.forEach((prop: FilterProp) => {
    if (optionsSelected.has(prop.label) && optionsSelected.get(prop.label)) {
      prop.setState(optionsSelected.get(prop.label) as string[]);
    } else {
      prop.setState([]);
    }
  });
};

const FilterMenu = ({ filterProps }: FilterMenuProps): React.ReactElement => {
  const [optionsSelected, setOptionsSelected] = React.useState<
    Map<string, string[]>
  >(new Map());

  const attributeList = filterProps.map((filterProp, i) => {
    return (
      <FilterRow
        key={i}
        filterProp={filterProp}
        optionsSelected={optionsSelected}
        setOptionsSelected={setOptionsSelected}
      />
    );
  });
  return (
    <>
      <Popover flip placement="bottom-start" preventOverflow>
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <Button
                leftIcon={<FunnelIcon />}
                minWidth="5%"
                variant="tertiary"
              >
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent
              borderColor="white"
              borderRadius="16px"
              boxShadow="8px 8px 30px 0px #0000000D"
              py="4"
              width="100%"
            >
              <PopoverBody width="100%">
                <VStack
                  divider={
                    <StackDivider
                      maxWidth="95%"
                      style={{ marginLeft: "0.5em", marginTop: "0" }}
                    />
                  }
                >
                  {attributeList}
                </VStack>
              </PopoverBody>
              <PopoverFooter alignSelf="end" border="0" px="10">
                <Button
                  minWidth="10%"
                  onClick={() => {
                    addFilter(optionsSelected, filterProps);
                    onClose();
                  }}
                  variant="secondary"
                >
                  Apply
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </>
        )}
      </Popover>
    </>
  );
};

export default FilterMenu;
