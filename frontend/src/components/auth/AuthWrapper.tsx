import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";

import { JUMP_MATH_LOGO } from "../../assets/images";
import { HOME_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import ImageType from "../../types/ImageTypes";
import FormFieldError from "../common/state/FormFieldError";

interface AuthWrapperInputProps {
  title: string;
  subtitle: string;
  image: ImageType;
  form?: React.ReactElement;
  error?: string;
}

const AuthWrapper = ({
  title,
  subtitle,
  image,
  form,
  error,
}: AuthWrapperInputProps): React.ReactElement => {
  const { authenticatedUser } = useContext(AuthContext);
  if (authenticatedUser) return <Redirect to={HOME_PAGE} />;

  return (
    <HStack>
      <Image
        alt={image.alt}
        fit="cover"
        height="100vh"
        objectPosition="right"
        src={image.src}
        width="50vw"
      />
      <Flex
        justifyContent="center"
        maxHeight="90vh"
        overflow="scroll"
        width="50vw"
      >
        <VStack spacing={6} width="75%">
          <Image alt={JUMP_MATH_LOGO.alt} h={24} src={JUMP_MATH_LOGO.src} />
          <Text textAlign="center" textStyle="header4">
            {title}
          </Text>
          <Text
            pb={error ? "0" : "4"}
            textAlign="center"
            textStyle="subtitle2"
            whiteSpace="pre-line"
          >
            {subtitle}
          </Text>
          {error && <FormFieldError message={error} />}
          {form}
        </VStack>
      </Flex>
    </HStack>
  );
};

export default AuthWrapper;
