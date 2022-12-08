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
import { FilterOptionsIcon } from "../icons";

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
  const [order, setOrder] = React.useState<SortOrder>("Ascending");
  const [property, setProperty] = React.useState<AdminUserProperty>(
    "firstName",
  );
  function setFiltering() {
    setSortOrder(order);
    setSortProperty(property);
  }
  return (
    <>
      <Popover placement="bottom-end">
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <Button
                height="35px"
                minWidth="110px"
                leftIcon={<FilterOptionsIcon />}
                bg="#blue.300"
                variant="ghost"
                color="blue.800"
                _hover={{ bg: "#DFDFDF" }}
                fontSize="15px"
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
                          setProperty(e);
                        }
                      }}
                      value={property}
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
                          setOrder(e);
                        }
                      }}
                      value={order}
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
                        <Radio color="#154472" defaultChecked value="Ascending">
                          Ascending
                        </Radio>
                        <Radio color="#154472" value="Descending">
                          Descending
                        </Radio>
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
                  onClick={() => {
                    onClose();
                    setFiltering();
                  }}
                  variant="secondary"
                  color="blue.800"
                  bg="#E8EDF1"
                  borderColor="white"
                  height="48px"
                  minWidth="100px"
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
