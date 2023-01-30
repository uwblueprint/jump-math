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
  Button,
  List,
  ListItem,
} from "@chakra-ui/react";
import { QuestionType, QuestionTag } from "./QuestionTag";
import {
  EditOutlineIcon,
  DeleteOutlineIcon,
  HamburgerMenuIcon,
} from "../../assets/icons";

type QuestionCardProps = {
  date: Date;
  title: string;
  tags: { type: QuestionType; frequency: number }[];
  questionNum: number;
  points: number;
  questions: string[];
};

const QuestionCard = ({
  date,
  title,
  tags,
  questionNum,
  points,
  questions,
}: QuestionCardProps): React.ReactElement => {
  const formatDate = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")} / ${String(
      d.getMonth() + 1,
    ).padStart(2, "0")} / ${String(d.getFullYear()).substring(2, 4)}`;

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
              as={IconButton}
              fontSize="24px"
              aria-label="Options"
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
            <Box color="blue.300" fontSize="24px" mr="4">
              <EditOutlineIcon />
            </Box>
            <Box color="blue.300" fontSize="24px">
              <DeleteOutlineIcon />
            </Box>
          </Flex>
          <List
            spacing={3}
            styleType="lower-alpha"
            stylePosition="inside"
            maxWidth={["250px", "800px"]}
          >
            {questions.map((question, key) => (
              <ListItem
                key={key}
                fontWeight="800"
                color="grey.400"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                <Text as="span" fontWeight="bolder">
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
              <QuestionTag
                key={key}
                type={tag.type}
                frequency={tag.frequency}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default QuestionCard;
