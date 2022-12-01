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
} from "@chakra-ui/react";
import { FilterOptionsIcon } from "../icons";

const SortTablePopover = (): React.ReactElement => {
  return (
    <>
      <Popover placement="top-start">
        <PopoverTrigger>
          <Button size="md" rightIcon={<FilterOptionsIcon />} bg="#F4F4F4">
            Sort
          </Button>
        </PopoverTrigger>
        <PopoverContent color="black" bg="white" borderColor="blue.800">
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
            {/* <Box fontSize="sm">Step 2 of 4</Box> */}
            <ButtonGroup size="sm">
              <Button pl="500%" colorScheme="blue">
                Apply
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SortTablePopover;
