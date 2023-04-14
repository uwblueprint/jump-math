import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";

import { EditOutlineIcon, UploadOutlineIcon } from "../../../assets/icons";
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
      exceedsMaxFileSize(file) ? "Image exceeds maximum file size of 5MB" : "",
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
    <Flex pb={6} w="100%">
      <Input
        ref={inputFile}
        accept="image/*"
        display="none"
        onChange={updateImageElement}
        type="file"
      />
      {imageMetadata.previewUrl ? (
        <>
          <Image
            h="250px"
            objectFit="contain"
            pt={2}
            src={imageMetadata.previewUrl}
            width="90%"
          />
          <Spacer />
          <Box _hover={{ color: "blue.100" }} color="grey.300">
            <Button
              as={IconButton}
              color="currentColor"
              fontSize="24px"
              icon={<EditOutlineIcon />}
              onClick={openFileBrowser}
              size="icon"
            />
          </Box>
        </>
      ) : (
        <Button
          border="1px dashed #636363"
          borderRadius="16px"
          color="grey.300"
          leftIcon={<UploadOutlineIcon />}
          minHeight="250px"
          onClick={openFileBrowser}
          pt={2}
          width="100%"
        >
          <Text textStyle="paragraph">Upload Image</Text>
        </Button>
      )}
    </Flex>
  );
};

export default ImageElement;
