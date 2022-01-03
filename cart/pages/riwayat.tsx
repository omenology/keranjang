import React from "react";
import { GetServerSideProps } from "next";
import { withIronSessionSsr } from "iron-session/next";

import {  useCheckout, cookieOptions } from "../utils";

import Head from "next/head";
import { Card, Spinner, Image } from "react-bootstrap";
import Navigation from "../components/navigation";
import Container from "../components/container";

const Riwayat = ({ token }) => {
  const { data, isLoading } = useCheckout(token);

  console.log(data);

  if (isLoading) return <Spinner animation="border" style={{ position: "absolute", top: "50%", left: "50%" }} />;
  return (
    <>
      <Head>
        <title>Pesanan Saya</title>
      </Head>
      <Container>
        {data?.data.map((val, index) => {
          return (
            <Card key={index} className="mt-3">
              <Card.Header className="d-flex justify-content-between">
                <h5 className="m-0 p-0">Order ID: {val.orderId}</h5>
                <h5 className="m-0 p-0">Payment Status: {val.paymentStatus}</h5>
              </Card.Header>
              <Card.Body>
                {val.items.map((item, index) => {
                  return (
                    <div className="row">
                      <div className="col">
                        <Image key={"item" + index} src={item.image} alt={item.name} style={{ width: 200 }} />
                      </div>
                      <div className="col">
                        <p className="m-0 p-0">{item.name}</p>
                        <p className="m-0 p-0">{item.description}</p>
                      </div>
                      <div className="col">
                        <p className="m-0 p-0">{item.quantitiy}</p>x
                      </div>
                    </div>
                  );
                })}
                <div className="row">
                  <div className="col">
                    <p className="m-0 p-0">Riciver:{val.reciver}</p>
                    <p className="m-0 p-0">Alamat:{val.shippingAddress}</p>
                  </div>
                  <div className="col">
                    <h5 className="m-0 p-0">Total Payment : {val.totalPayment}</h5>
                  </div>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </>
  );
};
Riwayat.navigation = Navigation;

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(async (context) => {
  return {
    props: {
      token: context.req.session.token || null,
    },
  };
},cookieOptions);

export default Riwayat;
