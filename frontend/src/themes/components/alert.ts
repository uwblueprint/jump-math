import { AlertProps, ComponentStyleConfig } from "@chakra-ui/react";
import { PartsStyleObject } from "@chakra-ui/theme-tools";

const Alert: Partial<ComponentStyleConfig> = {
  baseStyle: {
    container: {
      textStyle: "mobileSubtitle1",
    },
  },
  variants: {
    "top-accent": (props: AlertProps): PartsStyleObject => {
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
    "no-background": (props: AlertProps): PartsStyleObject => {
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
    successToast: {
      container: {
        margin: "4",
        backgroundColor: "blue.50",
        color: "blue.300",
      },
    },
    errorToast: {
      container: {
        fontWeight: "400",
        margin: "4",
        backgroundColor: "red.50",
        color: "red.200",
      },
    },
  },
  defaultProps: {
    variant: "top-accent",
  },
};

export default Alert;
