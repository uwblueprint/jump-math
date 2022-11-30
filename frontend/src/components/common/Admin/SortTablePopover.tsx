import React from "react";
import {
  Button,
  Radio,
  Stack,
  Text,
  RadioGroup,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  ButtonGroup,
  PopoverFooter,
  Box,
} from "@chakra-ui/react";

const SortTablePopover = (): React.ReactElement => {
  return (
    <>
      <Popover placement="top-start">
        <PopoverTrigger>
          <Button>Sort</Button>
        </PopoverTrigger>
        <PopoverContent color="black" bg="white" borderColor="blue.800">
          {/* <PopoverHeader pt={4} fontWeight="bold" border="0">
            Type Sort
          </PopoverHeader> */}
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Stack direction="row" spacing={100} sx={{ pt: "2" }}>
              <RadioGroup defaultValue="1">
                <Stack>
                  <Text textStyle="subtitle2">Type</Text>
                  <Radio defaultChecked value="1">
                    Name
                  </Radio>
                  <Radio value="2">Email</Radio>
                </Stack>
              </RadioGroup>
              <RadioGroup defaultValue="1">
                <Stack>
                  <Text textStyle="subtitle2">Order</Text>
                  <Radio defaultChecked value="1">
                    Ascending
                  </Radio>
                  <Radio value="2">Descending</Radio>
                </Stack>
              </RadioGroup>
            </Stack>
          </PopoverBody>
          <PopoverFooter
            border="0"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            pb={4}
          >
            <Box fontSize="sm">Step 2 of 4</Box>
            <ButtonGroup size="sm">
              <Button colorScheme="blue">Apply</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SortTablePopover;
