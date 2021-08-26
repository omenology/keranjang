import React from "react";
import { FloatingLabel, Button } from "react-bootstrap";

import css from "../styles/login.module.css";

const Login = (props) => {
  return (
    <div className={`${css.bgContainer} container-fluid`}>
      <div className="row justify-content-md-center d-flex align-items-center" style={{ height: "100vh" }}>
        <div className="col-md-5">
          <div className={`${css.bgCard} card`} style={{ border: 0 }}>
            <h3 className="text-center mb-4" style={{ color: "ghostwhite" }}>
              ACCOUNT LOGIN
            </h3>
            <form>
              <div className="d-inline-flex" style={{ width: "100%" }}>
                <FloatingLabel label="Email address" className={`${css.label} flex-grow-1`}>
                  <input placeholder="name@example.com" type="email" className={`${css.ifocus} form-control`} style={{ borderRadius: "15px 0 0 0" }} />
                </FloatingLabel>
                <FloatingLabel label="Password" className={`${css.label} flex-grow-1`}>
                  <input type="password" className={`${css.ifocus} form-control`} placeholder="lala" style={{ borderRadius: "0 15px 0 0" }} />
                </FloatingLabel>
              </div>
              <div className="d-grid gap-2">
                <Button type="submit" size="lg" variant="dark" style={{ borderRadius: "0 0 15px 15px" }}>
                  SIGN IN
                </Button>
              </div>
            </form>
            <p className="text-center mt-3" style={{ color: "ghostwhite" }}>
              <span onClick={() => console.log("register")} style={{ cursor: "pointer" }}>
                Register
              </span>{" "}
              |{" "}
              <span onClick={() => console.log("forget")} style={{ cursor: "pointer" }}>
                Forget Password?
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
