import { useReducer, createContext, Dispatch } from "react";
import { reducerAuth, initialStateAuth, authStateType, authActionType } from "./reducers/auth";

type GlobalContextType = {
  state: {
    auth: authStateType;
  };
  dispatch: {
    auth: Dispatch<authActionType>;
  };
};

export const GlobalContext = createContext<GlobalContextType>(undefined);

export const GlobalProvider = ({ children }) => {
  const [stateLogin, dispatchLogin] = useReducer(reducerAuth, initialStateAuth);

  const value = {
    state: { auth: stateLogin },
    dispatch: { auth: dispatchLogin },
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
