import React from "react";
import { HStack, Spacer } from "@chakra-ui/react";

import type Page from "../../../types/PageTypes";
import Logout from "../../auth/Logout";
import HeaderWrapper from "../HeaderWrapper";

import NavbarItem from "./NavbarItem";

interface NavbarProps {
  pages: Page[];
}

const Navbar = ({ pages }: NavbarProps): React.ReactElement => {
  return (
    <HeaderWrapper>
      <>
        <Spacer />
        <HStack>
          {pages.map((page, index) => (
            <NavbarItem key={index} page={page} />
          ))}
          <Logout />
        </HStack>
      </>
    </HeaderWrapper>
  );
};

export default Navbar;
