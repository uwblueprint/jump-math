import React from "react";
import {
  Flex,
  Button,
  Radio,
  VStack,
  Text,
  RadioGroup,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { FilterOptionsIcon } from "../../assets/icons";

interface SortMenuProps {
  properties: string[];
  onSortProperty: React.Dispatch<React.SetStateAction<string>>;
  onSortOrder: React.Dispatch<React.SetStateAction<string>>;
}

const SortMenu = ({
  properties,
  onSortProperty,
  onSortOrder,
}: SortMenuProps): React.ReactElement => {
  const [sortProperty, setSortProperty] = React.useState(properties[0]);
  const [sortOrder, setSortOrder] = React.useState("ascending");

  const propertyList = (
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
            {property.charAt(0).toUpperCase() + property.slice(1)}
          </Radio>
        ))}
      </VStack>
    </RadioGroup>
  );

  const orderList = (
    <RadioGroup
      color="blue.300"
      onChange={(e) => setSortOrder(e)}
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
                minWidth="5%"
                leftIcon={<FilterOptionsIcon />}
                variant="tertiary"
              >
                Sort
              </Button>
            </PopoverTrigger>
            <PopoverContent
              borderColor="white"
              boxShadow="8px 8px 30px 0px #0000000D"
              borderRadius="16px"
              py="4"
            >
              <PopoverBody>
                <Flex justifyContent="center">
                  <HStack alignItems="flex-start" gap={4}>
                    {propertyList}
                    <Divider orientation="vertical" />
                    {orderList}
                  </HStack>
                </Flex>
              </PopoverBody>
              <PopoverFooter border="0" alignSelf="end" px="10">
                <Button
                  minWidth="10%"
                  onClick={() => {
                    onSortProperty(sortProperty);
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
