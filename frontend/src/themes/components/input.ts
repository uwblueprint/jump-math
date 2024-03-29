const Input = {
  variants: {
    filled: {
      field: {
        background: "grey.100",
        borderRadius: "6px",
        color: "grey.300",
        fontSize: "18px",
        _invalid: {
          borderColor: "red.200",
        },
        _placeholder: {
          color: "placeholder.300",
        },
      },
    },
  },
  defaultProps: {
    variant: "filled",
    size: "lg",
  },
};

export default Input;
