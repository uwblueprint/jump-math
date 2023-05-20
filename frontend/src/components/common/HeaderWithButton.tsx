import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, HStack, Text } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../assets/icons";

type HeaderWithButtonProps = {
  buttonIcon?: React.ReactElement;
  buttonText?: string;
  onClick?: () => void;
  showButton?: boolean;
  targetRoute?: string;
  title?: string;
  buttonComponent?: React.ReactElement;
};

const HeaderWithButton = ({
  buttonIcon = <PlusOutlineIcon />,
  buttonText,
  onClick,
  showButton = true,
  targetRoute,
  title,
  buttonComponent,
}: HeaderWithButtonProps): React.ReactElement => {
  const history = useHistory();

  return (
    <Box>
      <HStack justifyContent="space-between">
        <Text color="blue.300" mb="0.5em" textAlign="left" textStyle="header4">
          {title}
        </Text>
        {showButton && !buttonComponent && (
          <Button
            mt={10}
            onClick={targetRoute ? () => history.push(targetRoute) : onClick}
            rightIcon={buttonIcon}
            variant="primary"
          >
            {buttonText}
          </Button>
        )}
        {showButton && buttonComponent && <>{buttonComponent}</>}
      </HStack>
    </Box>
  );
};

export default HeaderWithButton;
