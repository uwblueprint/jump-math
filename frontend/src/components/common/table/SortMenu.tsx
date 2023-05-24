import React from "react";
import {
  Button,
  Divider,
  Flex,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FilterOptionsIcon } from "../../../assets/icons";
import { titleCase } from "../../../utils/GeneralUtils";

export type SortOrder = "ascending" | "descending";
export interface SortMenuProps {
  properties: string[];
  labels: string[];
  onSortProperty?: React.Dispatch<React.SetStateAction<string>>;
  onSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
  initialSortOrder?: SortOrder;
}

const SortMenu = ({
  properties,
  labels,
  onSortProperty,
  onSortOrder,
  initialSortOrder = "ascending",
}: SortMenuProps): React.ReactElement => {
  const [sortProperty, setSortProperty] = React.useState(properties[0]);
  const [sortOrder, setSortOrder] = React.useState<SortOrder>(initialSortOrder);

  const propertyList = properties.length ? (
    <RadioGroup
      color="blue.300"
      onChange={(e) => setSortProperty(e)}
      value={sortProperty}
    >
      <VStack alignItems="left" gap={1}>
        <Text pb={2} textStyle="link">
          Property
        </Text>
        {properties.map((property, index) => (
          <Radio key={index} value={property}>
            {titleCase(labels[index])}
          </Radio>
        ))}
      </VStack>
    </RadioGroup>
  ) : null;

  const orderList = (
    <RadioGroup
      color="blue.300"
      onChange={(e) => setSortOrder((e as unknown) as SortOrder)}
      value={sortOrder}
    >
      <VStack alignItems="left" gap={1}>
        <Text pb={2} textStyle="link">
          Order
        </Text>
        <Radio value="ascending">Ascending</Radio>
        <Radio value="descending">Descending</Radio>
      </VStack>
    </RadioGroup>
  );

  return (
    <>
      <Popover placement="bottom-end">
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <Button
                leftIcon={<FilterOptionsIcon />}
                minWidth="5%"
                variant="tertiary"
              >
                Sort
              </Button>
            </PopoverTrigger>
            <PopoverContent
              borderColor="white"
              borderRadius="16px"
              boxShadow="8px 8px 30px 0px #0000000D"
              py="4"
              w={propertyList ? "xs" : "xxs"}
            >
              <PopoverBody>
                <Flex justifyContent="center">
                  <HStack alignItems="flex-start" gap={4}>
                    {propertyList}
                    {propertyList && <Divider orientation="vertical" />}
                    {orderList}
                  </HStack>
                </Flex>
              </PopoverBody>
              <PopoverFooter alignSelf="end" border="0" px="10">
                <Button
                  minWidth="10%"
                  onClick={() => {
                    onSortProperty?.(sortProperty);
                    onSortOrder(sortOrder);
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

export default SortMenu;
