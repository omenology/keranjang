import { useContext } from "react";
import { GlobalContext } from "../GlobalProvider";
import localforage from "localforage";

export const useUtils = () => {
  // const context = useContext(GlobalContext);
  //if (context == undefined) throw new Error("context undefined");

  console.log(localforage, "useUtils=+");
  return {
    localforage: localforage,
  };
};
