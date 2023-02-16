const paginationStyle = {
  baseStyle: {
    height: "2.25rem",
    width: "2.25rem",
    borderRadius: "50%",
    textAlign: "center",
    lineHeight: "2rem",
    display: "inline-block",
    margin: "0 2px",
    position: "relative",
    "&::before": {
      content: `"..."`,
      fontSize: "1.5rem",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  defaultProps: {
    isDisabled: true,
    bg: "#E8EDF1",
    color: "#636363",
  },
};

export default paginationStyle;
