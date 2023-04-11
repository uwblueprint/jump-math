import React from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import { TestRequest } from "../../../APIClients/types/TestClientTypes";
import {
  EyeOutlineIcon,
  SaveOutlineIcon,
  TextOutlineIcon,
} from "../../../assets/icons";
import { getReadableDate } from "../../../utils/GeneralUtils";
import BackButton from "../../common/BackButton";
import PublishModal from "../assessment-status/EditStatusModals/PublishModal";

interface CreateAssessementHeaderProps {
  name: string;
  handleSubmit: UseFormHandleSubmit<TestRequest>;
  onPublish: (data: TestRequest) => Promise<void>;
  onSave: (data: TestRequest) => Promise<void>;
  onError: () => void;
  validateForm: () => boolean;
}

const CreateAssessementHeader = ({
  name,
  handleSubmit,
  onPublish,
  onSave,
  onError,
  validateForm,
}: CreateAssessementHeaderProps): React.ReactElement => {
  const [showPublishModal, setShowPublishModal] = React.useState(false);
  const confirmPublish = () => {
    if (validateForm()) {
      setShowPublishModal(true);
    }
  };

  const handleSave = handleSubmit(onSave, onError);
  const handlePublish = handleSubmit(confirmPublish, onError);
  const onConfirmPublish = handleSubmit(onPublish, onError);

  return (
    <>
      <Box
        borderBottom="1px"
        borderBottomColor="grey.200"
        padding="1.5em 2em 1.5em 2em"
        width="100%"
      >
        <Flex minWidth="max-content">
          <HStack alignItems="start" spacing={6}>
            <BackButton />
            <VStack align="left">
              <Text textStyle="subtitle1">{name || "Untitled Assessment"}</Text>
              <Text textStyle="smallerParagraph">
                Created {getReadableDate()}
              </Text>
            </VStack>
          </HStack>
          <Spacer />
          <HStack spacing={2}>
            <Button leftIcon={<EyeOutlineIcon />} size="sm" variant="tertiary">
              Preview
            </Button>
            <Button
              leftIcon={<SaveOutlineIcon />}
              minWidth="10"
              onClick={handleSave}
              variant="secondary"
            >
              Save
            </Button>
            <Button
              leftIcon={<TextOutlineIcon />}
              minWidth="10"
              onClick={handlePublish}
              variant="primary"
            >
              Publish
            </Button>
          </HStack>
        </Flex>
      </Box>
      <PublishModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        publishAssessment={onConfirmPublish}
      />
    </>
  );
};

export default CreateAssessementHeader;
