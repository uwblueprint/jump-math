const Radio = {
  variants: {
    primary: {
      control: {
        borderColor: "grey.300",
        _checked: {
          backgroundColor: "blue.300",
          borderColor: "blue.300",
        },
      },
    },
  },
  defaultProps: {
    variant: "primary",
  },
};

export default Radio;
