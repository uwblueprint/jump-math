import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "../../../assets/icons";

export type BreadcrumbType = {
  // Pass undefined to mark as loading
  header?: string;
  page: number;
};

interface FormBreadcrumbProps {
  breadcrumbs: BreadcrumbType[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  validPage?: (p: number) => boolean;
}

const FormBreadcrumb = ({
  breadcrumbs,
  page,
  setPage,
  validPage,
}: FormBreadcrumbProps): React.ReactElement => {
  return (
    <Breadcrumb color="grey.300" separator={<ChevronRightIcon />} spacing="8px">
      {breadcrumbs.map((breadcrumb, i) => {
        const isCurrentPage = page === breadcrumb.page;
        return (
          <BreadcrumbItem
            key={breadcrumb.header ?? `breadcrumb-${i}`}
            color={isCurrentPage ? "blue.300" : ""}
            isCurrentPage={isCurrentPage}
          >
            {!validPage || validPage(breadcrumb.page) ? (
              <BreadcrumbLink onClick={() => setPage(breadcrumb.page)}>
                {breadcrumb.header ?? "Loading..."}
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
