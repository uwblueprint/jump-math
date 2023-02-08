const WhiteIcon = {
  "& > span > svg": {
    color: "#FFFFFF",
  },
};

const LightBlueIcon = {
  "& > span > svg": {
    color: "blue.100",
  },
};

const DarkBlueIcon = {
  "& > span > svg": {
    color: "blue.300",
  },
};

const Button = {
  sizes: {
    md: {
      fontSize: "16px",
      minWidth: "180px",
      height: "48px",
      lineHeight: "21px",
      padding: "10px 24px",
      borderRadius: "16px",
      fontWeight: "700",
    },
  },
  variants: {
    primary: {
      bg: "blue.300",
      color: "#FFFFFF",
      _active: {
        bg: "blue.200",
        border: "none",
      },
      _hover: {
        bg: "blue.200",
        border: "1.5px solid #FFFFFF",
        _disabled: {
          bg: "blue.200",
          border: "none",
        },
      },
      _disabled: {
        bg: "blue.200",
        opacity: 0.4,
      },
      WhiteIcon,
    },
    secondary: {
      bg: "#154472",
      color: "blue.300",
      _active: {
        bg: "blue.100",
      },
      _hover: {
        bg: "blue.100",
        _disabled: {
          bg: "blue.100",
        },
      },
      _disabled: {
        bg: "blue.100",
        opacity: 0.4,
      },
      DarkBlueIcon,
    },
    tertiary: {
      bg: "transparent",
      color: "blue.300",
      _active: {
        color: "blue.300",
        DarkBlueIcon,
      },
      _hover: {
        color: "blue.100",
        LightBlueIcon,
        _disabled: {
          bg: "transparent",
          color: "blue.300",
          DarkBlueIcon,
        },
      },
      _disabled: {
        color: "blue.300",
      },
      DarkBlueIcon,
    },
  },
  defaultProps: {
    size: "md",
    variant: "default",
  },
};

export default Button;
