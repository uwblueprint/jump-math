import React from "react";
import { Bar } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface BarGraphProps {
  dataset: number[];
  label: string;
  xAxisLabel: string;
  xAxisTickLabels: string[];
  yAxisLabel: string;
}

const BarGraph = ({
  dataset,
  label,
  xAxisLabel,
  xAxisTickLabels,
  yAxisLabel,
}: BarGraphProps): React.ReactElement => {
  const options = {
    scales: {
      x: {
        // set the x tick labels to be straight
        ticks: {
          maxRotation: 0,
          minRotation: 0,
        },
        // remove vertical grid lines
        grid: {
          display: false,
          lineWidth: 4,
        },
        // x-axis label
        title: {
          display: true,
          text: xAxisLabel,
          font: {
            weight: "500",
          },
        },
      },
      y: {
        border: { dash: [1, 1] }, // set grid lines to be dotted
        min: 0, // set min value to 0
        max: 100, // set max value to 100
        // add % to y tick labels
        ticks: {
          callback: (val: string | number) => `${val}%`,
        },
        // y-axis label
        title: {
          display: true,
          text: yAxisLabel,
          font: {
            weight: "500",
          },
        },
      },
    },
  };

  const data = {
    labels: xAxisTickLabels,
    datasets: [
      {
        label,
        data: dataset,
        backgroundColor: "#154472",
        borderRadius: 4,
        barPercentage: 0.5,
      },
    ],
  };
  return (
    <Box p="1em" w="600px">
      <Bar data={data} options={options} />
    </Box>
  );
};

export default BarGraph;
