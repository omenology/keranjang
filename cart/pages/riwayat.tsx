import React from "react";
import Head from "next/head";

import Navigation from "../components/navigation";
import Container from "../components/container";

const Riwayat = () => {
  return (
    <>
      <Head>
        <title>Pesanan Saya</title>
      </Head>
      <Container>
        <div>
          <h1>Riwayat</h1>
        </div>
      </Container>
    </>
  );
};
Riwayat.navigation = Navigation;

export default Riwayat;
