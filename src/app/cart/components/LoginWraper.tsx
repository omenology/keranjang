import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../context";
import css from "../styles/login.module.css";

const LoginWraper = (props) => {
  const { state, isLogin } = useAuth();
  const router = useRouter();
  useEffect(() => {
    isLogin();
    if (state.token) router.push("/");
  }, [state.token]);

  return (
    <div className={`${css.bgContainer} container-fluid`}>
      <div className="row justify-content-md-center d-flex align-items-center" style={{ height: "100vh" }}>
        <div className="col-md-5">
          <div className={`${css.bgCard} card`} style={{ border: 0 }}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWraper;
