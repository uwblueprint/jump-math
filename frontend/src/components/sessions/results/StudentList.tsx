import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  ListItem,
  OrderedList,
  Spacer,
  VStack,
} from "@chakra-ui/react";

import type { StudentResponse } from "../../../APIClients/types/ClassClientTypes";
import SearchBar from "../../common/table/SearchBar";
import SortMenu from "../../common/table/SortMenu";

type StudentListItemProps = {
  firstName: string;
  lastName: string;
  isViewed: boolean;
  isSelected: boolean;
};

const StudentListItem = ({
  firstName,
  lastName,
  isViewed,
  isSelected,
}: StudentListItemProps) => {
  return (
    <ListItem>
      <Button
        _hover={{ bg: "grey.100" }}
        bg="grey.50"
        borderRadius={8}
        display="flex"
        p={4}
        variant="tertiary"
        w="100%"
      >
        <Box
          color={isSelected ? "blue.300" : "grey.400"}
          fontWeight={isSelected ? "700" : "400"}
        >{`${firstName} ${lastName}`}</Box>
        <Spacer />
        {isViewed && (
          <Box color="grey.200" fontWeight="400">
            Viewed
          </Box>
        )}
      </Button>
    </ListItem>
  );
};

type Student = StudentResponse & {
  isViewed: boolean;
};
type StudentListProps = {
  students: Student[];
};

const StudentList = ({ students }: StudentListProps) => {
  return (
    <Box maxH="100%" overflow="auto" w="container.sm">
      <Flex alignItems="center" justifyContent="space-between" mb={4}>
        <SearchBar onSearch={() => {}} />
        <SortMenu
          labels={[]}
          onSortOrder={() => {}}
          onSortProperty={() => {}}
          properties={[]}
        />
      </Flex>
      <OrderedList listStyleType="none" m={0}>
        <VStack alignItems="stretch" divider={<Divider m="0 !important" />}>
          {students.map(({ id, ...student }, i) => (
            <StudentListItem key={id} isSelected={i % 2 === 0} {...student} />
          ))}
        </VStack>
      </OrderedList>
    </Box>
  );
};

export default StudentList;
