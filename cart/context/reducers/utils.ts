import { SET_UTILS, SET_AXIOS, SET_SOCKETIO, RESET_UTILS } from "../actions/actionTypes";
import { AxiosInstance } from "axios";
import { Socket } from "socket.io-client";

const actionTypesUtil = [SET_UTILS, SET_AXIOS, SET_SOCKETIO, RESET_UTILS] as const;
export type utilsStateType = {
  axios: AxiosInstance | null;
  socketio: Socket | null;
};
export type utilsActionType = {
  type: typeof actionTypesUtil[number];
  axiosInstance?: AxiosInstance;
  socketio?: Socket;
};

export const initalStateUtils: utilsStateType = {
  axios: null,
  socketio: null,
};

export const reducerUtils = (state: utilsStateType, action: utilsActionType) => {
  switch (action.type) {
    case SET_UTILS:
      return { axios: action.axiosInstance, socketio: action.socketio };

    case SET_AXIOS:
      return { ...state, axios: action.axiosInstance };

    case SET_SOCKETIO:
      return { ...state, socketio: action.socketio };

    case RESET_UTILS:
      return initalStateUtils;

    default:
      return state;
  }
};
