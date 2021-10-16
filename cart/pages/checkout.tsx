import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { tryJsonParse, dataCheckoutType, axios } from "../utils";
import Navigation from "../components/navigation";
import Container from "../components/container";
import { Card, Table } from "react-bootstrap";

const Checkout = (props) => {
  const router = useRouter();
  const data = tryJsonParse(router.query?.data as string) as dataCheckoutType;
  if (!data) router.push("/keranjang");

  useEffect(() => {
    console.log(
      "Rendered",
      data.items.map((val) => val.barangId)
    );
  }, []);

  return data ? (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <Container className="mt-5">
        <Card>
          <Card.Header>
            <Card.Title>Alamat Pengiriman</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="row">
              <div className="col-4">
                <p className="m-0 fw-bolder">{data.reciver}</p>
              </div>
              <div className="col-8">{data.shippingAddress}</div>
            </div>
          </Card.Body>
        </Card>
        <Card className="mt-3">
          <Card.Body>
            <Table>
              <thead>
                <tr>
                  <th colSpan={2} style={{ width: "38vw" }}>
                    Product
                  </th>
                  <th className="text-center">Harga Satuan</th>
                  <th className="text-center">Kuantitas</th>
                  <th className="text-center">subTotal</th>
                </tr>
              </thead>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  ) : null;
};
Checkout.navigation = Navigation;

export default Checkout;
