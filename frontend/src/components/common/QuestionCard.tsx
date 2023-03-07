import * as React from "react";
import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  Menu,
  MenuButton,
  IconButton,
  List,
  ListItem,
} from "@chakra-ui/react";
import QuestionTag from "./QuestionTag";
import { QuestionType } from "../../types/QuestionTypes";
import {
  EditOutlineIcon,
  DeleteOutlineIcon,
  HamburgerMenuIcon,
} from "../../assets/icons";

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
      borderRadius="22px"
      padding="28px 32px 28px 28px"
      maxWidth={["318px", "918px"]}
      background="white"
      color="grey.300"
      border="1px"
      borderColor="grey.200"
    >
      <Stack direction={["column", "row"]}>
        <Box w={["10%", "40px"]}>
          <Menu>
            <MenuButton
              justifyContent="left"
              alignItems="top"
              mt={1}
              as={IconButton}
              fontSize="24px"
              aria-label="Options"
              cursor="pointer"
              p={0}
              icon={<HamburgerMenuIcon />}
            />
          </Menu>
        </Box>
        <Box marginBottom={["24px", "0px"]} flex="1">
          <Flex direction="row">
            <Text
              flexGrow="1"
              marginBottom="20px"
              textStyle="subtitle1"
              align="left"
              color="grey.400"
            >
              Question {questionNum}
            </Text>
            <Box color="blue.300" fontSize="24px" mr="4" cursor="pointer">
              <EditOutlineIcon />
            </Box>
            <Box color="blue.300" fontSize="24px" cursor="pointer">
              <DeleteOutlineIcon />
            </Box>
          </Flex>
          <List
            spacing={3}
            styleType={questions.length > 1 ? "lower-alpha" : "none"}
            stylePosition="inside"
            maxWidth={["250px", "800px"]}
            fontWeight="700"
          >
            {questions.map((question, key) => (
              <ListItem
                key={key}
                color="grey.400"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                <Text as="span" fontWeight="400">
                  {question}
                </Text>
              </ListItem>
            ))}
          </List>
          <Text textStyle="caption" color="grey.300" my={5}>
            Total: {points} points
          </Text>
          <Stack overflow="hidden" direction="row">
            {tags.map((tag, key) => (
              <QuestionTag key={key} type={tag.type} count={tag.count} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default QuestionCard;
