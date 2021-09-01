import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FloatingLabel, Button, Form } from "react-bootstrap";
import LoginWraper from "../components/LoginWraper";

import css from "../styles/login.module.css";

const Forget = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = (data): void => {
    console.log(data);
  };

  const isEmail = (str: string): boolean => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
      return true;
    }
    return false;
  };

  return (
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
            SUBMIT
          </Button>
        </div>
      </form>
      <p className="text-center mt-3" style={{ color: "ghostwhite" }}>
        <span onClick={() => router.push("/login")} className={`${css.textBtn}`}>
          Login
        </span>
      </p>
    </LoginWraper>
  );
};

export default Forget;
