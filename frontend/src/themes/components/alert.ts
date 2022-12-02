import { AlertProps } from "@chakra-ui/react";

const Alert = {
  baseStyle: (props: AlertProps) => {
    const { status } = props;
    if (status === "error") {
      return {
        container: {
          background: "unset",
          backgroundColor: "red.50",
          color: "red.200",
          textStyle: "mobileSubtitle1",
        },
      };
    }
    return {};
  },
  defaultProps: {
    variant: "top-accent",
  },
};

export default Alert;
