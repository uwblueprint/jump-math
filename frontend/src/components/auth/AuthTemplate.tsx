import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Image, HStack, Text, VStack } from "@chakra-ui/react";

import AuthContext from "../../contexts/AuthContext";
import ImageType from "../../types/ImageTypes";
import { HOME_PAGE } from "../../constants/Routes";
import { JUMP_MATH_LOGO } from "../../assets/images";

interface AuthTemplateInputProps {
  title: string;
  image: ImageType;
  form: React.ReactElement;
}

const AuthTemplate = ({
  title,
  image,
  form,
}: AuthTemplateInputProps): React.ReactElement => {
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
        {form}
      </VStack>
    </HStack>
  );
};

export default AuthTemplate;
