import React, { useContext, useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Flex, Image, Input } from "@chakra-ui/react";

import { UPLOAD_TEST_IMAGE } from "../../../APIClients/mutations/TestMutations";
import { UploadOutlineIcon } from "../../../assets/icons";
import { JUMP_MATH_LOGO } from "../../../assets/images";
import QuestionEditorContext from "../../../contexts/QuestionEditorContext";
import { ImageMetadata } from "../../../types/QuestionMetadataTypes";
import { updatedQuestionElement } from "../../../utils/QuestionUtils";

interface ImageElementProps {
  id: string;
  data: ImageMetadata;
}

const ImageElement = ({ id, data }: ImageElementProps): React.ReactElement => {
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata>(data);
  const [error, setError] = useState<string>("");
  const [uploadTestImage] = useMutation<{ uploadTestImage: ImageMetadata }>(
    UPLOAD_TEST_IMAGE,
    {
      onCompleted: (res) => {
        setImageMetadata(res.uploadTestImage);
      },
      onError: (err) => {
        setError("Error uploading image.");
      },
    },
  );
  const inputFile = useRef<HTMLInputElement>(null);

  const { setQuestionElements } = useContext(QuestionEditorContext);

  const updateImageElement = async (e: { target: HTMLInputElement }) => {
    setError("");
    const fileList: FileList | null = e.target.files;
    if (!fileList || !fileList[0]) return;

    const fileSize = fileList[0].size / 1024 / 1024;
    if (fileSize > 5) {
      setError("Your file exceeds 5MB. Upload a smaller file.");
    }

    await uploadTestImage({
      variables: { file: fileList[0] },
    });
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
      position="relative"
      tabIndex={0}
      w="100%"
    >
      <Image
        h="100%"
        objectFit="contain"
        opacity={imageMetadata.url ? 1 : 0.5}
        position="absolute"
        src={imageMetadata.url || JUMP_MATH_LOGO.src}
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
