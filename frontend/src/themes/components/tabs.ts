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
  },
};

export default Tabs;
