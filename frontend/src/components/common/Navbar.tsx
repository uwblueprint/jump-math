import React from "react";
import { HStack, Spacer } from "@chakra-ui/react";

import Page from "../../types/PageTypes";
import Logout from "../auth/Logout";

import HeaderWrapper from "./HeaderWrapper";
import NavbarItem from "./NavbarItem";

interface NavbarProps {
  pages: Page[];
}

const Navbar = ({ pages }: NavbarProps): React.ReactElement => {
  const content: React.ReactElement = (
    <>
      <Spacer />
      <HStack>
        {pages.map((page, index) => (
          <NavbarItem key={index} page={page} />
        ))}
        <Logout />
      </HStack>
    </>
  );
  return <HeaderWrapper content={content} />;
};

export default Navbar;
