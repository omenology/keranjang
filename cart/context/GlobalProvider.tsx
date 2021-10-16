import { useReducer, createContext, Dispatch } from "react";
import { reducerAuth, initialStateAuth, authStateType, authActionType } from "./reducers/auth";
import { reducerUtils, initalStateUtils, utilsStateType, utilsActionType } from "./reducers/utils";

type GlobalContextType = {
  state: {
    auth: authStateType;
    utils: utilsStateType;
  };
  dispatch: {
    auth: Dispatch<authActionType>;
    utils: Dispatch<utilsActionType>;
  };
};

export const GlobalContext = createContext<GlobalContextType>(undefined);

export const GlobalProvider = ({ children }) => {
  const [stateAuth, dispatchAuth] = useReducer(reducerAuth, initialStateAuth);
  const [stateUtils, dispatchUtils] = useReducer(reducerUtils, initalStateUtils);

  const value = {
    state: {
      auth: stateAuth,
      utils: stateUtils,
    },
    dispatch: {
      auth: dispatchAuth,
      utils: dispatchUtils,
    },
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
