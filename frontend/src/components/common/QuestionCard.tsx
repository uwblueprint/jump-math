import React from "react";
import {
  Box,
  Container,
  Flex,
  Image,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";

type QuestionCardProps = {
  date: Date;
  questionTitle: string;
  image: string;
  text: string;
  tags: string[];
};

const QuestionCard = ({
  date,
  questionTitle,
  image,
  text,
  tags,
}: QuestionCardProps): React.ReactElement => {
  const buttons: React.ReactElement = (
    <>
      <Text
        as="button"
        fontWeight="700"
        fontSize="16px"
        align="right"
        marginRight="24px"
      >
        Edit
      </Text>
      <Text
        as="button"
        color="#CC4949"
        fontWeight="700"
        fontSize="16px"
        align="right"
      >
        Delete
      </Text>
    </>
  );
  return (
    <Container
      borderRadius="22px"
      padding="24px"
      maxWidth="2xl"
      background="#fff"
    >
      <Stack direction={["column", "row"]}>
        <Box>
          <Text textStyle="eyebrow" align="left">
            {`${String(date.getDate()).padStart(2, "0")} / ${String(
              date.getMonth() + 1,
            ).padStart(2, "0")} / ${String(date.getFullYear()).substring(
              2,
              4,
            )}`}
          </Text>
          <Text marginBottom="12px" textStyle="subtitle1" align="left">
            {questionTitle}
          </Text>
          <Flex justifyContent="left">
            <Image src={image} alt="IMAGE" />
          </Flex>
          <Text
            marginBottom="24px"
            noOfLines={[1, 3]}
            textStyle="paragraph"
            align="left"
          >
            {text}
          </Text>
          <Stack overflow="hidden" minWidth="sm" direction="row">
            {tags.map((tag, key) => (
              <Tag
                key={key}
                color="green.400"
                bgColor="green.50"
                padding="4px 16px"
                whiteSpace="nowrap"
                minWidth="fitContent"
              >
                <Text textStyle="paragraph">{tag}</Text>
              </Tag>
            ))}
          </Stack>
        </Box>
        <Stack direction="row" alignItems="start">
          {buttons}
        </Stack>
      </Stack>
    </Container>
  );
};

export default QuestionCard;
