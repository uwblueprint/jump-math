import React from "react";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
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
import ArchiveModal from "../assessment-status/EditStatusModals/ArchiveModal";
import DeleteModal from "../assessment-status/EditStatusModals/DeleteModal";
import PublishModal from "../assessment-status/EditStatusModals/PublishModal";

interface AssessmentEditorHeaderProps {
  name: string;
  handleSubmit: UseFormHandleSubmit<TestRequest>;
  isEditing: boolean;
  onConfirmArchive: SubmitHandler<TestRequest>;
  onConfirmPublish: SubmitHandler<TestRequest>;
  onDelete: SubmitHandler<TestRequest>;
  onSave: SubmitHandler<TestRequest>;
  onError: () => void;
  validateForm: () => boolean;
}

const AssessmentEditorHeader = ({
  name,
  handleSubmit,
  isEditing,
  onConfirmArchive,
  onConfirmPublish,
  onDelete,
  onSave,
  onError,
  validateForm,
}: AssessmentEditorHeaderProps): React.ReactElement => {
  const history = useHistory();
  const [showPublishModal, setShowPublishModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showArchiveModal, setShowArchiveModal] = React.useState(false);

  const onPublish = () => {
    if (validateForm()) {
      setShowPublishModal(true);
    }
  };

  const onArchive = () => {
    if (validateForm()) {
      setShowArchiveModal(true);
    }
  };

  const handleSave = handleSubmit(onSave, onError);
  const handlePublish = handleSubmit(onPublish, onError);
  const handleConfirmPublish = handleSubmit(onConfirmPublish, onError);
  const handleArchive = handleSubmit(onArchive, onError);
  const handleConfirmArchive = handleSubmit(onConfirmArchive, onError);
  const handleDelete = handleSubmit(onDelete, onError);
  const handleCloseEditor = () => history.goBack();

  const {
    onOpen: onOpenPopover,
    isOpen: popoverIsOpen,
    onClose: onClosePopover,
  } = useDisclosure();

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
            <Popover
              isOpen={popoverIsOpen}
              onClose={onClosePopover}
              onOpen={onOpenPopover}
            >
              <VStack
                divider={<Divider borderColor="grey.200" />}
                spacing="0em"
              >
                {isEditing && (
                  <EditStatusButton
                    name="Archive"
                    onClick={() => {
                      onClosePopover();
                      handleArchive();
                    }}
                  />
                )}
                <EditStatusButton
                  name="Delete"
                  onClick={() => {
                    onClosePopover();
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
      <ArchiveModal
        archiveAssessment={handleConfirmArchive}
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
      />
      <DeleteModal
        deleteAssessment={isEditing ? handleDelete : handleCloseEditor}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </>
  );
};

export default AssessmentEditorHeader;
