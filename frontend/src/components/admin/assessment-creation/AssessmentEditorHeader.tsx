import React from "react";
import type { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
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

import type { TestRequest } from "../../../APIClients/types/TestClientTypes";
import {
  EyeOutlineIcon,
  SaveOutlineIcon,
  TextOutlineIcon,
} from "../../../assets/icons";
import { formatDate, getCurrentDate } from "../../../utils/GeneralUtils";
import BackButton from "../../common/navigation/BackButton";
import Popover from "../../common/popover/Popover";
import PopoverButton from "../../common/popover/PopoverButton";
import ArchiveAssessmentModal from "../assessment-status/EditStatusModals/ArchiveAssessmentModal";
import DeleteAssessmentModal from "../assessment-status/EditStatusModals/DeleteAssessmentModal";
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
  updatedAt?: string;
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
  updatedAt,
}: AssessmentEditorHeaderProps): React.ReactElement => {
  const history = useHistory();
  const {
    onOpen: onPublishModalOpen,
    isOpen: isPublishModalOpen,
    onClose: onPublishModalClose,
  } = useDisclosure();
  const {
    onOpen: onDeleteModalOpen,
    isOpen: isDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const {
    onOpen: onArchiveModalOpen,
    isOpen: isArchiveModalOpen,
    onClose: onArchiveModalClose,
  } = useDisclosure();

  const onPublish = () => {
    if (validateForm()) onPublishModalOpen();
  };

  const onArchive = () => {
    if (validateForm()) onArchiveModalOpen();
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
                {isEditing ? "Last edited " : "Created "}
                {updatedAt ? formatDate(new Date(updatedAt)) : getCurrentDate()}
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
              <VStack divider={<Divider />} spacing="0em">
                {isEditing && (
                  <PopoverButton
                    name="Archive"
                    onClick={() => {
                      onClosePopover();
                      handleArchive();
                    }}
                  />
                )}
                <PopoverButton
                  name="Delete"
                  onClick={() => {
                    onClosePopover();
                    onDeleteModalOpen();
                  }}
                />
              </VStack>
            </Popover>
          </HStack>
        </Flex>
      </Box>
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={onPublishModalClose}
        publishAssessment={handleConfirmPublish}
      />
      <ArchiveAssessmentModal
        archiveAssessment={handleConfirmArchive}
        isOpen={isArchiveModalOpen}
        onClose={onArchiveModalClose}
      />
      <DeleteAssessmentModal
        deleteAssessment={isEditing ? handleDelete : handleCloseEditor}
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
      />
    </>
  );
};

export default AssessmentEditorHeader;
