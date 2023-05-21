import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";

type StatisticCardProps = {
  title: string;
  value: string;
  variant?: "blue" | "default";
};

const VARIANT_STYLES = {
  blue: {
    bg: "blue.50",
    borderWidth: 0,
    color: "blue.300",
  },
  default: {
    bg: "white",
    borderWidth: 1,
    color: "black",
  },
};

const StatisticCard = ({
  title,
  value,
  variant = "default",
}: StatisticCardProps) => (
  <Card
    borderColor="grey.200"
    borderRadius={8}
    boxShadow="none"
    display="inline-flex"
    flexDirection="column"
    gap={2}
    p={6}
    w={44}
    {...VARIANT_STYLES[variant]}
  >
    <CardHeader aria-hidden="true" p={0}>
      <Text as="h2" textStyle="subtitle1">
        {value}
      </Text>
    </CardHeader>
    <CardBody aria-hidden="true" p={0}>
      <Text as="h3" textStyle="mobileSubtitle1">
        {title}
      </Text>
    </CardBody>
    <VisuallyHidden>{`${value} ${title}`}</VisuallyHidden>
  </Card>
);

export default StatisticCard;
