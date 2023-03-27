import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  IconButton,
  Spacer,
  VStack,
} from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../assets/icons";
import { MultiSelectData } from "../../../types/QuestionTypes";

import EditMultiSelectModal from "./modals/multi-select/EditMultiSelectModal";

interface MultiSelectElementProps {
  id: string;
  data: MultiSelectData;
}

const MultiSelectElement = ({
  id,
  data,
}: MultiSelectElementProps): React.ReactElement => {
  const [
    showEditMultiSelectModal,
    setShowEditMultiSelectModal,
  ] = React.useState(false);
  return (
    <Flex paddingBottom="4" paddingLeft="6" width="100%">
      <VStack alignItems="left" gap="1" paddingRight="4" paddingTop="2">
        {data.options.map((option, index) => (
          <Checkbox
            key={index}
            isChecked={option.isCorrect}
            isReadOnly
            marginBottom="0"
            size="lg"
          >
            {option.value}
          </Checkbox>
        ))}
      </VStack>
      <Spacer />
      <Box _hover={{ color: "blue.100" }} color="grey.300">
        <Button
          as={IconButton}
          color="currentColor"
          fontSize="24px"
          icon={<EditOutlineIcon />}
          onClick={() => setShowEditMultiSelectModal(true)}
          size="icon"
        />
      </Box>
      <EditMultiSelectModal
        data={data}
        id={id}
        isOpen={showEditMultiSelectModal}
        setOpen={setShowEditMultiSelectModal}
      />
    </Flex>
  );
};

export default MultiSelectElement;
