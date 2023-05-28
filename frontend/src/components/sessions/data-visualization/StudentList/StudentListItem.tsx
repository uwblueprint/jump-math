import React from "react";
import { Box, Button, ListItem, Spacer } from "@chakra-ui/react";

type StudentListItemProps = {
  firstName: string;
  lastName: string;
  isViewed: boolean;
  isSelected: boolean;
  onClick: () => void;
};

const StudentListItem = ({
  firstName,
  lastName,
  isViewed,
  isSelected,
  onClick,
}: StudentListItemProps) => {
  return (
    <ListItem>
      <Button
        _hover={{ bg: "grey.100" }}
        bg="grey.50"
        borderRadius={8}
        display="flex"
        onClick={onClick}
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

export default StudentListItem;
