import { Dispatch, useContext } from "react";
import { GlobalContext } from "../GlobalProvider";

export const useUtils = () => {
  const context = useContext(GlobalContext);
  return {
    state: context.state.utils,
  };
};
