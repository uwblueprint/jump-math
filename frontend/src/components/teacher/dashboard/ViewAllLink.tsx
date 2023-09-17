import React from "react";

import RouterLink from "../../common/navigation/RouterLink";

type ViewAllLinkProps = React.ComponentProps<typeof RouterLink>;

const ViewAllLink = ({
  ...propOverrides
}: ViewAllLinkProps): React.ReactElement => {
  return (
    <RouterLink
      _hover={{ backgroundColor: "blue.50" }}
      alignItems="center"
      backgroundColor="grey.100"
      color="blue.300"
      display="flex"
      fontSize="14px"
      fontWeight="bold"
      justifyContent="center"
      textDecor="none"
      w="100%"
      {...propOverrides}
    >
      View all
    </RouterLink>
  );
};

export default ViewAllLink;
