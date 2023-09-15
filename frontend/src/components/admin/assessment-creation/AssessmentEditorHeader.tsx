import React, { useContext } from "react";
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
import AssessmentContext from "../../../contexts/AssessmentContext";
import { formatDate, getCurrentDate } from "../../../utils/GeneralUtils";
import ActionButton from "../../common/form/ActionButton";
import BackButton from "../../common/navigation/BackButton";
import Popover from "../../common/popover/Popover";
import PopoverButton from "../../common/popover/PopoverButton";
import ArchiveAssessmentModal from "../assessment-status/EditStatusModals/ArchiveAssessmentModal";
import DeleteAssessmentModal from "../assessment-status/EditStatusModals/DeleteAssessmentModal";
import PublishAssessmentModal from "../assessment-status/EditStatusModals/PublishAssessmentModal";

interface AssessmentEditorHeaderProps {
  name: string;
  handleSubmit: UseFormHandleSubmit<TestRequest>;
  isEditing: boolean;
  onConfirmArchive: SubmitHandler<TestRequest>;
  onConfirmPublish: SubmitHandler<TestRequest>;
  onDelete: SubmitHandler<TestRequest>;
  onSave: SubmitHandler<TestRequest>;
  onError: () => void;
  validateForm: () => void;
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
  const { setShowAssessmentPreview } = useContext(AssessmentContext);
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
    validateForm();
    onPublishModalOpen();
  };

  const handleSave = handleSubmit(onSave, onError);
  const handlePublish = handleSubmit(onPublish, onError);
  const handleConfirmPublish = handleSubmit(onConfirmPublish, onError);
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
            <Text as="h1" color="blue.300" textStyle="header4">
              <BackButton />
            </Text>
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
            <Button
              leftIcon={<EyeOutlineIcon />}
              onClick={() => setShowAssessmentPreview(true)}
              size="sm"
              variant="tertiary"
            >
              Preview
            </Button>
            <ActionButton
              leftIcon={<SaveOutlineIcon />}
              messageOnError="Failed to save the assessment. Please try again later."
              messageOnSuccess="Assessment saved."
              minWidth="10"
              onClick={handleSave}
              variant="secondary"
            >
              Save
            </ActionButton>
            <ActionButton
              leftIcon={<TextOutlineIcon />}
              minWidth="10"
              onClick={handlePublish}
              showDefaultToasts={false}
              variant="primary"
            >
              Publish
            </ActionButton>
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
                      onArchiveModalOpen();
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
      <PublishAssessmentModal
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
