import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Image, HStack, Text, VStack } from "@chakra-ui/react";

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
      <VStack width="50vw" maxHeight="90vh" spacing={6} overflow="scroll">
        <Image src={JUMP_MATH_LOGO.src} alt={JUMP_MATH_LOGO.alt} h={28} />
        <Text textStyle="header4" textAlign="center">
          {title}
        </Text>
        <Text textStyle="subtitle2" textAlign="center">
          {subtitle}
        </Text>
        {error && <FormError message={error} />}
        {form}
      </VStack>
    </HStack>
  );
};

export default AuthWrapper;
