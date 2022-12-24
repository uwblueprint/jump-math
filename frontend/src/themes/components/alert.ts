import { AlertProps } from "@chakra-ui/react";

const Alert = {
  baseStyle: {
    container: {
      textStyle: "mobileSubtitle1",
    },
  },
  variants: {
    "top-accent": (props: AlertProps) => {
      const { status } = props;
      if (status === "error") {
        return {
          container: {
            backgroundColor: "red.50",
            borderColor: "red.200",
            color: "red.200",
          },
          icon: {
            color: "red.200",
          },
        };
      }
      return {};
    },
    "no-background": (props: AlertProps) => {
      const { status } = props;
      if (status === "error") {
        return {
          container: {
            backgroundColor: "white",
            color: "red.200",
          },
          icon: {
            color: "red.200",
          },
        };
      }
      return {};
    },
  },
  defaultProps: {
    variant: "top-accent",
  },
};

export default Alert;
