import React from "react";
import {
  Box,
  Container,
  Flex,
  Image,
  Spacer,
  HStack,
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
  return (
    <Container
      borderRadius="22px"
      padding="24px"
      maxWidth="xl"
      background="#fff"
    >
      <Flex>
        <Text fontSize="16px" lineHeight="21px" align="left">
          {`${date.getFullYear()} / ${String(date.getMonth() + 1).padStart(
            2,
            "0",
          )} / ${String(date.getDate()).padStart(2, "0")}`}
        </Text>
        <Spacer />
        <HStack display={["none", "block"]}>
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
        </HStack>
      </Flex>
      <Box fontWeight="500" fontSize="24px" marginBottom="12px">
        <Text lineHeight="31px" align="left">
          {questionTitle}
        </Text>
      </Box>
      <Flex justifyContent="left">
        <Image src={image} alt="IMAGE" />
      </Flex>
      <Box fontWeight="400" marginBottom="24px">
        <Text noOfLines={[1, 3]} fontSize="18px" lineHeight="23px" align="left">
          {text}
        </Text>
      </Box>
      <Box overflow="hidden">
        <HStack minWidth="sm">
          {tags.map((tag, key) => (
            <Tag
              key={key}
              color="#467826"
              bgColor="#F0F5ED"
              fontWeight="400"
              padding="4px 16px"
              whiteSpace="nowrap"
              minWidth="fitContent"
            >
              <Text fontSize="18px">{tag}</Text>
            </Tag>
          ))}
          ;
        </HStack>
      </Box>
      <Flex display={["block", "none"]}>
        <HStack marginTop="24px">
          <Text
            as="button"
            fontWeight="700"
            fontSize="16px"
            align="left"
            marginRight="24px"
          >
            Edit
          </Text>
          <Text
            as="button"
            color="#CC4949"
            fontWeight="700"
            fontSize="16px"
            align="left"
          >
            Delete
          </Text>
        </HStack>
      </Flex>
    </Container>
  );
};

export default QuestionCard;
