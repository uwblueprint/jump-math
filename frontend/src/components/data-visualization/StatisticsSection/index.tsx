import React from "react";
import { Flex, Grid, Text } from "@chakra-ui/react";

import StatisticCard, { type StatisticCardVariant } from "../StatisticCard";

export type StatisticsConfig = {
  [key: string]: {
    title: string;
    formatValue: (value: number) => string;
    variant?: StatisticCardVariant;
    fallbackValue?: string;
  };
};

type Statistics<T> = {
  [key in keyof T]?: number;
};

const getKeys = <T,>(obj: StatisticsConfig) =>
  Object.keys(obj) as (keyof T & string)[];

const StatisticsSection = <T,>({
  config,
  values,
}: {
  config: StatisticsConfig;
  values: Statistics<T>;
}) => (
  <Flex direction="column" gap={2}>
    <Text as="h2" color="grey.300" textStyle="eyebrow">
      STATISTICS
    </Text>
    <Grid gap={4} py={4} templateColumns="repeat(2, 1fr)">
      {getKeys(config).map((key) => {
        const { title, formatValue, variant, fallbackValue } = config[key];
        let value = fallbackValue ?? "N/A";
        if (values.hasOwnProperty(key) && values[key] != null) {
          value = formatValue(values[key]);
        }
        return (
          <StatisticCard
            key={key}
            title={title}
            value={value}
            variant={variant}
          />
        );
      })}
    </Grid>
  </Flex>
);

export default StatisticsSection;
