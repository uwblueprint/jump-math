import React, { useContext } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

import QuestionEditorContext from "../../../../../../contexts/QuestionEditorContext";
import type { FractionType } from "../../../../../../types/QuestionTypes";
import FractionInput from "../../../../../common/fraction/FractionInput";
import Modal from "../../../../../common/modal/Modal";

interface ChooseFractionTypeModalProps {
  onSecondModalOpen: () => void;
  fractionType: FractionType;
  setFractionType: (val: FractionType) => void;
}

const ChooseFractionTypeModal = ({
  onSecondModalOpen,
  fractionType,
  setFractionType,
}: ChooseFractionTypeModalProps): React.ReactElement => {
  const { showAddFractionModal, setShowAddFractionModal } = useContext(
    QuestionEditorContext,
  );

  const handleClose = () => {
    setFractionType("regular");
    setShowAddFractionModal(false);
  };

  const handleConfirm = () => {
    if (fractionType) {
      setShowAddFractionModal(false);
      onSecondModalOpen();
    }
  };

  return (
    <Modal
      header="Create fraction question"
      isOpen={showAddFractionModal}
      onClose={handleClose}
      onSubmit={handleConfirm}
      submitButtonText="Next"
    >
      <FormControl isRequired>
        <FormLabel color="grey.400" style={{ fontSize: "18px" }}>
          Choose the format you want to use below
        </FormLabel>
        <RadioGroup
          defaultValue={fractionType}
          onChange={(val: FractionType) => setFractionType(val)}
        >
          <Stack>
            <Radio value="regular">
              <FormHelperText
                color="grey.300"
                pb="1em"
                style={{ fontSize: "18px" }}
              >
                Regular
              </FormHelperText>
              <FractionInput
                denominator=""
                numerator=""
                readOnly
                wholeNumber={null}
              />
            </Radio>
            <Radio value="mixed">
              <FormHelperText
                color="grey.300"
                pb="1em"
                style={{ fontSize: "18px" }}
              >
                Mixed
              </FormHelperText>
              <FractionInput
                denominator=""
                numerator=""
                readOnly
                wholeNumber=""
              />
            </Radio>
          </Stack>
        </RadioGroup>
        <FormErrorMessage>Select a value before confirming.</FormErrorMessage>
      </FormControl>
    </Modal>
  );
};

export default ChooseFractionTypeModal;
