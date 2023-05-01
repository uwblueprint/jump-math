import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { HStack, PinInput, PinInputField, Text } from "@chakra-ui/react";

import { GET_TEST_SESSION_BY_ACCESS_CODE } from "../../../APIClients/queries/TestSessionQueries";
import { STUDENT_SIGNUP_IMAGE } from "../../../assets/images";
import AuthWrapper from "../../auth/AuthWrapper";
import NameSelection from "../../auth/student-login/NameSelection";
import BackButton from "../../common/BackButton";

const StudentLoginPage = (): React.ReactElement => {
  const [showNameSelection, setShowNameSelection] = useState(false);
  const delayedRedirect = () => {
    setTimeout(() => setShowNameSelection(true), 1000);
  };
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [testId, setTestId] = useState("");
  const [testSessionId, setTestSessionId] = useState("");
  const [testSessionNotes, setTestSessionNotes] = useState("");

  const [checkPin] = useLazyQuery(GET_TEST_SESSION_BY_ACCESS_CODE, {
    onCompleted: (data) => {
      setSuccess(true);
      setError("");

      const result = data.testSessionByAccessCode;
      setTestId(result.test.id);
      setTestSessionId(result.id);
      if (result.notes) {
        setTestSessionNotes(result.notes);
      }

      delayedRedirect();
    },
    onError: async () => {
      setError("Please ensure input is correct");
      setSuccess(false);
    },
  });

  const getPinBorderColor = () => {
    if (error) return "red.200 !important";
    if (success) return "green.200 !important";
    return "grey.100";
  };

  const handleComplete = (code: string) => {
    checkPin({
      variables: {
        accessCode: code,
      },
    });
  };

  const title = "Student Login";
  const subtitle = "Please enter your classroom's access code";
  const image = STUDENT_SIGNUP_IMAGE;
  const form = (
    <>
      {success && (
        <Text color="green.300" textStyle="smallerParagraph">
          Entered successfully
        </Text>
      )}
      <HStack>
        <PinInput
          autoFocus
          focusBorderColor="grey.200"
          onComplete={handleComplete}
          placeholder=""
          size="lg"
          variant="filled"
        >
          {[...Array(6)].map((i) => (
            <PinInputField
              key={i}
              _focus={{ backgroundColor: "grey.100" }}
              _hover={{ backgroundColor: "grey.100" }}
              backgroundColor="grey.100"
              borderColor={getPinBorderColor()}
              color="grey.300"
              fontSize="2.5rem"
              height="50%"
              m="3rem 0.6rem 7rem 0.6rem !important"
              style={{ width: "15%" }}
              textStyle="header1"
            />
          ))}
        </PinInput>
      </HStack>
      <BackButton size="md" text="Back to Home" />
    </>
  );

  return (
    <>
      {showNameSelection ? (
        <NameSelection
          testId={testId}
          testSessionId={testSessionId}
          testSessionNotes={testSessionNotes}
        />
      ) : (
        <AuthWrapper
          error={error}
          form={form}
          image={image}
          subtitle={subtitle}
          title={title}
        />
      )}
    </>
  );
};

export default StudentLoginPage;
