import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, HStack, Skeleton, Text } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../assets/icons";

type HeaderWithButtonProps = {
  buttonIcon?: React.ReactElement;
  buttonText?: string;
  isLoading?: boolean;
  onClick?: () => void;
  showButton?: boolean;
  targetRoute?: string;
  title?: string;
};

const HeaderWithButton = ({
  buttonIcon = <PlusOutlineIcon />,
  buttonText,
  isLoading = false,
  onClick,
  showButton = true,
  targetRoute,
  title,
}: HeaderWithButtonProps): React.ReactElement => {
  const history = useHistory();

  return (
    <Box>
      <HStack justifyContent="space-between">
        <Text
          as="h1"
          color="blue.300"
          mb={0}
          textAlign="left"
          textStyle="header4"
        >
          <Skeleton as="span" isLoaded={!isLoading}>
            <Box as="span">{title}</Box>
          </Skeleton>
        </Text>
        {showButton && (
          <Button
            mt={10}
            onClick={targetRoute ? () => history.push(targetRoute) : onClick}
            rightIcon={buttonIcon}
            variant="primary"
          >
            {buttonText}
          </Button>
        )}
      </HStack>
    </Box>
  );
};

export default HeaderWithButton;
