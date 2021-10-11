import React from "react";
import { withRouter } from "next/router";
import Head from "next/head";

import Navigation from "../components/navigation";
import Container from "../components/container";

const Checkout = (props) => {
  //const router = useRouter();
  console.log(props.router);
  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <Container>
        <h1>Checkout</h1>
      </Container>
    </>
  );
};
Checkout.navigation = Navigation;

export default Checkout;
