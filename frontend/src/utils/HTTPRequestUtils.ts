class NetworkError extends Error {
  constructor(message: string, public readonly options?: { cause?: unknown }) {
    super(message, options);
    this.name = "NetworkError";
  }
}

class GraphQLError extends Error {
  constructor(message: string, public readonly options?: { cause?: unknown }) {
    super(message, options);
    this.name = "GraphQLError";
  }
}

export const makeImperativeMutation =
  <T>(mutation: string) =>
  async (options?: { variables?: Record<string, unknown> }): Promise<T> => {
    const query = JSON.stringify({
      query: mutation,
      ...options,
    });
    let resultJSON;
    try {
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/graphql`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: query,
        },
      );
      resultJSON = await result.json();
    } catch (e) {
      throw new NetworkError("A network error occurred", { cause: e });
    }

    const { errors } = resultJSON;
    if (errors?.length) {
      throw new GraphQLError(errors[0].message);
    }
    return resultJSON;
  };

type Functions<T extends unknown[]> = {
  [K in keyof T]: () => T[K];
};
export const runUntilFirstSuccess = async <T extends unknown[]>(
  fns: Functions<T>,
  options?: { failMessage?: string; failOnNetworkError?: boolean },
): Promise<T[number]> => {
  for (const fn of fns) {
    try {
      return await Promise.resolve(fn());
    } catch (e) {
      console.error(e);
      if (e instanceof NetworkError && options?.failOnNetworkError) {
        throw e;
      }
    }
  }
  throw new Error(options?.failMessage ?? "All functions failed");
};
