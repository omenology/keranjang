import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FloatingLabel, Button, Form, Spinner } from "react-bootstrap";

import { useAuth } from "../context";
import { emailOrUsername } from "../utils";
import LoginWraper from "../components/loginWraper";

import css from "../styles/login.module.css";

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { state, login } = useAuth();

  const onSubmit = (data: { identifier: string; password: string }): void => {
    const payloadLogin = {
      ...emailOrUsername(data.identifier),
      password: data.password,
    };
    login(payloadLogin);
  };

  return (
    <LoginWraper>
      <Head>
        <title>Login</title>
      </Head>
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
              {...register("password", {
                required: { value: true, message: "Password is required" },
                minLength: { value: 4, message: "Password to short" },
                maxLength: { value: 16, message: "Password to long" },
              })}
              isInvalid={errors?.password}
              className={`${css.ifocus} form-control`}
              placeholder="password"
              style={{ borderRadius: "0 15px 0 0" }}
            />
            <Form.Control.Feedback type="invalid" className={`${css.errorMsg}`}>
              {errors?.password?.message}
            </Form.Control.Feedback>
          </FloatingLabel>
        </div>
        <div className="d-grid gap-2">
          <Button type="submit" size="lg" variant="dark" style={{ borderRadius: "0 0 15px 15px" }}>
            {state.loading ? <Spinner animation="border" variant="light" /> : "SIGN IN"}
          </Button>
        </div>
      </form>
      <p className="text-center mt-3" style={{ color: "ghostwhite" }}>
        <span onClick={() => router.push("/register")} className={`${css.textBtn}`}>
          Register
        </span>{" "}
        |{" "}
        <span onClick={() => router.push("/forget")} className={`${css.textBtn}`}>
          Forget Password?
        </span>
      </p>
    </LoginWraper>
  );
};

export default Login;
