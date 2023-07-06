const Tabs = {
  variants: {
    line: {
      tablist: {
        borderColor: "grey.100",
      },
      tab: {
        color: "grey.300",
        _selected: {
          color: "blue.300",
        },
        _active: {
          bg: "grey.100",
        },
      },
    },
    "soft-rounded": {
      tablist: {
        paddingLeft: "4em",
      },
      tab: {
        fontSize: "14px",
        fontWeight: "400",
        _selected: {
          backgroundColor: "blue.50",
          fontWeight: "700",
          color: "blue.300",
          borderRadius: "8px",
        },
      },
    },
  },
};

export default Tabs;
