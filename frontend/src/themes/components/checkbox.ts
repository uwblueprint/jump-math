const Checkbox = {
  baseStyle: {
    control: {
      borderColor: "grey.300",
      _checked: {
        backgroundColor: "blue.300",
        borderColor: "blue.300",
      },
    },
    label: {
      color: "grey.300",
      textStyle: "paragraph",
      pointerEvents: "none",
    },
  },
  variants: {
    bold: {
      label: {
        color: "grey.400",
      },
    },
    green: {
      control: {
        margin: "0 4px 8px 0",
        _checked: {
          backgroundColor: "green.300",
          borderColor: "green.300",
        },
      },
    },
  },
};

export default Checkbox;
