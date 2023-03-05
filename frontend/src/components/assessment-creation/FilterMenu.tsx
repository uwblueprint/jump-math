import React, { SetStateAction } from "react";
import {
  Button,
  Text,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { FunnelIcon } from "../../assets/icons";

export type Option = {
  value: string;
  label: string;
};

export type FilterMenuProp = {
  label: string;
  setState: React.Dispatch<SetStateAction<Array<string>>>;
  options: Option[];
};

interface FilterMenuProps {
  filterProps: FilterMenuProp[];
}

function AddFilter(
  optionsSelected: { [key: string]: string[] },
  filterProps: FilterMenuProp[],
): void {
  filterProps.forEach((prop: FilterMenuProp) => {
    if (
      optionsSelected[prop.label] &&
      optionsSelected[prop.label].length !== 0
    ) {
      prop.setState(optionsSelected[prop.label]);
    } else {
      prop.setState([]);
    }
  });
}

const FilterMenu = ({ filterProps }: FilterMenuProps): React.ReactElement => {
  const optionsSelected = {} as { [key: string]: string[] };
  const attributeList = filterProps.map((filterProp, i) => (
    <>
      <Flex pt="2%" px={3} pb={4} justifyContent="space-around">
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
              optionsSelected[filterProp.label] = choices.map(
                (choice) => choice.value,
              );
            }}
            isMulti
            name="colors"
            options={filterProp.options}
          />
        </div>
      </Flex>
      {i !== filterProps.length - 1 && <Divider ml={2} mb={2} maxWidth="95%" />}
    </>
  ));
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
                    AddFilter(optionsSelected, filterProps);
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
