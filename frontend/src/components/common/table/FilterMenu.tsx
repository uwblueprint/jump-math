import React from "react";
import { Button } from "@chakra-ui/react";
import { FunnelIcon } from "../../../assets/icons";

const FilterMenu = (): React.ReactElement => {
  return (
    <Button minWidth="5%" leftIcon={<FunnelIcon />} variant="tertiary">
      Filter
    </Button>
  );
};

export default FilterMenu;
