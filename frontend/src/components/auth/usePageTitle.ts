import { useEffect, useRef } from "react";

const usePageTitle = (
  title?: string,
  skip = false,
  setOnlyIfUnchanged = false,
) => {
  const prevTitle = useRef("");
  prevTitle.current = document.title;
  useEffect(() => {
    if (skip) return;
    if (!title) return;
    if (setOnlyIfUnchanged && prevTitle.current !== document.title) return;
    document.title = `${title} | Jump Math`;
  }, [title, skip, setOnlyIfUnchanged]);
};
export default usePageTitle;
