import { useEffect, useState } from "react";
import type { LocationDescriptor, LocationState } from "history";

type HistoryFunction = <T extends LocationState>(
  location: LocationDescriptor<T>,
  state?: T,
) => void;

export type DisablePromptFunction = (
  historyFunction: HistoryFunction,
) => HistoryFunction;

const useDisableReloadPrompt = (): [boolean, DisablePromptFunction] => {
  const [navigationAction, setNavigationAction] = useState<(() => void) | null>(
    null,
  );

  useEffect(() => {
    navigationAction?.();
    setNavigationAction(null);
  }, [navigationAction]);

  const disablePrompt =
    (historyFunction: HistoryFunction): HistoryFunction =>
    (location, state) =>
      setNavigationAction(() => () => {
        historyFunction?.(location, state);
      });

  return [!!navigationAction, disablePrompt];
};

export default useDisableReloadPrompt;
