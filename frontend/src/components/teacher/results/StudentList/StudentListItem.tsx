import React from "react";
import { Box, Button, ListItem, Spacer, useToken } from "@chakra-ui/react";

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
  const focusShadow = useToken("shadows", "outline");

  return (
    <ListItem>
      <Button
        _focusVisible={{
          boxShadow: "none",
          "&::before": {
            content: '""',
            boxShadow: focusShadow,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            borderRadius: 8,
          },
        }}
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
        >{`${lastName}, ${firstName}`}</Box>
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
