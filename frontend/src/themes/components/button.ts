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
    paginationStyle: {
      height: "2rem",
      width: "2rem",
      borderRadius: "50%",
      margin: "0 2px",
      fontWeight: "700",
      fontSize: "12px",
    },
    paginationNavigate: {
      fontWeight: "400",
      fontSize: "12px",
      lineHeight: "16px",
      textDecoration: "underline",
      _hover: {
        fontWeight: "600",
      },
      margin: "0 10px",
    },
    icon: {
      minWidth: "0",
      fontSize: "24px",
      height: "24px",
    },
    logout: {
      fontSize: "14px",
      fontWeight: "100",
      margin: "4",
    },
  },

  variants: {
    paginationNavigate: {
      bg: "transparent",
      color: "grey.300",
    },
    paginationStyle: {
      _hover: {
        bg: "blue.100",
      },
      _active: {
        bg: "blue.100",
        color: "grey.100",
      },
      color: "grey.300",
      bg: "blue.50",
    },
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
      bg: "blue.50",
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
    outline: {
      color: "blue.300",
      borderColor: "blue.300",
      borderWidth: "2px",
      fontSize: "16px",
      fontWeight: "700",
      lineHeight: "21px",
      letterSpacing: "0",
    },
    delete: {
      bg: "red.200",
      color: "#FFFFFF",
      _active: {
        bg: "red.100",
        border: "none",
      },
      _hover: {
        bg: "red.100",
        border: "1.5px solid #FFFFFF",
        _disabled: {
          bg: "red.100",
          border: "none",
        },
      },
      WhiteIcon,
    },
    deleteCancel: {
      bg: "red.50",
      color: "red.200",
      _active: {
        bg: "red.100",
        border: "none",
      },
      _hover: {
        bg: "red.100",
        border: "1.5px solid #FFFFFF",
        _disabled: {
          bg: "red.100",
          border: "none",
        },
      },
      WhiteIcon,
    },
    icon: {
      color: "blue.300",
      _hover: {
        color: "grey.300",
      },
    },
    logout: {
      _hover: {
        color: "blue.300",
        fontWeight: "bold",
      },
    },
  },

  defaultProps: {
    size: "md",
    variant: "default",
  },
};

export default Button;
