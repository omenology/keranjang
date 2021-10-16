import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { tryJsonParse, dataCheckoutType } from "../utils";
import Navigation from "../components/navigation";
import Container from "../components/container";
import { Card, Table } from "react-bootstrap";
import { useUtils } from "../context/actions/utils";

const Checkout = (props) => {
  const { state: utils } = useUtils();
  const router = useRouter();
  const data = tryJsonParse(router.query?.data as string) as dataCheckoutType;
  if (!data) router.push("/keranjang");

  const [barang, setBarang] = useState<object[]>([]);

  useEffect(() => {
    console.log(
      "Rendered",
      data.items.map((val) => val.barangId)
    );

    utils.axios
      .get("/barang", {
        params: {
          items: JSON.stringify(data.items.map((val) => val.barangId)),
        },
      })
      .then((val) => {
        console.log(val);
      })
      .catch((err) => {
        console.log(err);
      });
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
