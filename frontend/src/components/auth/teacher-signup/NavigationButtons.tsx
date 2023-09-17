import React from "react";
import { Button } from "@chakra-ui/react";

import { ArrowBackOutlineIcon } from "../../../assets/icons";
import ActionButton from "../../common/form/ActionButton";

interface NavigationButtonsProps {
  onContinueClick:
    | (() => void)
    | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  onBackClick: () => void;
  continueButtonText?: string;
  backButtonText?: string;
}
const NavigationButtons = ({
  onContinueClick,
  onBackClick,
  continueButtonText = "Continue",
  backButtonText = "Back",
}: NavigationButtonsProps): React.ReactElement => {
  return (
    <>
      <ActionButton
        onClick={onContinueClick}
        showDefaultToasts={false}
        variant="primary"
        width="100%"
      >
        {continueButtonText}
      </ActionButton>
      <Button
        leftIcon={<ArrowBackOutlineIcon />}
        onClick={onBackClick}
        type="button"
        variant="tertiary"
      >
        {backButtonText}
      </Button>
    </>
  );
};

export default NavigationButtons;
