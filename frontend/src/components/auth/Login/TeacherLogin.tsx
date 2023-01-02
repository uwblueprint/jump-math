import React from "react";
import { Image, HStack, VStack, Button } from "@chakra-ui/react";
import TeacherResetPassword from "../PasswordReset/TeacherResetPassword";

const renderComponent = (
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
) => {
  switch (page) {
    case 1:
      return (
        <Button
          onClick={() => setPage(2)}
          display="contents"
          color="blue.300"
          style={{ font: "inherit" }}
        >
          Forgot Password?
        </Button>
      );
    case 2:
      return <TeacherResetPassword setPage={setPage} />;
    default:
      return <></>;
  }
};

const TeacherLogin = (): React.ReactElement => {
  const [page, setPage] = React.useState(1);
  return (
    <HStack>
      <Image
        src="https://storage.googleapis.com/jump-math-98edf.appspot.com/teacher-signup.png"
        alt="Teacher-Signup"
        fit="cover"
        width="50%"
        height="100vh"
      />
      <VStack width="50%" height="100vh" padding={6}>
        <Image
          src="https://storage.googleapis.com/jump-math-98edf.appspot.com/jump_math_logo_short_ver.png"
          alt="Jump-Math-Logo"
          py={5}
        />
        {renderComponent(page, setPage)}
      </VStack>
    </HStack>
  );
};

export default TeacherLogin;
