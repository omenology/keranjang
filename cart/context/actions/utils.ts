import { Dispatch, useContext } from "react";
import { GlobalContext } from "../GlobalProvider";

export const useUtils = () => {
  const context = useContext(GlobalContext);
  if (context == undefined) throw new Error("context undefined");
  return {
    axios: context.state.utils.axios,
    socketio: context.state.utils.socketio,
    localforage: context.state.utils.localforage,
  };
};
