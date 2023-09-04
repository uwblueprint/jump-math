import React from "react";
import { ModalBody, ModalHeader, Text } from "@chakra-ui/react";

interface ModalTextProps {
  header?: React.ReactNode;
  body?: string;
  textColor?: string;
  customBodyText?: React.ReactNode;
}

const ModalText = ({
  header,
  body,
  textColor,
  customBodyText,
}: ModalTextProps): React.ReactElement => {
  return (
    <>
      {header && (
        <ModalHeader>
          <Text color={textColor || "grey.400"} textStyle="subtitle2">
            {header}
          </Text>
        </ModalHeader>
      )}
      {body && (
        <ModalBody>
          <Text color="grey.300" textStyle="paragraph">
            {body}
          </Text>
          {customBodyText && customBodyText}
        </ModalBody>
      )}
    </>
  );
};

export default ModalText;
