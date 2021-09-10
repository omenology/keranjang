import React from "react";

import css from "../styles/main.module.css";

const Container = (props) => {
  return <div className={`container-fluid ${css.container}`}>{props.children}</div>;
};

export default Container;
