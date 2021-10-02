import React from "react";
import { useAuth } from "../context";

const Wrapper = (props) => {
  const { isLogin } = useAuth();
  console.log("ada wraper");
  React.useEffect(() => {
    isLogin();
  }, []);
  return props.children;
};

export default Wrapper;
