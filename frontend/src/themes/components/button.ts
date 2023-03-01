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

    startTest: {
      borderRadius: "10px",
      width: "225px",
      height: "40px",
      marginTop: "550px",
      marginLeft: "1075px",
      fontWeight: "bold",
    },

    backHome: {
      borderRadius: "10px",
      width: "225px",
      height: "40px",
      marginTop: "550px",
      marginLeft: "-475px",
      fontWeight: "bold",
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
  },

  defaultProps: {
    size: "md",
    variant: "default",
  },
};

export default Button;
