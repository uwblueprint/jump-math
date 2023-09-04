import React from "react";
import { ModalBody, ModalHeader, Text } from "@chakra-ui/react";

interface ModalTextProps {
  header?: React.ReactNode;
  body?: React.ReactNode;
  textColor?: string;
}

const ModalText = ({
  header,
  body,
  textColor,
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
          {typeof body === "string" ? (
            <Text color="grey.300" textStyle="paragraph">
              {body}
            </Text>
          ) : (
            body
          )}
        </ModalBody>
      )}
    </>
  );
};

export default ModalText;
