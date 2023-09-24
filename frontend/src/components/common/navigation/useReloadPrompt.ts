import { useEffect } from "react";

const useReloadPrompt = (when?: boolean) => {
  useEffect(() => {
    if (!when) return;

    const beforeUnloadListener = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return (event.returnValue = "");
    };

    addEventListener("beforeunload", beforeUnloadListener, { capture: true });
    return () => {
      removeEventListener("beforeunload", beforeUnloadListener, {
        capture: true,
      });
    };
  }, [when]);
};

export default useReloadPrompt;
