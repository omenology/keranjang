import { Dispatch, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../GlobalProvider";
import { authActionType } from "../reducers/auth";
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILD, LOGOUT } from "./actionTypes";

type payloadLogin = { password: string; email?: string; username?: string };

const loginHandler = async (dispatch: Dispatch<authActionType>, payload: payloadLogin) => {
  try {
    dispatch({ type: LOGIN_START });

    const responses = await axios.post("http://localhost:4000/login/", payload);
    dispatch({ type: LOGIN_SUCCESS, token: responses.data.data.token });

    localStorage.setItem("token", responses.data.data.token);
  } catch (error) {
    localStorage.removeItem("token");
    if (error.response) {
      console.log(error.response);
      dispatch({ type: LOGIN_FAILD, error: error.response.data.message });
    } else {
      dispatch({ type: LOGIN_FAILD, error: "something went wrong" });
      console.log(error);
    }
  }
};

const isLogin = async (dispatch: Dispatch<authActionType>) => {
  try {
    const token = localStorage.getItem("token");
    if (token) dispatch({ type: LOGIN_SUCCESS, token });
  } catch (error) {
    console.log(error);
  }
};

const logoutHandler = async (dispatch: Dispatch<authActionType>) => {
  try {
    localStorage.removeItem("token");
    const token = localStorage.getItem("token");
    if (!token) dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};

export const useAuth = () => {
  const context = useContext(GlobalContext);
  if (context == undefined) throw new Error("context undefined");
  return {
    state: context.state.auth,
    isLogin: () => isLogin(context.dispatch.auth),
    login: (payload: payloadLogin) => loginHandler(context.dispatch.auth, payload),
    logout: () => logoutHandler(context.dispatch.auth),
  };
};
