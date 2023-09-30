import React, { useContext } from "react";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  Box,
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
import * as Routes from "../../../constants/Routes";
import AssessmentContext from "../../../contexts/AssessmentContext";
import { formatDate, getCurrentDate } from "../../../utils/GeneralUtils";
import ActionButton from "../../common/form/ActionButton";
import useActionFormHandler from "../../common/modal/useActionFormHandler";
import BackButton from "../../common/navigation/BackButton";
import Popover from "../../common/popover/Popover";
import PopoverButton from "../../common/popover/PopoverButton";
import ArchiveAssessmentModal from "../assessment-status/EditStatusModals/ArchiveAssessmentModal";
import DeleteAssessmentModal from "../assessment-status/EditStatusModals/DeleteAssessmentModal";
import PublishAssessmentModal from "../assessment-status/EditStatusModals/PublishAssessmentModal";

interface AssessmentEditorHeaderProps {
  name: string;
  isEditing: boolean;
  onConfirmArchive: SubmitHandler<TestRequest>;
  onConfirmPublish: SubmitHandler<TestRequest>;
  onDelete: SubmitHandler<TestRequest>;
  onSave: SubmitHandler<TestRequest>;
  onError: (message: string) => void;
  validateForm: () => void;
  updatedAt?: string;
}

const AssessmentEditorHeader = ({
  name,
  isEditing,
  onConfirmArchive,
  onConfirmPublish,
  onDelete,
  onSave,
  onError,
  validateForm,
  updatedAt,
}: AssessmentEditorHeaderProps): React.ReactElement => {
  const { assessmentId } = useParams<{ assessmentId?: string }>();
  const { redirectableHistory } = useContext(AssessmentContext);

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

  const onPreview = () => {
    validateForm();
    redirectableHistory.push(
      Routes.ASSESSMENT_EDITOR_PREVIEW_PAGE({
        assessmentId,
      }),
    );
  };

  const onPublish = () => {
    validateForm();
    onPublishModalOpen();
  };

  const { getValues } = useFormContext<TestRequest>();

  // We need validation on these actions.
  const handlePreview = useActionFormHandler(onPreview);
  const handleSave = useActionFormHandler(onSave);
  const handlePublish = useActionFormHandler(onPublish);

  // We don't need validation on these actions.
  const handleConfirmPublish = async () => onConfirmPublish(getValues());
  const handleConfirmArchive = async () => onConfirmArchive(getValues());
  const handleDelete = async () => onDelete(getValues());

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
              <BackButton returnTo={Routes.ASSESSMENTS_PAGE} />
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
            <ActionButton
              leftIcon={<EyeOutlineIcon />}
              onClick={handlePreview}
              showDefaultToasts={false}
              size="sm"
              variant="tertiary"
            >
              Preview
            </ActionButton>
            <ActionButton
              leftIcon={<SaveOutlineIcon />}
              messageOnError="Failed to save the assessment. Please try again later."
              messageOnSuccess="Assessment saved."
              minWidth="10"
              onClick={handleSave}
              onError={onError}
              variant="secondary"
            >
              Save
            </ActionButton>
            <ActionButton
              leftIcon={<TextOutlineIcon />}
              minWidth="10"
              onClick={handlePublish}
              onError={onError}
              showDefaultToasts={false}
              variant="primary"
            >
              Publish
            </ActionButton>
            {isEditing && (
              <Popover>
                <VStack divider={<Divider />} spacing="0em">
                  <PopoverButton name="Archive" onClick={onArchiveModalOpen} />
                  <PopoverButton name="Delete" onClick={onDeleteModalOpen} />
                </VStack>
              </Popover>
            )}
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
        deleteAssessment={handleDelete}
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
      />
    </>
  );
};

export default AssessmentEditorHeader;
