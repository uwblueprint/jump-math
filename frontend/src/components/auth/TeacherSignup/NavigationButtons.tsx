import { Button } from "@chakra-ui/react";
import React from "react";
import { ArrowBackOutlineIcon } from "../../../assets/icons";

interface NavigationButtonsProps {
  onContinueClick:
    | (() => void)
    | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  onBackClick: () => void;
  continueButtonText: string;
  backButtonText: string;
}
const NavigationButtons = ({
  onContinueClick,
  onBackClick,
  continueButtonText,
  backButtonText,
}: NavigationButtonsProps): React.ReactElement => {
  return (
    <>
      <Button variant="primary" width="100%" onClick={onContinueClick}>
        {continueButtonText}
      </Button>
      <Button
        leftIcon={<ArrowBackOutlineIcon />}
        variant="tertiary"
        onClick={onBackClick}
      >
        {backButtonText}
      </Button>
    </>
  );
};

export default NavigationButtons;
