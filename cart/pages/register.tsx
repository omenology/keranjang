import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FloatingLabel, Button, Form, Spinner, Alert } from "react-bootstrap";

import LoginWraper from "../components/loginWraper";

import css from "../styles/login.module.css";
import { payloadRegister } from "../utils";

const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const onSubmit = async (data: payloadRegister) => {
    console.log(data);
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/register", data);
      setLoading(false);
      setAlert({ type: "success", message: "Register success chek activation email" });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setAlert({ type: "danger", message: "Register failed" });
    }
  };

  const isEmail = (str: string): boolean => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
      return true;
    }
    return false;
  };

  return (
    <>
      <LoginWraper>
        <Head>
          <title>Register</title>
        </Head>
        <h3 className="text-center mb-4" style={{ color: "ghostwhite" }}>
          REGISTER ACCOUNT
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="" style={{ width: "100%" }}>
            <FloatingLabel label="Email" className={`${css.label} flex-grow-1`}>
              <Form.Control
                type="text"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  validate: { isEmail: (val) => isEmail(val) || "Email is not valid" },
                })}
                isInvalid={errors?.email}
                placeholder="email"
                className={`${css.ifocus} form-control`}
                style={{ borderRadius: "15px 15px 0 0" }}
              />
              <Form.Control.Feedback type="invalid" className={`${css.errorMsg}`}>
                {errors?.email?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel label="Username" className={`${css.label} flex-grow-1`}>
              <Form.Control type="text" {...register("username", { required: true })} isInvalid={errors?.username} placeholder="username" className={`${css.ifocus} form-control`} />
              <Form.Control.Feedback type="invalid" className={`${css.errorMsg}`}>
                Username is required
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
              />
              <Form.Control.Feedback type="invalid" className={`${css.errorMsg}`}>
                {errors?.password?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel label="Re-type Password" className={`${css.label} flex-grow-1`}>
              <Form.Control
                type="password"
                {...register("repassword", {
                  validate: { isEqual: (val) => val == getValues("password") || "Password is not equal" },
                })}
                isInvalid={errors?.repassword}
                className={`${css.ifocus} form-control`}
                placeholder="password"
              />
              <Form.Control.Feedback type="invalid" className={`${css.errorMsg}`}>
                {errors?.repassword?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </div>
          <div className="d-grid gap-2">
            <Button type="submit" size="lg" variant="dark" style={{ borderRadius: "0 0 15px 15px" }}>
              {loading ? <Spinner animation="border" variant="light" /> : "SUBMIT"}
            </Button>
          </div>
        </form>
        <p className="text-center mt-3" style={{ color: "ghostwhite" }}>
          <span onClick={() => router.push("/login")} className={`${css.textBtn}`}>
            Login
          </span>
        </p>
      </LoginWraper>
      {alert.type ? (
        <Alert
          variant={alert.type}
          dismissible
          onClose={() => setAlert({ type: "", message: "" })}
          style={{
            position: "absolute",
            top: 0,
            right: "50%",
            transform: "translateX(50%)",
          }}
        >
          {alert.message}
        </Alert>
      ) : null}
    </>
  );
};

export default Register;
