import React from "react";
import { HStack, Spacer } from "@chakra-ui/react";

import Page from "../../../types/PageTypes";
import Logout from "../../auth/Logout";
import Header from "../Header";

import NavbarItem from "./NavbarItem";

interface NavbarProps {
  pages: Page[];
}

const Navbar = ({ pages }: NavbarProps): React.ReactElement => {
  return (
    <Header>
      <>
        <Spacer />
        <HStack>
          {pages.map((page, index) => (
            <NavbarItem key={index} page={page} />
          ))}
          <Logout />
        </HStack>
      </>
    </Header>
  );
};

export default Navbar;
