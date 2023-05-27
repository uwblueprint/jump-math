import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

import { ChevronRightIcon } from "../../../assets/icons";

interface FormHeaderProps {
  isCurrentPage: boolean;
}

const FormHeader = ({ isCurrentPage }: FormHeaderProps): React.ReactElement => {
  return (
    <Breadcrumb color="grey.300" separator={<ChevronRightIcon />} spacing="8px">
      <BreadcrumbItem color={isCurrentPage ? "blue.300" : ""} isCurrentPage>
        {/* TODO: add page link*/}
        <BreadcrumbLink href="#">Choose an assessment</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        {/* TODO: add page link*/}
        <BreadcrumbLink href="#">Choose a classroom</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        {/* TODO: add page link*/}
        <BreadcrumbLink href="#">Add information</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        {/* TODO: add page link*/}
        <BreadcrumbLink href="#">Review</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default FormHeader;
