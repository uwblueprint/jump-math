import React, { SetStateAction } from "react";
import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FunnelIcon } from "../../assets/icons";
import FilterRow from "./FilterRow";
import { MultiOption } from "../../types/SelectInputTypes";

export type FilterProp = {
  label: string;
  setState: React.Dispatch<SetStateAction<Array<string>>>;
  options: MultiOption[];
};

interface FilterProps {
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

const FilterMenu = ({ filterProps }: FilterProps): React.ReactElement => {
  const [optionsSelected, setOptionsSelected] = React.useState<
    Map<string, string[]>
  >(new Map());

  const attributeList = filterProps.map((filterProp, i) => {
    const lastItem = i !== filterProps.length - 1;
    return (
      <FilterRow
        key={i}
        filterProp={filterProp}
        lastItem={lastItem}
        optionsSelected={optionsSelected}
        setOptionsSelected={setOptionsSelected}
      />
    );
  });
  return (
    <>
      <Popover preventOverflow flip placement="bottom-start">
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <Button
                minWidth="5%"
                leftIcon={<FunnelIcon />}
                variant="tertiary"
              >
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent
              borderColor="white"
              boxShadow="8px 8px 30px 0px #0000000D"
              borderRadius="16px"
              py="4"
              width="100%"
            >
              <PopoverBody width="100%">
                <>{attributeList}</>
              </PopoverBody>
              <PopoverFooter border="0" alignSelf="end" px="10">
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
