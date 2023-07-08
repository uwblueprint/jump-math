import React from "react";
import { Bar } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  type TooltipItem,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
ChartJS.defaults.font.family = "DM Sans";

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
        // set thickness of x-axis border
        border: {
          width: 2,
        },
        ticks: {
          // set the x tick labels to be straight
          maxRotation: 0,
          minRotation: 0,
          // set padding between tick labels and x-axis
          padding: 10,
        },
        // remove vertical grid lines
        grid: {
          display: false,
        },
        // x-axis label
        title: {
          display: true,
          text: xAxisLabel,
          font: {
            size: 14,
            weight: "500",
          },
        },
      },
      y: {
        border: {
          display: false, // remove y-axis border
          dash: [1, 1], // set gridlines to be dotted
        },
        min: 0, // set min value to 0
        max: 100, // set max value to 100
        // remove ticks from y-axis
        grid: {
          drawTicks: false,
        },
        ticks: {
          // add % to y tick labels and exclude 0
          callback: (val: string | number) => {
            if (val !== 0) return `${val}%`;
          },
          maxTicksLimit: 6, // set interval to 20%
          padding: 10, // set padding between tick labels and x-axis
        },
        // y-axis label
        title: {
          display: true,
          text: yAxisLabel,
          font: {
            size: 14,
            weight: "500",
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"bar">) =>
            `${yAxisLabel}: ${context.parsed.y}%`,
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
        categoryPercentage: 0.5,
      },
    ],
  };
  return (
    <Box h="320px">
      <Bar data={data} options={options} />
    </Box>
  );
};

export default BarGraph;
