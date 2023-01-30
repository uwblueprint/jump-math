import React from "react";
import {
  Text,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  HStack,
} from "@chakra-ui/react";

import { User } from "../../types/UserTypes";

import { SearchOutlineIcon } from "../../assets/icons";
import SortTablePopover from "../common/SortTablePopover";

type UserProperty = "firstName" | "email" | "school";
type SortOrder = "Ascending" | "Descending";
type Role = "teacher" | "admin";

type OrderingStates = {
  sortProperty: UserProperty;
  sortOrder: SortOrder;
  setSortProperty: React.Dispatch<React.SetStateAction<UserProperty>>;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
};

type SearchingStates = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

interface AdminTabProps {
  OrderingSets: OrderingStates;
  SearchingSets: SearchingStates;
  UserTable: React.ReactElement<UserTableProps>;
  searchLength: number;
  role: Role;
}

export interface UserTableProps {
  users: User[];
}

const AdminTab = ({
  OrderingSets,
  SearchingSets,
  UserTable,
  searchLength,
  role,
}: AdminTabProps): React.ReactElement => {
  const { search, setSearch } = SearchingSets;

  return (
    <>
      <VStack pt={4} spacing={6}>
        <HStack width="100%">
          <InputGroup width="95%">
            <Input
              borderRadius="6px"
              borderColor="grey.100"
              backgroundColor="grey.100"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search bar"
            />
            <InputRightElement pointerEvents="none" h="full">
              <SearchOutlineIcon />
            </InputRightElement>
          </InputGroup>
          <SortTablePopover OrderingSets={OrderingSets} role={role} />
        </HStack>
        {search && (
          <Text fontSize="16px" color="grey.300" width="100%">
            Showing {searchLength} results for &quot;{search}&quot;
          </Text>
        )}
        {UserTable}
      </VStack>
    </>
  );
};
export default AdminTab;
