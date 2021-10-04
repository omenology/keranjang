import React from "react";
import { useAuth } from "../context";
import { useRouter } from "next/router";

const Wrapper = (props) => {
  const { isLogin, state } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    isLogin();
  }, []);
  if (!state.token && router.pathname != "/login") return null;
  return props.children;
};

export default Wrapper;
