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

type AdminUserProperty = "firstName" | "email";
type SortOrder = "Ascending" | "Descending";
type OrderingStates = {
  sortProperty: AdminUserProperty;
  sortOrder: SortOrder;
  setSortProperty: React.Dispatch<React.SetStateAction<AdminUserProperty>>;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
};

const SortTablePopover = ({
  OrderingSets,
}: {
  OrderingSets: OrderingStates;
}): React.ReactElement => {
  const {
    sortProperty,
    sortOrder,
    setSortProperty,
    setSortOrder,
  } = OrderingSets;
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
                    <RadioGroup
                      color="blue.300"
                      onChange={(e) => {
                        if (e === "firstName" || e === "email") {
                          setSortProperty(e);
                        }
                      }}
                      value={sortProperty}
                    >
                      <VStack alignItems="left" gap={1}>
                        <Text pb="2" textStyle="link">
                          Property
                        </Text>
                        <Radio defaultChecked value="firstName">
                          Name
                        </Radio>
                        <Radio value="email">Email</Radio>
                      </VStack>
                    </RadioGroup>

                    <Divider orientation="vertical" />

                    <RadioGroup
                      color="blue.300"
                      onChange={(e) => {
                        if (e === "Ascending" || e === "Descending") {
                          setSortOrder(e);
                        }
                      }}
                      value={sortOrder}
                    >
                      <VStack alignItems="left" gap={1}>
                        <Text pb={2} textStyle="link">
                          Order
                        </Text>
                        <Radio defaultChecked value="Ascending">
                          Ascending
                        </Radio>
                        <Radio value="Descending">Descending</Radio>
                      </VStack>
                    </RadioGroup>
                  </HStack>
                </Flex>
              </PopoverBody>
              <PopoverFooter border="0" alignSelf="end" px="8">
                <Button minWidth="10%" onClick={onClose} variant="secondary">
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

export default SortTablePopover;
