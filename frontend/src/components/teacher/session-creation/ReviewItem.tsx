import React from "react";
import { FormControl, FormLabel, HStack, IconButton } from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../assets/icons";

interface ReviewItemProps {
  label: string;
  value: React.ReactNode;
  handleEdit: () => void;
  isRequired?: boolean;
  isEditDisabled?: boolean;
}

const ReviewItem = ({
  label,
  value,
  handleEdit,
  isRequired = true,
  isEditDisabled = false,
}: ReviewItemProps): React.ReactElement => (
  <FormControl isRequired={isRequired}>
    <HStack alignItems="flex-start">
      <FormLabel color="blue.300" marginRight={0}>
        {label}
      </FormLabel>
      {!isEditDisabled && (
        <IconButton
          aria-label="Edit review item"
          icon={<EditOutlineIcon />}
          onClick={handleEdit}
          size="icon"
          variant="icon"
        />
      )}
    </HStack>
    {value}
  </FormControl>
);

export default ReviewItem;
