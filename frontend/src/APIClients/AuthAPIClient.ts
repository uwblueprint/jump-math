import type {
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";

import AUTHENTICATED_USER_KEY from "../constants/AuthConstants";
import type { AuthenticatedUser, VerifiableUser } from "../types/AuthTypes";
import type { SchoolMetadata } from "../types/TeacherSignupTypes";
import { setLocalStorageObjProperty } from "../utils/LocalStorageUtils";

import type { Grade } from "./types/UserClientTypes";

type LoginFunction = (
  options?:
    | MutationFunctionOptions<{ login: VerifiableUser }, OperationVariables>
    | undefined,
) => Promise<
  FetchResult<
    { login: VerifiableUser },
    Record<string, unknown>,
    Record<string, unknown>
  >
>;

const login = async (
  email: string,
  password: string,
  loginFunction: LoginFunction,
): Promise<VerifiableUser | null> => {
  let user: VerifiableUser | null = null;
  try {
    const result = await loginFunction({ variables: { email, password } });
    user = result.data?.login ?? null;
    if (user && user.emailVerified) {
      localStorage.setItem(AUTHENTICATED_USER_KEY, JSON.stringify(user));
    }
  } catch (e: unknown) {
    // eslint-disable-next-line no-alert
    window.alert("Failed to login");
  }
  return user;
};

type RegisterFunction = (
  options?:
    | MutationFunctionOptions<
        { register: AuthenticatedUser },
        OperationVariables
      >
    | undefined,
) => Promise<
  FetchResult<
    { register: AuthenticatedUser },
    Record<string, unknown>,
    Record<string, unknown>
  >
>;

const registerTeacher = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  grades: Grade[],
  currentlyTeachingJM: boolean,
  school: SchoolMetadata,
  registerFunction: RegisterFunction,
): Promise<AuthenticatedUser | null> => {
  let user: AuthenticatedUser = null;
  try {
    const result = await registerFunction({
      variables: {
        firstName,
        lastName,
        email,
        password,
        grades,
        currentlyTeachingJM,
        school,
      },
    });
    user = result.data?.register ?? null;
    if (user) {
      localStorage.setItem(AUTHENTICATED_USER_KEY, JSON.stringify(user));
    }
  } catch (e: unknown) {
    // eslint-disable-next-line no-alert
    window.alert("Failed to sign up");
  }
  return user;
};

type LogoutFunction = (
  options?:
    | MutationFunctionOptions<
        {
          logout: null;
        },
        OperationVariables
      >
    | undefined,
) => Promise<
  FetchResult<
    {
      logout: null;
    },
    Record<string, unknown>,
    Record<string, unknown>
  >
>;

const logout = async (
  authenticatedUserId: string,
  logoutFunction: LogoutFunction,
  options?: { raiseError?: boolean },
): Promise<boolean> => {
  const result = await logoutFunction({
    variables: { userId: authenticatedUserId },
  });
  let success = false;
  if (result.data?.logout === null) {
    success = true;
    localStorage.removeItem(AUTHENTICATED_USER_KEY);
  }
  if (!success && options?.raiseError) {
    throw new Error("Failed to logout");
  }
  return success;
};

type RefreshFunction = (
  options?:
    | MutationFunctionOptions<
        {
          refresh: string;
        },
        OperationVariables
      >
    | undefined,
) => Promise<
  FetchResult<
    {
      refresh: string;
    },
    Record<string, unknown>,
    Record<string, unknown>
  >
>;

const refresh = async (
  refreshFunction: RefreshFunction,
  options?: { raiseError?: boolean },
): Promise<boolean> => {
  const result = await refreshFunction();
  let success = false;
  const token = result.data?.refresh;
  if (token) {
    success = true;
    setLocalStorageObjProperty(AUTHENTICATED_USER_KEY, "accessToken", token);
  }
  if (!success && options?.raiseError) {
    throw new Error("Failed to refresh");
  }
  return success;
};

export default { login, logout, registerTeacher, refresh };
