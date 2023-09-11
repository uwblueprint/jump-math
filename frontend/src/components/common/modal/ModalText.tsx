import React from "react";
import { ModalBody, ModalHeader, Text } from "@chakra-ui/react";

interface ModalTextProps {
  header?: React.ReactNode;
  body?: React.ReactNode;
  textColor?: string;
  isLargeVariant?: boolean;
}

const ModalText = ({
  header,
  body,
  textColor,
  isLargeVariant,
}: ModalTextProps): React.ReactElement => {
  return (
    <>
      {header && (
        <ModalHeader>
          <Text
            color={textColor || "grey.400"}
            textStyle={isLargeVariant ? "subtitle1" : "subtitle2"}
          >
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
