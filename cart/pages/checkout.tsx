import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";

import { tryJsonParse, dataCheckoutType, dataBarangType } from "../utils";
import Navigation from "../components/navigation";
import Container from "../components/container";
import { Card, Table } from "react-bootstrap";
import { useUtils } from "../context";
import Button from "@restart/ui/esm/Button";

const Checkout = (props) => {
  const { axios } = useUtils();
  const router = useRouter();
  const [snap, setSnap] = useState(null);
  const data = tryJsonParse(router.query?.data as string) as dataCheckoutType;
  if (!data) router.push("/keranjang");

  const [barang, setBarang] = useState<dataBarangType[]>([]);

  useEffect(() => {
    console.log(router.query, window?.snap);

    if (window?.snap) setSnap(window?.snap);
    axios
      .get("/barang", {
        params: {
          items: JSON.stringify(data.items.map((val) => val.barangId)),
        },
      })
      .then((val) => {
        console.log(val);
        setBarang(val.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return data ? (
    <>
      <Head>
        <title>Checkout</title>
        <script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="SB-Mid-client-8NaNSQNWSjYfRHQ3"></script>
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
              <tbody>
                {barang.map((val, index) => {
                  return (
                    <tr key={index}>
                      <td>gambar prod</td>
                      <td>
                        <p className="fw-bold m-0">{val.name}</p>
                        <p className="m-0">{val.description}</p>
                      </td>
                      <td className="text-center">{val.price}</td>
                      <td className="text-center">{data.items[index].quantity}</td>
                      <td className="text-center">{val.price * data.items[index].quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Button
          onClick={() => {
            console.log(snap, router.query.token);
            snap.pay(router.query.token);
          }}
        >
          pay
        </Button>
      </Container>
    </>
  ) : null;
};
Checkout.navigation = Navigation;

export default Checkout;
