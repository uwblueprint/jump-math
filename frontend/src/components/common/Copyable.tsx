import React, { useState } from "react";
import type { ButtonProps } from "@chakra-ui/react";
import { Button, HStack, Text } from "@chakra-ui/react";

import { CopyIcon } from "../../assets/icons";

export type CopyableProps = {
  displayedValue?: string;
  value: string;
  label: string;
} & ButtonProps;

const Copyable = ({
  displayedValue,
  value,
  label,
  ...props
}: CopyableProps): React.ReactElement => {
  const [isClipboardSupported, setClipboardSupported] = useState(
    typeof navigator !== "undefined" && navigator.clipboard !== undefined,
  );

  const [copied, setCopied] = useState(false);
  const copy = async () => {
    if (!isClipboardSupported) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 500);
    } catch (e) {
      setClipboardSupported(false);
    }
  };
  return (
    <Button
      aria-label="Click to copy"
      cursor={isClipboardSupported ? "pointer" : "text"}
      display="flex"
      flexDirection="column"
      minWidth="0"
      onClick={copy}
      userSelect={isClipboardSupported ? "none" : "text"}
      variant="unstyled"
      {...props}
    >
      <HStack gap={1} userSelect={isClipboardSupported ? "none" : "all"}>
        <CopyIcon
          aria-hidden="true"
          boxSize="20px"
          cursor={isClipboardSupported ? "inherit" : "default"}
        />
        <Text color="blue.300" m="0 !important" textStyle="smallerParagraph">
          {displayedValue || value}
        </Text>
      </HStack>
      <Text color="blue.200" m="0 !important" textStyle="mobileSubtitle2">
        {copied ? "Copied!" : label}
      </Text>
    </Button>
  );
};
export default Copyable;
