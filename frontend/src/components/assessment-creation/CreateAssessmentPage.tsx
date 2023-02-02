import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  RadioGroup,
  Stack,
  Radio,
  Box,
} from "@chakra-ui/react";
// import SelectFormInput from "../auth/TeacherSignup/SelectFormInput";

const CreateAssessmentPage = (): React.ReactElement => {
  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel> Assessment Name </FormLabel>
        <Input placeholder="e.g. Ontario Grade 5 Pre-Term Assessment" />
      </FormControl>

      <FormControl isRequired>
        <FormLabel> Grade Level </FormLabel>
        <Select variant="filled" />
      </FormControl>

      <FormControl isRequired>
        <FormLabel> Type of Assessment </FormLabel>
        <RadioGroup>
          <Box borderRadius="md" border="2px" borderColor="gray.200">
            <Radio value="1">Beginning of Grade</Radio>
          </Box>
          <Box borderRadius="md" border="2px" borderColor="gray.200">
            <Radio value="2">End of Grade</Radio>
          </Box>
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel> Curriculum </FormLabel>
        <Stack direction="row" width="100%" alignItems="flex-end">
          <FormControl isRequired>
            <FormLabel> Country </FormLabel>
            <Select variant="filled" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel> Region </FormLabel>
            <Select variant="filled" />
          </FormControl>
        </Stack>
      </FormControl>
    </VStack>
  );
};

export default CreateAssessmentPage;
