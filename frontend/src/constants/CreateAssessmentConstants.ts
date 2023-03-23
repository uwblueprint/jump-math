import { Grade } from "../APIClients/types/UserClientTypes";
import { removeUnderscore, titleCase } from "../utils/GeneralUtils";

const gradeOptions = Object.keys(Grade).map((grade) => ({
  value: grade,
  label: grade === "K" ? "K" : titleCase(removeUnderscore(grade)),
}));

export default gradeOptions;
