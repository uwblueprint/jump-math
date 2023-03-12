import React from "react";
import { Button } from "@chakra-ui/react";
import { FunnelIcon } from "../../../assets/icons";

const FilterMenu = (): React.ReactElement => {
  return (
    <Button leftIcon={<FunnelIcon />} minWidth="5%" variant="tertiary">
      Filter
    </Button>
  );
};

export default FilterMenu;
