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
        width="50%"
        height="100vh"
      />
      <VStack width="50%" height="100vh" padding={6}>
        <Image src={JUMP_MATH_LOGO.src} alt={JUMP_MATH_LOGO.alt} py={5} />
        <Text textStyle="header4" textAlign="center" pb={4}>
          {title}
        </Text>
        {form}
      </VStack>
    </HStack>
  );
};

export default AuthTemplate;
