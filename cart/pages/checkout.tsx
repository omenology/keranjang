import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { tryJsonParse, dataCheckoutType, dataBarangType } from "../utils";
import Navigation from "../components/navigation";
import Container from "../components/container";
import { Card, Table, Button } from "react-bootstrap";
import { useUtils } from "../context";

const Checkout = (props) => {
  const { axios } = useUtils();
  const router = useRouter();
  const [snap, setSnap] = useState(undefined);
  const [tokenTransaction, setTokenTransaction] = useState<string>("");
  const data = tryJsonParse(router.query?.data as string) as dataCheckoutType;
  if (!data) router.push("/keranjang");

  const [barang, setBarang] = useState<dataBarangType[]>([]);

  useEffect(() => {
    getBarangAndtransaction();
  }, []);

  useEffect(() => {
    if (window?.snap) setSnap(window?.snap as any);
  }, [window.snap]);

  const getBarangAndtransaction = async () => {
    try {
      const resBarang = await axios.get("/barang?id=asc", {
        params: {
          items: JSON.stringify(data.items.map((val) => val.barangId)),
        },
      });
      const barang: dataBarangType[] = resBarang.data.data;
      setBarang(barang);

      const bodyTransaction = {
        gross_amount: data.totalPayment,
        shipping_address: data.shippingAddress,
        reciver: data.reciver,
        item_details: barang.map((val, index) => {
          return {
            id: val.id,
            price: val.price,
            quantity: data.items[index].quantity,
            name: val.name,
          };
        }),
      };
      const resTransaction = await axios.post("/keranjang/transaction", bodyTransaction);
      setTokenTransaction(resTransaction.data.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return data ? (
    <>
      <Head>
        <title>Checkout</title>
        <script async src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="SB-Mid-client-8NaNSQNWSjYfRHQ3"></script>
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
          disabled={snap ? false : true}
          onClick={() => {
            snap.pay(tokenTransaction);
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
