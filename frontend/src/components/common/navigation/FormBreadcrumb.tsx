import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "../../../assets/icons";

export type BreadcrumbType = {
  header: string;
  page: number;
};

interface FormBreadcrumbProps {
  breadcrumbs: BreadcrumbType[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  validPage: (p: number) => boolean;
}

const FormBreadcrumb = ({
  breadcrumbs,
  page,
  setPage,
  validPage,
}: FormBreadcrumbProps): React.ReactElement => {
  return (
    <Breadcrumb color="grey.300" separator={<ChevronRightIcon />} spacing="2">
      {breadcrumbs.map((breadcrumb) => {
        const isCurrentPage = page === breadcrumb.page;
        return (
          <BreadcrumbItem
            key={breadcrumb.header}
            color={isCurrentPage ? "blue.300" : ""}
            isCurrentPage={isCurrentPage}
          >
            {validPage(breadcrumb.page) ? (
              <BreadcrumbLink onClick={() => setPage(breadcrumb.page)}>
                {breadcrumb.header}
              </BreadcrumbLink>
            ) : (
              <Text>{breadcrumb.header}</Text>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default FormBreadcrumb;
