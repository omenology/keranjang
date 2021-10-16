import { Dispatch, useContext } from "react";
import axios from "axios";
import localforage from "localforage";
import { GlobalContext } from "../GlobalProvider";
import { authActionType } from "../reducers/auth";
import { AUTH_START, LOGIN_SUCCESS, AUTH_FAILD, LOGOUT, REGISTER_SUCCESS, RESET_UTILS, SET_UTILS } from "./actionTypes";
import { NextRouter, useRouter } from "next/router";
import { utilsActionType } from "../reducers/utils";
import { io } from "socket.io-client";

type payloadLogin = { password: string; email?: string; username?: string };
type payloadRegister = { email: string; username: string; password: string };
type userDataType = { id: string; email: string; username: string };

const loginHandler = async (dispatch: Dispatch<authActionType>, payload: payloadLogin, router: NextRouter, dispatchUtils: Dispatch<utilsActionType>) => {
  try {
    dispatch({ type: AUTH_START });

    const responsesLogin = await axios.post("http://localhost:4000/login/", payload);

    loginSuccess(dispatch, responsesLogin.data.data.token, router, dispatchUtils);
  } catch (error) {
    if (error.response) {
      dispatch({ type: AUTH_FAILD, error: error.response.data.message });
    } else {
      dispatch({ type: AUTH_FAILD, error: "something went wrong " + error.message });
    }
    console.log(error);
  }
};

const isLogin = async (dispatch: Dispatch<authActionType>, router: NextRouter, dispatchUtils: Dispatch<utilsActionType>) => {
  try {
    const token = (await localforage.getItem("token")) as string;
    if (token) {
      loginSuccess(dispatch, token, router, dispatchUtils);
    } else if (router.pathname !== "/login") {
      router.push("/login");
    }
  } catch (error) {
    router.push("/login");
    console.log(error);
  }
};

const loginSuccess = async (dispatch: Dispatch<authActionType>, token: string, router: NextRouter, dispatchUtils: Dispatch<utilsActionType>) => {
  try {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:4000/",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const socketio = io("http://localhost:4001/", {
      auth: {
        token: token,
      },
    });

    const responsesUser = await axiosInstance.get("user/myself/");
    const payloadUser: userDataType = {
      id: responsesUser.data.data.id as string,
      username: responsesUser.data.data.username as string,
      email: responsesUser.data.data.email as string,
    };

    await localforage.setItem("token", token);

    dispatchUtils({ type: SET_UTILS, axiosInstance: axiosInstance, socketio: socketio });
    dispatch({ type: LOGIN_SUCCESS, token: token, user: payloadUser });

    if (router.pathname !== "/login") {
      router.push(router.pathname);
    } else {
      router.push("/");
    }
  } catch (error) {
    localforage.removeItem("token");
    router.push("/login");
    console.log(error);
  }
};

const logoutHandler = async (dispatch: Dispatch<authActionType>, router: NextRouter, dispatchUtils: Dispatch<utilsActionType>) => {
  try {
    await localforage.removeItem("token");
    dispatch({ type: LOGOUT });
    dispatchUtils({ type: RESET_UTILS });
    router.push("/login");
  } catch (error) {
    console.log(error);
  }
};

const registerHandler = async (dispatch: Dispatch<authActionType>, payload: payloadRegister) => {
  try {
    dispatch({ type: AUTH_START });
    await axios.post("http://localhost:4000/user/", payload);
    dispatch({ type: REGISTER_SUCCESS });
  } catch (error) {
    if (error.response) {
      dispatch({ type: AUTH_FAILD, error: error.response.data.message });
    } else {
      dispatch({ type: AUTH_FAILD, error: "something went wrong" });
    }
    console.log(error);
  }
};

export const useAuth = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  if (context == undefined) throw new Error("context undefined");

  return {
    state: context.state.auth,
    isLogin: () => isLogin(context.dispatch.auth, router, context.dispatch.utils),
    login: (payload: payloadLogin) => loginHandler(context.dispatch.auth, payload, router, context.dispatch.utils),
    logout: () => logoutHandler(context.dispatch.auth, router, context.dispatch.utils),
    register: (payload: payloadRegister) => registerHandler(context.dispatch.auth, payload),
  };
};
