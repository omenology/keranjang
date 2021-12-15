import axios from "axios";
import React from "react";

const Wrapper = ({ children, token }) => {
  React.useEffect(() => {
    if (token) axios.get("/api/auth/refresh");
  }, []);

  return children;
};

export default Wrapper;
