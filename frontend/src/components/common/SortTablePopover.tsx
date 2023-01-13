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

type AdminUserProperty = "name" | "email";
type SortOrder = "ascending" | "descending";
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
            <PopoverContent color="black" bg="white" borderColor="white">
              <PopoverBody>
                <Box w="1200px">
                  <Stack direction="row" spacing={30} sx={{ pt: "2", pl: "5" }}>
                    <RadioGroup
                      color="blue.300"
                      onChange={(e) => {
                        if (e === "name" || e === "email") {
                          setSortProperty(e);
                        }
                      }}
                      value={sortProperty}
                    >
                      <Stack>
                        <Text pb="2" textStyle="link">
                          Property
                        </Text>
                        <Radio defaultChecked value="name">
                          Name
                        </Radio>
                        <Radio value="email">Email</Radio>
                      </Stack>
                    </RadioGroup>
                    <Center height="95px">
                      <Divider orientation="vertical" />
                    </Center>
                    <RadioGroup
                      color="blue.300"
                      onChange={(e) => {
                        if (e === "ascending" || e === "descending") {
                          setSortOrder(e);
                        }
                      }}
                      value={sortOrder}
                    >
                      <Stack>
                        <Text pb="2" textStyle="link">
                          Order
                        </Text>
                        <Radio defaultChecked value="ascending">
                          Ascending
                        </Radio>
                        <Radio value="descending">Descending</Radio>
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
