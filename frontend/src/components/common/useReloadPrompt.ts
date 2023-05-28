import { useEffect } from "react";

const useReloadPrompt = () => {
  useEffect(() => {
    window.onbeforeunload = () => true;
    return () => {
      window.onbeforeunload = null;
    };
  }, []);
};

export default useReloadPrompt;
