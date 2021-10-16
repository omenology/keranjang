import { AUTH_START, LOGIN_SUCCESS, AUTH_FAILD, LOGOUT, REGISTER_SUCCESS } from "../actions/actionTypes";

export type userType = {
  id: string;
  username: string;
  email: string;
};
export type authStateType = {
  token: null | string;
  user: userType | null;
  loading: boolean;
  error: boolean | string;
};
const actionTypesAuth = [AUTH_START, LOGIN_SUCCESS, AUTH_FAILD, LOGOUT, REGISTER_SUCCESS] as const;
export type authActionType = {
  type: typeof actionTypesAuth[number];
  token?: string;
  user?: userType;
  error?: string | boolean;
};

export const initialStateAuth: authStateType = {
  token: null,
  user: null,
  loading: false,
  error: false,
};

export const reducerAuth = (state: authStateType, action: authActionType) => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, loading: true, error: false };

    case LOGIN_SUCCESS:
      return { ...state, token: action.token, user: action.user, loading: false };

    case AUTH_FAILD:
      return { ...initialStateAuth, error: action.error };

    case LOGOUT:
      return initialStateAuth;

    case REGISTER_SUCCESS:
      return { ...state, loading: false };

    default:
      return initialStateAuth;
  }
};
