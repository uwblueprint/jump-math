import React from "react";
import { useDisclosure } from "@chakra-ui/react";

import HeaderWithButton from "../common/HeaderWithButton";

import AddAdminModal from "./admin/AddAdminModal";

const UsersPageHeader = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <HeaderWithButton
        buttonText="Add Admin"
        onClick={onOpen}
        title="Database"
      />
      <AddAdminModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default UsersPageHeader;
