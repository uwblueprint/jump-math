import { useQuery } from "@apollo/client";
import { VStack, Text, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GET_USER_BY_EMAIL } from "../../../APIClients/queries/UserQueries";
import {
  ADMIN_SIGNUP_IMAGE,
  TEACHER_SIGNUP_IMAGE,
} from "../../../assets/images";
import { TEACHER_LOGIN } from "../../../constants/Routes";
import { Role } from "../../../types/AuthTypes";
import ImageType from "../../../types/ImageTypes";
import LoadingState from "../../common/LoadingState";
import AuthWrapper from "../AuthWrapper";
import PasswordForm from "../Password/PasswordForm";

const ResetPassword = ({
  oobCode,
  email,
}: {
  oobCode: string;
  email: string;
}): React.ReactElement => {
  const [step, setStep] = useState(1);
  const [role, setRole] = React.useState<Role | null>(null);
  const [password, setPassword] = React.useState<string>("");
  const [image, setImage] = React.useState<ImageType | null>(null);
  const history = useHistory();

  useQuery(GET_USER_BY_EMAIL, {
    variables: { email },
    onCompleted: (data) => {
      setRole(data.userByEmail.role);
      setPassword(data.userByEmail.password);
    },
  });

  if (role === "Admin") setImage(ADMIN_SIGNUP_IMAGE);
  else setImage(TEACHER_SIGNUP_IMAGE);

  const passwordResetSuccess = (
    <VStack>
      <Text textStyle="subtitle2" textAlign="center">
        Your password has been successfully reset
        <br />
        Click below to log in
      </Text>
      <Button
        variant="primary"
        width="100%"
        onClick={() => history.push(TEACHER_LOGIN)}
      >
        Login
      </Button>
    </VStack>
  );

  if (!image) return <LoadingState fullPage />;
  if (step === 1)
    return (
      <AuthWrapper
        title="Set New Password"
        image={image}
        form={
          <PasswordForm
            version="ResetPassword"
            subtitle="Please ensure that your new password is different than your old one"
            email={email}
            oobCode={oobCode}
            oldPassword={password}
            setStep={setStep}
          />
        }
      />
    );
  return (
    <AuthWrapper
      title="Password Reset Successful"
      image={image}
      form={passwordResetSuccess}
    />
  );
};

export default ResetPassword;
