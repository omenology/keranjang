import React from "react";
import { useForm } from "react-hook-form";
import { FloatingLabel, Button, Form } from "react-bootstrap";
import LoginWraper from "../components/LoginWraper";

import css from "../styles/login.module.css";

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { identifier: string; password: string }): void => {
    console.log({
      ...isEmail(data.identifier),
      password: data.password,
    });
  };

  const isEmail = (str: string): object => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
      return { email: str };
    }
    return { username: str };
  };

  const errorMessagePassword = (key: string): string => {
    switch (key) {
      case "minLength":
        return "Password to short";
      case "maxLength":
        return "Password to long";
      case "required":
        return "Password is required";
    }
  };

  return (
    <LoginWraper>
      <h3 className="text-center mb-4" style={{ color: "ghostwhite" }}>
        ACCOUNT LOGIN
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-inline-flex" style={{ width: "100%" }}>
          <FloatingLabel label="Username or Email" className={`${css.label} flex-grow-1`}>
            <Form.Control
              type="text"
              {...register("identifier", { required: true })}
              isInvalid={errors?.identifier}
              placeholder="username or email"
              className={`${css.ifocus} form-control`}
              style={{ borderRadius: "15px 0 0 0" }}
            />
            <Form.Control.Feedback type="invalid" className={`${css.errorMsg}`}>
              Username or Email is required
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel label="Password" className={`${css.label} flex-grow-1`}>
            <Form.Control
              type="password"
              {...register("password", { required: true, minLength: 4, maxLength: 16 })}
              isInvalid={errors?.password}
              className={`${css.ifocus} form-control`}
              placeholder="password"
              style={{ borderRadius: "0 15px 0 0" }}
            />
            <Form.Control.Feedback type="invalid" className={`${css.errorMsg}`}>
              {errorMessagePassword(errors?.password?.type)}
            </Form.Control.Feedback>
          </FloatingLabel>
        </div>
        <div className="d-grid gap-2">
          <Button type="submit" size="lg" variant="dark" style={{ borderRadius: "0 0 15px 15px" }}>
            SIGN IN
          </Button>
        </div>
      </form>
      <p className="text-center mt-3" style={{ color: "ghostwhite" }}>
        <span onClick={() => console.log("register")} className={`${css.textBtn}`}>
          Register
        </span>{" "}
        |{" "}
        <span onClick={() => console.log("forget")} className={`${css.textBtn}`}>
          Forget Password?
        </span>
      </p>
    </LoginWraper>
  );
};

export default Login;
