import React from "react";

const Wrapper = (props) => {
  React.useEffect(() => {
    //isLogin();
    console.log("wraper");
  }, []);

  return props.children;
};

export default Wrapper;
