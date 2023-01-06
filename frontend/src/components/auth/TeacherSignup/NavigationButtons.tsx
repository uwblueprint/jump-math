import { Button } from "@chakra-ui/react";
import React from "react";
import { ArrowBackOutlineIcon } from "../../../assets/icons";

interface NavigationButtonsProps {
  onContinueClick:
    | (() => void)
    | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  onBackClick: () => void;
  firstPage?: boolean;
}
const NavigationButtons = ({
  onContinueClick,
  onBackClick,
  firstPage,
}: NavigationButtonsProps): React.ReactElement => {
  return (
    <>
      <Button variant="primary" width="100%" onClick={onContinueClick}>
        Continue
      </Button>
      <Button
        leftIcon={<ArrowBackOutlineIcon />}
        variant="tertiary"
        onClick={onBackClick}
      >
        Back{firstPage ? " to login page" : ""}
      </Button>
    </>
  );
};

export default NavigationButtons;
