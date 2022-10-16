import { ModalBody, ModalHeader, Text } from "@chakra-ui/react";
import React from "react";

interface ModalTextProps {
  header?: string;
  body: string[];
}

const ModalText = ({ header, body }: ModalTextProps): React.ReactElement => {
  return (
    <>
      {header && (
        <ModalHeader>
          <Text textStyle="subtitle1" align="center" color="grey.400">
            {header}
          </Text>
        </ModalHeader>
      )}
      <ModalBody>
        {body.map((text, i) => (
          <Text key={i} textStyle="paragraph" align="center" color="grey.300">
            {text}
          </Text>
        ))}
      </ModalBody>
    </>
  );
};

export default ModalText;
