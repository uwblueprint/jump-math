import { useEffect } from "react";

const usePageTitle = (title?: string, skip = false) => {
  useEffect(() => {
    if (skip) return;
    if (!title) return;
    document.title = `${title} | JUMP Math`;
  }, [title, skip]);
};
export default usePageTitle;
