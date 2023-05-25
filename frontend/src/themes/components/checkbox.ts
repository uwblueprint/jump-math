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
  },
};

export default Checkbox;
