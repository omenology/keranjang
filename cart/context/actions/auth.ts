import { Dispatch, useContext } from "react";
import axios from "axios";
import localforage from "localforage";
import { GlobalContext } from "../GlobalProvider";
import { authActionType } from "../reducers/auth";
import { AUTH_START, LOGIN_SUCCESS, AUTH_FAILD, LOGOUT, REGISTER_SUCCESS } from "./actionTypes";
import { NextRouter, useRouter } from "next/router";

type payloadLogin = { password: string; email?: string; username?: string };
type payloadRegister = { email: string; username: string; password: string };

const loginHandler = async (dispatch: Dispatch<authActionType>, payload: payloadLogin, router: NextRouter) => {
  try {
    dispatch({ type: AUTH_START });

    const responsesLogin = await axios.post("http://localhost:4000/login/", payload);
    const responsesUser = await axios.get("http://localhost:4000/user/myself/", {
      headers: {
        Authorization: "Bearer " + responsesLogin.data.data.token,
      },
    });
    const payloadUser = {
      id: responsesUser.data.data.id as string,
      username: responsesUser.data.data.username as string,
      email: responsesUser.data.data.email as string,
    };

    dispatch({ type: LOGIN_SUCCESS, token: responsesLogin.data.data.token, user: payloadUser });
    await localforage.setItem("token", responsesLogin.data.data.token);
    router.push("/");
  } catch (error) {
    localforage.removeItem("token");
    if (error.response) {
      console.log(error.response);
      dispatch({ type: AUTH_FAILD, error: error.response.data.message });
    } else {
      dispatch({ type: AUTH_FAILD, error: "something went wrong" });
      console.log(error);
    }
  }
};

const isLogin = async (dispatch: Dispatch<authActionType>, router: NextRouter) => {
  try {
    const token = (await localforage.getItem("token")) as string;
    if (token) {
      const responsesUser = await axios.get("http://localhost:4000/user/myself/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const payloadUser = {
        id: responsesUser.data.data.id as string,
        username: responsesUser.data.data.username as string,
        email: responsesUser.data.data.email as string,
      };
      dispatch({ type: LOGIN_SUCCESS, token, user: payloadUser });
      if (router.pathname !== "/login") {
        router.push(router.pathname);
      } else {
        router.push("/");
      }
    } else if (router.pathname !== "/login") {
      router.push("/login");
    }
  } catch (error) {
    console.log(error);
    router.push("/login");
  }
};

const logoutHandler = async (dispatch: Dispatch<authActionType>, router: NextRouter) => {
  try {
    await localforage.removeItem("token");
    dispatch({ type: LOGOUT });
    router.push("/login");
  } catch (error) {
    console.log(error);
  }
};

const registerHandler = async (dispatch: Dispatch<authActionType>, payload: payloadRegister) => {
  try {
    dispatch({ type: AUTH_START });
    const response = await axios.post("http://localhost:4000/user/", payload);
    dispatch({ type: REGISTER_SUCCESS });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      dispatch({ type: AUTH_FAILD, error: error.response.data.message });
    } else {
      dispatch({ type: AUTH_FAILD, error: "something went wrong" });
      console.log(error);
    }
  }
};

export const useAuth = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  if (context == undefined) throw new Error("context undefined");
  //console.log(context.state, "useAuth");
  return {
    state: context.state.auth,
    isLogin: () => isLogin(context.dispatch.auth, router),
    login: (payload: payloadLogin) => loginHandler(context.dispatch.auth, payload, router),
    logout: () => logoutHandler(context.dispatch.auth, router),
    register: (payload: payloadRegister) => registerHandler(context.dispatch.auth, payload),
  };
};
