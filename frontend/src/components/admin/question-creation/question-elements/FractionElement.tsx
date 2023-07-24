import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Input,
  Spacer,
  VStack,
} from "@chakra-ui/react";

import { EditOutlineIcon } from "../../../../assets/icons";
import type { FractionMetadata } from "../../../../types/QuestionMetadataTypes";

import EditFractionModal from "./modals/fraction/EditFractionModal";
import {
  getDividerWidth,
  getFractionInputWidth,
} from "./modals/fraction/FractionModal";

interface FractionElementProps {
  id: string;
  data: FractionMetadata;
}

const FractionElement = ({
  id,
  data,
}: FractionElementProps): React.ReactElement => {
  const [showEditFractionModal, setShowEditFractionModal] =
    React.useState(false);
  const numeratorWidth = getFractionInputWidth(String(data.numerator));
  const denominatorWidth = getFractionInputWidth(String(data.denominator));

  return (
    <Flex paddingBottom="4" paddingLeft="6" width="100%">
      <VStack alignItems="center" px={8} py={4}>
        <Input
          border="2px solid #636363"
          borderRadius={2}
          ml={1}
          readOnly
          value={data.numerator}
          width={`${numeratorWidth}px`}
        />
        <Divider
          borderBottomWidth="2px"
          borderColor="grey.300"
          w={`${getDividerWidth(numeratorWidth, denominatorWidth)}px`}
        />
        <Input
          border="2px solid #636363"
          borderRadius={2}
          ml={1}
          readOnly
          value={data.denominator}
          width={`${denominatorWidth}px`}
        />
      </VStack>
      <Spacer />
      <Box _hover={{ color: "blue.100" }} color="grey.300">
        <Button
          as={IconButton}
          color="currentColor"
          fontSize="24px"
          icon={<EditOutlineIcon />}
          onClick={() => setShowEditFractionModal(true)}
          size="icon"
        />
      </Box>
      <EditFractionModal
        data={data}
        id={id}
        isOpen={showEditFractionModal}
        setOpen={setShowEditFractionModal}
      />
    </Flex>
  );
};

export default FractionElement;
