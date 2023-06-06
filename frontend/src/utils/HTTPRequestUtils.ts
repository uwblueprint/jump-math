export const makeImperativeMutation =
  <T>(mutation: string) =>
  async (options?: { variables?: Record<string, unknown> }): Promise<T> => {
    const query = JSON.stringify({
      query: mutation,
      ...options,
    });
    const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: query,
    });
    const resultJSON = await result.json();
    const { errors } = resultJSON;
    if (errors?.length) {
      throw new Error(errors[0].message);
    }
    return resultJSON;
  };

type Functions<T extends unknown[]> = {
  [K in keyof T]: () => T[K];
};
export const runUntilFirstSuccess = async <T extends unknown[]>(
  fns: Functions<T>,
  options?: { failMessage?: string },
): Promise<T[number]> => {
  for (const fn of fns) {
    try {
      return await Promise.resolve(fn());
    } catch (e) {
      console.error(e);
    }
  }
  throw new Error(options?.failMessage ?? "All functions failed");
};
