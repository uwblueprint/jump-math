const Radio = {
  baseStyle: {
    control: {
      borderColor: "grey.300",
      _checked: {
        backgroundColor: "blue.300",
        borderColor: "blue.300",
      },
    },
    label: {
      textStyle: "smallerParagraph",
    },
  },
  variants: {
    selected: {
      label: {
        color: "blue.300",
      },
    },
    default: {
      label: {
        color: "grey.300",
      },
    },
  },
};

export default Radio;
