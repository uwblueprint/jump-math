import React from "react";
import {
  Button,
  Radio,
  Stack,
  Text,
  RadioGroup,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  Center,
  Divider,
  Box,
  Spacer,
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
                size="sm"
                pl="10%"
                ml="0"
                rightIcon={<FilterOptionsIcon />}
                bg="#blue.300"
              >
                Sort
              </Button>
            </PopoverTrigger>
            <PopoverContent color="black" bg="white" borderColor="white">
              <PopoverBody>
                <Box w="1200px">
                  <Stack direction="row" spacing={30} sx={{ pt: "2", pl: "5" }}>
                    <RadioGroup
                      onChange={(e) => {
                        if (e === "firstName" || e === "email") {
                          setSortProperty(e);
                        }
                      }}
                      value={sortProperty}
                    >
                      <Stack>
                        <Text
                          color="blue.800"
                          as="b"
                          pb="2"
                          textStyle="subtitle3"
                        >
                          Property
                        </Text>
                        <Radio defaultChecked value="firstName">
                          Name
                        </Radio>
                        <Radio value="email">Email</Radio>
                      </Stack>
                    </RadioGroup>
                    <Center height="95px">
                      <Divider orientation="vertical" />
                    </Center>
                    <RadioGroup
                      onChange={(e) => {
                        if (e === "Ascending" || e === "Descending") {
                          setSortOrder(e);
                        }
                      }}
                      value={sortOrder}
                    >
                      <Stack>
                        <Text
                          color="blue.800"
                          as="b"
                          pb="2"
                          textStyle="subtitle3"
                        >
                          Order
                        </Text>
                        <Radio
                          color="blue.800"
                          defaultChecked
                          value="Ascending"
                        >
                          Ascending
                        </Radio>
                        <Radio value="Descending">Descending</Radio>
                      </Stack>
                    </RadioGroup>
                  </Stack>
                </Box>
              </PopoverBody>
              <PopoverFooter
                border="0"
                display="flex"
                alignItems="end"
                justifyContent="space-between"
                pb={6}
                pt={4}
                pr={8}
              >
                <Spacer />
                <Button
                  onClick={onClose}
                  color="blue.800"
                  size="lg"
                  bg="#DFDFDF"
                  colorScheme="blue"
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

export default SortTablePopover;
