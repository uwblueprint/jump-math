import { ModalBody, ModalHeader, Text } from "@chakra-ui/react";
import React from "react";

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
            textStyle="subtitle1"
            align="center"
            color={textColor || "grey.400"}
          >
            {header}
          </Text>
        </ModalHeader>
      )}
      {body && (
        <ModalBody>
          {body.map((text, i) => (
            <Text key={i} textStyle="paragraph" align="center" color="grey.300">
              {text}
            </Text>
          ))}
        </ModalBody>
      )}
    </>
  );
};

export default ModalText;
