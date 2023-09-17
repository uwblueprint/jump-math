import { useEffect } from "react";

const useReloadPrompt = (when?: boolean) => {
  useEffect(() => {
    const beforeUnloadListener = (event: BeforeUnloadEvent) => {
      if (!when) return;

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
