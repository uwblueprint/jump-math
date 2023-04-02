export const DragTypes = {
  QUESTION_SIDEBAR_ITEM: "Question Sidebar Item",
  QUESTION_ELEMENT_ITEM: "Question Element Item",
  QUESTION_CARD: "Question Card",
};

export interface DragQuestionItem {
  index: number;
  id: string;
  type: string;
}
