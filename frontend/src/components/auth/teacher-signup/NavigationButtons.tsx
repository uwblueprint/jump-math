import React from "react";
import { Button } from "@chakra-ui/react";

import { ArrowBackOutlineIcon } from "../../../assets/icons";

interface NavigationButtonsProps {
  onContinueClick:
    | (() => void)
    | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  onBackClick: () => void;
  continueButtonText?: string;
  backButtonText?: string;
  continueIsLoading?: boolean;
}
const NavigationButtons = ({
  onContinueClick,
  onBackClick,
  continueButtonText = "Continue",
  backButtonText = "Back",
  continueIsLoading = false,
}: NavigationButtonsProps): React.ReactElement => {
  return (
    <>
      <Button
        isLoading={continueIsLoading}
        onClick={onContinueClick}
        variant="primary"
        width="100%"
      >
        {continueButtonText}
      </Button>
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
