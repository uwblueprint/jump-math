import { useRouteMatch } from "react-router-dom";

const useRouteMatchParam = <K, V extends string>(
  route: string,
  key: keyof K,
) => {
  const match = useRouteMatch<{ [k in keyof K]: V }>(route)?.params;
  return match?.[key];
};

export default useRouteMatchParam;
