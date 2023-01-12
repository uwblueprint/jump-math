const Table = {
  variants: {
    unstyled: {
      th: {
        fontSize: "14px",
        fontWeight: "700",
        lineHeight: "18px",
        letterSpacing: 0,
        color: "blue.300",
        textTransform: "none",
      },
      tr: {
        _hover: { backgroundColor: "blue.300", color: "grey.50" },
      },
      td: {
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "18px",
        letterSpacing: 0,
        style: { display: "block" },
      },
    },
  },

  defaultProps: {
    variant: "unstyled",
    size: "md",
  },
};

export default Table;
