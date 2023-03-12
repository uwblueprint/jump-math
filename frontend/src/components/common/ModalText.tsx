import React from "react";
import { ModalBody, ModalHeader, Text } from "@chakra-ui/react";

interface ModalTextProps {
  header?: string;
  body?: string[];
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
          <Text
            align="center"
            color={textColor || "grey.400"}
            textStyle="subtitle1"
          >
            {header}
          </Text>
        </ModalHeader>
      )}
      {body && (
        <ModalBody>
          {body.map((text, i) => (
            <Text key={i} align="center" color="grey.300" textStyle="paragraph">
              {text}
            </Text>
          ))}
        </ModalBody>
      )}
    </>
  );
};

export default ModalText;
