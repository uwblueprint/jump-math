const Button = {
    sizes: {
        md: {
            fontSize: "18px",
            width: "180px",
            height: "48px",
            lineHeight: "23px",
            padding: "10px 24px",
            borderRadius: "16px",
            fontWeight: "700",
        },
    },
    variants: {
        primary: {
            bg: "blue.300",
            color: "#FFFFFF",
            _active:{
                bg: "blue.200",
            },
            _hover: {
                bg: "blue.200",
                border: "1.5px solid #FFFFFF",
            },
            _disabled: {
                bg: "blue.200",
                opacity: 0.4,
            },
        },
        secondary: {
            bg: "blue.50",
            color: "blue.300",
            border: "1.5px solid",
            borderColor: "blue.300",
            _active:{
                bg: "blue.100",
            },
            _hover: {
                bg: "blue.100",
                border: "1.5px solid #FFFFFF",
            },
            _disabled: {
                bg: "blue.100",
                border: "1.5px solid",
                borderColor: "blue.300",
                opacity: 0.4,
            },
        },
        tertiary: {
            bg: "transparent",
            color: "blue.300",
            _hover: {
                color: "blue.100",
            },
            _disabled: {
                color: "blue.300",
            },
        }
    },
    defaultProps: {
        size: "md",
        variant: "default",
    },
  };
  
  export default Button;