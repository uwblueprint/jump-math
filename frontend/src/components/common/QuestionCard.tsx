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
  title: string;
  image: string;
  text: string;
  tags: string[];
};

const QuestionCard = ({
  date,
  title,
  image,
  text,
  tags,
}: QuestionCardProps): React.ReactElement => {
  const formatDate = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")} / ${String(
      d.getMonth() + 1,
    ).padStart(2, "0")} / ${String(d.getFullYear()).substring(2, 4)}`;

  return (
    <Container
      borderRadius="22px"
      padding="24px"
      maxWidth="2xl"
      background="white"
      color="grey.300"
    >
      <Stack direction={["column", "row"]}>
        <Box marginBottom={["24px", "0px"]}>
          <Text textStyle="eyebrow" align="left">
            {formatDate(date)}
          </Text>
          <Text marginBottom="12px" textStyle="subtitle1" align="left">
            {title}
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
                borderRadius="40px"
              >
                <Text textStyle="paragraph">{tag}</Text>
              </Tag>
            ))}
          </Stack>
        </Box>
        <Stack direction="row" alignItems="start">
          <Text
            as="button"
            color="black"
            align="right"
            marginRight="24px"
            textStyle="link"
          >
            Edit
          </Text>
          <Text
            as="button"
            color="red.200"
            fontWeight="700"
            fontSize="16px"
            align="right"
            textStyle="link"
          >
            Delete
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
};

export default QuestionCard;
