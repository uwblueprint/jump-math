import React from "react";
import { FormControl, FormLabel, HStack } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../assets/icons";
import IconButton from "../../common/IconButton";

interface ReviewItemProps {
  label: string;
  value: React.ReactNode;
  handleEdit: () => void;
  isRequired?: boolean;
}

const ReviewItem = ({
  label,
  value,
  handleEdit,
  isRequired = true,
}: ReviewItemProps): React.ReactElement => (
  <FormControl isRequired={isRequired}>
    <HStack alignItems="flex-end">
      <FormLabel color="blue.300" marginRight={0}>
        {label}
      </FormLabel>
      <IconButton icon={<EditOutlineIcon />} onClick={handleEdit} />
    </HStack>
    {value}
  </FormControl>
);

export default ReviewItem;
