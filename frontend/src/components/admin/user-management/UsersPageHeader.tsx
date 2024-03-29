import React from "react";
import { useDisclosure } from "@chakra-ui/react";

import HeaderWithButton from "../../common/HeaderWithButton";

import AddAdminModal from "./admin/AddAdminModal";

const UsersPageHeader = (): React.ReactElement => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <HeaderWithButton buttonText="Add Admin" onClick={onOpen} title="Users" />
      <AddAdminModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default UsersPageHeader;
