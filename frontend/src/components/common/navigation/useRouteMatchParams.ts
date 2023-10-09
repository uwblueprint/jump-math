import { useRouteMatch } from "react-router-dom";

const useRouteMatchParam = <K, V extends string>(
  route: string,
  key: keyof K,
) => {
  const params = useRouteMatch<{ [k in keyof K]: V }>(route)?.params;
  return params?.[key];
};

export default useRouteMatchParam;
