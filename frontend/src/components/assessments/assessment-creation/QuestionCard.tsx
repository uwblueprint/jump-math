import * as React from "react";
import {
  Box,
  Container,
  Flex,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuButton,
  Stack,
  Text,
} from "@chakra-ui/react";
<<<<<<< HEAD:frontend/src/components/assessments/assessment-creation/QuestionCard.tsx
import QuestionTag from "./QuestionTag";
import { QuestionType } from "../../../types/QuestionTypes";
=======

>>>>>>> c800334 (add import sorting):frontend/src/components/common/QuestionCard.tsx
import {
  DeleteOutlineIcon,
  EditOutlineIcon,
  HamburgerMenuIcon,
<<<<<<< HEAD:frontend/src/components/assessments/assessment-creation/QuestionCard.tsx
} from "../../../assets/icons";
=======
} from "../../assets/icons";
import { QuestionType } from "../../types/QuestionTypes";

import QuestionTag from "./QuestionTag";
>>>>>>> c800334 (add import sorting):frontend/src/components/common/QuestionCard.tsx

type QuestionCardProps = {
  tags: { type: QuestionType; count: number }[];
  questionNum: number;
  points: number;
  questions: string[];
};

const QuestionCard = ({
  tags,
  questionNum,
  points,
  questions,
}: QuestionCardProps): React.ReactElement => {
  return (
    <Container
      background="white"
      border="1px"
      borderColor="grey.200"
      borderRadius="22px"
      color="grey.300"
      maxWidth={["318px", "918px"]}
      padding="28px 32px 28px 28px"
    >
      <Stack direction={["column", "row"]}>
        <Box w={["10%", "40px"]}>
          <Menu>
            <MenuButton
              alignItems="top"
              aria-label="Options"
              as={IconButton}
              cursor="pointer"
              fontSize="24px"
              icon={<HamburgerMenuIcon />}
              justifyContent="left"
              mt={1}
              p={0}
            />
          </Menu>
        </Box>
        <Box flex="1" marginBottom={["24px", "0px"]}>
          <Flex direction="row">
            <Text
              align="left"
              color="grey.400"
              flexGrow="1"
              marginBottom="20px"
              textStyle="subtitle1"
            >
              Question {questionNum}
            </Text>
            <Box color="blue.300" cursor="pointer" fontSize="24px" mr="4">
              <EditOutlineIcon />
            </Box>
            <Box color="blue.300" cursor="pointer" fontSize="24px">
              <DeleteOutlineIcon />
            </Box>
          </Flex>
          <List
            fontWeight="700"
            maxWidth={["250px", "800px"]}
            spacing={3}
            stylePosition="inside"
            styleType={questions.length > 1 ? "lower-alpha" : "none"}
          >
            {questions.map((question, key) => (
              <ListItem
                key={key}
                color="grey.400"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                <Text as="span" fontWeight="400">
                  {question}
                </Text>
              </ListItem>
            ))}
          </List>
          <Text color="grey.300" my={5} textStyle="caption">
            Total: {points} points
          </Text>
          <Stack direction="row" overflow="hidden">
            {tags.map((tag, key) => (
              <QuestionTag key={key} count={tag.count} type={tag.type} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default QuestionCard;
