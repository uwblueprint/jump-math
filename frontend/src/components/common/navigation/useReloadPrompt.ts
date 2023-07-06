import { useEffect } from "react";

const beforeUnloadListener = (event: BeforeUnloadEvent) => {
  event.preventDefault();
  return (event.returnValue = "");
};

const useReloadPrompt = () => {
  useEffect(() => {
    addEventListener("beforeunload", beforeUnloadListener, { capture: true });
    return () => {
      removeEventListener("beforeunload", beforeUnloadListener, {
        capture: true,
      });
    };
  }, []);
};

export default useReloadPrompt;
