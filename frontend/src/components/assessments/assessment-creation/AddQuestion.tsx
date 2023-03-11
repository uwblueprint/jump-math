import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Text } from "@chakra-ui/react";

import { PlusOutlineIcon } from "../../../assets/icons";
import { CREATE_QUESTION } from "../../../constants/Routes";

const AddQuestion = (): React.ReactElement => {
  const history = useHistory();
  return (
    <Button
      border="1px dashed #636363"
      borderRadius="16px"
      color="grey.300"
      leftIcon={<PlusOutlineIcon />}
      onClick={() => history.push(CREATE_QUESTION)}
      paddingBottom="8"
      paddingTop="8"
      width="100%"
    >
      <Text textStyle="paragraph">Add Question</Text>
    </Button>
  );
};

export default AddQuestion;
