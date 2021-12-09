import axios from "axios";
import React from "react";

const Wrapper = ({ children, token }) => {
  React.useEffect(() => {
    if (token)
      axios.get("http://localhost:5000/api/auth/refreshtoken", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
  }, []);

  return children;
};

export default Wrapper;
