import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";

export type StatisticCardVariant = "blue" | "default";

type StatisticCardProps = {
  title: string;
  value: string;
  variant?: StatisticCardVariant;
};

const VARIANT_STYLES = {
  blue: {
    bg: "blue.50",
    borderColor: "blue.50",
    color: "blue.300",
  },
  default: {
    bg: "white",
    borderColor: "grey.200",
    color: "black",
  },
};

const StatisticCard = ({
  title,
  value,
  variant = "default",
}: StatisticCardProps) => (
  <Card
    borderRadius={8}
    borderWidth={1}
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
