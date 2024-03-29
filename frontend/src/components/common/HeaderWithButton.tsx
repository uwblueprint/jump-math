import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, HStack, Skeleton, Spacer, Text } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../assets/icons";

type HeaderWithButtonProps = {
  button?: React.ReactElement;
  buttonIcon?: React.ReactElement;
  buttonText?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
  showButton?: boolean;
  targetRoute?: string;
  title?: string;
};

const HeaderWithButton = ({
  button,
  buttonIcon = <PlusOutlineIcon />,
  buttonText,
  children,
  isLoading = false,
  onClick,
  showButton = true,
  targetRoute,
  title,
}: HeaderWithButtonProps): React.ReactElement => {
  const history = useHistory();

  return (
    <Box>
      <HStack gap={4} justifyContent="space-between">
        <Text
          as="h1"
          color="blue.300"
          mb={0}
          textAlign="left"
          textStyle="header4"
        >
          <Skeleton as="span" isLoaded={!isLoading}>
            <Box as="span">{title ?? "Loading..."}</Box>
          </Skeleton>
        </Text>
        {children}
        <Spacer />
        {showButton &&
          (button ?? (
            <Button
              onClick={targetRoute ? () => history.push(targetRoute) : onClick}
              rightIcon={buttonIcon}
              variant="primary"
            >
              {buttonText}
            </Button>
          ))}
      </HStack>
    </Box>
  );
};

export default HeaderWithButton;
