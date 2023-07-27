import { useEffect } from "react";

const usePageTitle = (title?: string, skip?: boolean) => {
  useEffect(() => {
    if (skip) return;
    if (!title) return;
    document.title = `${title} | Jump Math`;
  }, [title, skip]);
};
export default usePageTitle;
