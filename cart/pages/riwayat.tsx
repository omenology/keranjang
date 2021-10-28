import React from "react";
import Head from "next/head";
import { Card, Table } from "react-bootstrap";

import Navigation from "../components/navigation";
import Container from "../components/container";

const Riwayat = () => {
  return (
    <>
      <Head>
        <title>Pesanan Saya</title>
      </Head>
      <Container>
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
                <tr key={1}>
                  <td>gambar prod</td>
                  <td>
                    <p className="fw-bold m-0">nama produk</p>
                  </td>
                  <td className="text-center">100</td>
                  <td className="text-center">2</td>
                  <td className="text-center">200</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
Riwayat.navigation = Navigation;

export default Riwayat;
