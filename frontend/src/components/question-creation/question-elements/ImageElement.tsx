import React, { useContext, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { Box, Button, Center, Input, Text, VStack } from "@chakra-ui/react";

import { UPLOAD_TEST_IMAGE } from "../../../APIClients/mutations/TestMutations";
import { EyeOutlineIcon, ImageIcon } from "../../../assets/icons";
import { JUMP_MATH_LOGO } from "../../../assets/images";
import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import { updatedQuestionElement } from "../../../utils/QuestionUtils";

interface ImageElementProps {
  id: string;
  data: string;
}

const ImageElement = ({ id, data }: ImageElementProps): React.ReactElement => {
  const [previewImage, setPreviewImage] = useState<string | undefined>(data);
  const [uploadTestImage] = useMutation(UPLOAD_TEST_IMAGE);
  const inputFile = useRef<HTMLInputElement>(null);

  const { setQuestionElements } = useContext(QuestionEditorContext);

  const updateImageElement = async (updatedImage: any) => {
    const fileSize = updatedImage[0].size / 1024 / 1024;
    const error =
      fileSize > 5 ? "Your file exceeds 5MB. Upload a smaller file." : "";
    try {
      const result = await uploadTestImage(updatedImage[0]);
      const { image, path } = result.data.uploadImage || {};
      setPreviewImage(path);
      setQuestionElements((prevElements) => {
        return updatedQuestionElement(id, image, prevElements, error);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const openFileBrowser = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  return (
    <Box
      as="button"
      h="100%"
      onClick={openFileBrowser}
      position="relative"
      tabIndex={0}
      w="100%"
    >
      <Box
        backgroundImage={previewImage ?? JUMP_MATH_LOGO.src}
        backgroundPosition="center"
        backgroundSize="cover"
        bgRepeat="no-repeat"
        height="100%"
        left="0"
        position="absolute"
        top="0"
        width="100%"
        zIndex="-1"
      />
      <Input
        ref={inputFile}
        accept="image/*"
        display="none"
        id={id}
        onChange={(e) => updateImageElement(e.target.value)}
        type="file"
      />
      <Button leftIcon={<EyeOutlineIcon />} variant="secondary">
        Upload Image
      </Button>
    </Box>
  );
};

export default ImageElement;
