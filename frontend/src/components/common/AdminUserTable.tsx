import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";

type AdminUser = {
  firstName: string;
  lastName: string;
  email: string;
};

interface AdminUserTableProps {
  adminUserArray: AdminUser[];
}

const AdminUserTable = ({
  adminUserArray,
}: AdminUserTableProps): React.ReactElement => {
  return (
    <TableContainer
      padding="10px"
      border="1px solid"
      borderColor="grey.200"
      borderRadius="12px"
    >
      <Table sx={{ tableLayout: "fixed" }} variant="unstyled" size="md">
        <Thead>
          <Tr>
            <Th>
              <Text textStyle="link" fontWeight="700" textTransform="none">
                Name
              </Text>
            </Th>
            <Th>
              <Text textStyle="link" fontWeight="700" textTransform="none">
                Email
              </Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {adminUserArray.map((user, index) => (
            <Tr
              _hover={{ backgroundColor: "#154472", color: "white" }}
              key={user.firstName}
              backgroundColor={index % 2 === 0 ? "#E8EDF1" : "white"}
            >
              <Td>
                <Text
                  noOfLines={1}
                >{`${user.firstName} ${user.lastName}`}</Text>
              </Td>
              <Td>
                <Text noOfLines={1}>{user.email}</Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default AdminUserTable;
