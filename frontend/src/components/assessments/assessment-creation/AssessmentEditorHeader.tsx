import React from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Spacer,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { TestRequest } from "../../../APIClients/types/TestClientTypes";
import {
  EyeOutlineIcon,
  SaveOutlineIcon,
  TextOutlineIcon,
} from "../../../assets/icons";
import { getCurrentDate } from "../../../utils/GeneralUtils";
import BackButton from "../../common/BackButton";
import Popover from "../../common/Popover";
import EditStatusButton from "../assessment-status/EditStatusButton";
import DeleteModal from "../assessment-status/EditStatusModals/DeleteModal";
import PublishModal from "../assessment-status/EditStatusModals/PublishModal";

interface AssessmentEditorHeaderProps {
  name: string;
  handleSubmit: UseFormHandleSubmit<TestRequest>;
  isEditing: boolean;
  onConfirmPublish: (data: TestRequest) => Promise<void>;
  onSave: (data: TestRequest) => Promise<void>;
  onError: () => void;
  validateForm: () => boolean;
}

const AssessmentEditorHeader = ({
  name,
  handleSubmit,
  isEditing,
  onConfirmPublish,
  onSave,
  onError,
  validateForm,
}: AssessmentEditorHeaderProps): React.ReactElement => {
  const history = useHistory();
  const [showPublishModal, setShowPublishModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const onPublish = () => {
    if (validateForm()) {
      setShowPublishModal(true);
    }
  };

  const handleSave = handleSubmit(onSave, onError);
  const handlePublish = handleSubmit(onPublish, onError);
  const handleConfirmPublish = handleSubmit(onConfirmPublish, onError);

  const { onOpen, isOpen, onClose } = useDisclosure();

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
                {/* TODO: Populate last edited date with last updated field */}
                {isEditing ? "Last edited" : "Created"} {getCurrentDate()}
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
            <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
              <VStack
                divider={<Divider borderColor="grey.200" />}
                spacing="0em"
              >
                <EditStatusButton
                  name="Delete"
                  onClick={() => {
                    onClose();
                    setShowDeleteModal(true);
                  }}
                />
              </VStack>
            </Popover>
          </HStack>
        </Flex>
      </Box>
      <PublishModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        publishAssessment={handleConfirmPublish}
      />
      <DeleteModal
        deleteAssessment={() => history.goBack()}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </>
  );
};

export default AssessmentEditorHeader;
