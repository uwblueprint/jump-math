import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Flex, Image, Input } from "@chakra-ui/react";

import { UploadOutlineIcon } from "../../../assets/icons";
import { JUMP_MATH_LOGO } from "../../../assets/images";
import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import { ImageMetadata } from "../../../types/QuestionMetadataTypes";
import {
  exceedsMaxFileSize,
  updatedQuestionElement,
} from "../../../utils/QuestionUtils";

interface ImageElementProps {
  id: string;
  data: ImageMetadata;
}

const ImageElement = ({ id, data }: ImageElementProps): React.ReactElement => {
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata>(data);
  const [error, setError] = useState<string>("");
  const inputFile = useRef<HTMLInputElement>(null);
  const { setQuestionElements } = useContext(QuestionEditorContext);

  const updateImageElement = (event: { target: HTMLInputElement }) => {
    const file: File | undefined = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (e.target?.result) {
        setImageMetadata({
          previewUrl: e.target.result as string,
          file,
        });
      }
    };
    fileReader.readAsDataURL(file);
    setError(
      exceedsMaxFileSize(file)
        ? "Your file exceeds 5MB. Upload a smaller file."
        : "",
    );
  };

  const openFileBrowser = () => {
    if (inputFile.current) inputFile.current.click();
  };

  useEffect(() => {
    setQuestionElements((prevElements) => {
      return updatedQuestionElement(id, imageMetadata, prevElements, error);
    });
  }, [imageMetadata]);

  return (
    <Flex
      alignItems="center"
      h="250px"
      justifyContent="center"
      pb={8}
      position="relative"
      tabIndex={0}
      w="100%"
    >
      <Image
        h="100%"
        objectFit="contain"
        opacity={imageMetadata.previewUrl ? 1 : 0.5}
        position="absolute"
        src={imageMetadata.previewUrl || JUMP_MATH_LOGO.src}
        w="100%"
        zIndex="-1"
      />
      <Input
        ref={inputFile}
        accept="image/*"
        display="none"
        onChange={updateImageElement}
        type="file"
      />
      <Button
        leftIcon={<UploadOutlineIcon />}
        onClick={openFileBrowser}
        variant="secondary"
      >
        Upload Image
      </Button>
    </Flex>
  );
};

export default ImageElement;
