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
      pointerEvents: "none",
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
    table: {
      control: {
        borderColor: "grey.300",
        _checked: {
          backgroundColor: "grey.300",
          borderColor: "grey.300",
        },
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
    fullWidthLabel: {
      label: {
        width: "100%",
      },
    },
  },
};

export default Radio;
