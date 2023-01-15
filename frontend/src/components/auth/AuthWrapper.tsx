import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Image, HStack, Text, VStack, Flex } from "@chakra-ui/react";

import FormError from "./FormError";
import AuthContext from "../../contexts/AuthContext";
import ImageType from "../../types/ImageTypes";
import { HOME_PAGE } from "../../constants/Routes";
import { JUMP_MATH_LOGO } from "../../assets/images";

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
        src={image.src}
        alt={image.alt}
        fit="cover"
        width="50vw"
        height="100vh"
        objectPosition="right"
      />
      <Flex
        width="50vw"
        maxHeight="90vh"
        overflow="scroll"
        justifyContent="center"
      >
        <VStack width="75%" spacing={6}>
          <Image src={JUMP_MATH_LOGO.src} alt={JUMP_MATH_LOGO.alt} h={24} />
          <Text textStyle="header4" textAlign="center">
            {title}
          </Text>
          <Text
            textStyle="subtitle2"
            textAlign="center"
            pb={error ? "0" : "4"}
            whiteSpace="pre-line"
          >
            {subtitle}
          </Text>
          {error && <FormError message={error} />}
          {form}
        </VStack>
      </Flex>
    </HStack>
  );
};

export default AuthWrapper;
