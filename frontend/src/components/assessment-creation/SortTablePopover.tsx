import React, { useState } from "react";
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

type AssessmentProperty =
  | "status"
  | "name"
  | "grade"
  | "type"
  | "country"
  | "region";
type SortOrder = "Ascending" | "Descending";
type OrderingStates = {
  sortProperty: AssessmentProperty;
  sortOrder: SortOrder;
  setSortProperty: React.Dispatch<React.SetStateAction<AssessmentProperty>>;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
};

const SortTablePopover = ({
  OrderingSets,
}: {
  OrderingSets: OrderingStates;
}): React.ReactElement => {
  const { setSortProperty, setSortOrder } = OrderingSets;
  const [property, setProperty] = useState<AssessmentProperty>("name");
  const [order, setOrder] = useState<SortOrder>("Ascending");

  function settingStates() {
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
                        if (
                          e === "status" ||
                          e === "name" ||
                          e === "grade" ||
                          e === "type" ||
                          e === "country" ||
                          e === "region"
                        ) {
                          setProperty(e);
                        }
                      }}
                      value={property}
                    >
                      <Stack>
                        <Text pb="2" textStyle="link">
                          Property
                        </Text>
                        <Radio defaultChecked value="name">
                          Name
                        </Radio>
                        <Radio value="status">Status</Radio>
                        <Radio value="grade">Grade</Radio>
                        <Radio value="type">Type</Radio>
                        <Radio value="country">Country</Radio>
                        <Radio value="region">Region</Radio>
                      </Stack>
                    </RadioGroup>
                    <Center height="95px">
                      <Divider orientation="vertical" />
                    </Center>
                    <RadioGroup
                      color="blue.300"
                      onChange={(e) => {
                        if (e === "Ascending" || e === "Descending") {
                          setOrder(e);
                        }
                      }}
                      value={order}
                    >
                      <Stack>
                        <Text pb="2" textStyle="link">
                          Order
                        </Text>
                        <Radio defaultChecked value="Ascending">
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
                  minWidth="10%"
                  onClick={() => {
                    settingStates();
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

export default SortTablePopover;
