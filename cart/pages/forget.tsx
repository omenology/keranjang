import React, { useState } from "react";
import axios from "axios";

import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FloatingLabel, Button, Form, Alert, Spinner } from "react-bootstrap";

import LoginWraper from "../components/loginWraper";
import css from "../styles/login.module.css";

const Forget = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      await axios.post("/api/auth/forget", data);
      setLoading(false);
      setAlert({ type: "success", message: "Check your email" });
    } catch (error) {
      setLoading(false);
      setAlert({ type: "danger", message: "something went worng" });
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
          <title>Forget</title>
        </Head>
        <h3 className="text-center mb-4" style={{ color: "ghostwhite" }}>
          FORGET PASSWORD
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

export default Forget;
