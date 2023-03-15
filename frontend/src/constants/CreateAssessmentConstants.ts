import { Grade } from "../APIClients/types/UserClientTypes";

const gradeOptions = Object.keys(Grade).map((grade) => ({
  value: grade,
  label: grade === "K" ? "K" : `Grade ${grade}`,
}));

export default gradeOptions;
