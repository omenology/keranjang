import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILD, LOGOUT } from "../actions/actionTypes";

export type authStateType = {
  token: null | string;
  loading: boolean;
  error: boolean | string;
};

const typeAuth = [LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILD, LOGOUT] as const;
export type authActionType = {
  type: typeof typeAuth[number];
  token?: string;
  error?: string | boolean;
};

export const initialStateAuth: authStateType = {
  token: null,
  loading: false,
  error: false,
};

export const reducerAuth = (state: authStateType, action: authActionType) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, loading: true, error: false };

    case LOGIN_SUCCESS:
      return { ...state, token: action.token, loading: false };

    case LOGIN_FAILD:
      return { ...state, error: action.error, token: null, loading: false };

    case LOGOUT:
      return { token: null, loading: false, error: false };

    default:
      return state;
  }
};
