import { createContext } from "react";

export interface PopoverContextType {
  onClose: () => void;
}

export const PopoverContext = createContext<PopoverContextType>({
  onClose: () => {},
});
