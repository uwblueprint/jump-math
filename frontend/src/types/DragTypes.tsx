export const DragTypes = {
  QUESTION_SIDEBAR_ITEM: "Question Sidebar Item",
  QUESTION_ELEMENT_ITEM: "Question Element Item",
};

export interface DragQuestionItem {
  index: number;
  id: string;
  type: string;
}
