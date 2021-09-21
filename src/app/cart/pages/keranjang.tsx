import React, { useEffect, useRef, useState } from "react";

import { useGetKeranjang } from "../utils";

import Head from "next/head";
import { Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Navigation from "../components/navigation";
import Container from "../components/container";
import { stringify } from "querystring";

const Keranjang = () => {
  const refTotal = useRef([]);
  const refQuantity = useRef([]);
  const refCheck = useRef([]);
  const [total, setTotal] = useState(0);
  const [reRender, setRerender] = useState(true);

  const { data, loading, error, removeFromKeranjang } = useGetKeranjang();

  const onChangeQuantity = (value: number, index: number) => {
    refTotal.current[index].innerHTML = (data.data[index].barang.price * value).toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  };

  const totalHargaHandler = () => {
    let tesTotal = 0;
    refTotal.current.forEach((el, index) => {
      let formatText = el.innerText.replace(/\./g, "").split(",")[0] + "." + el.innerText.replace(/\./g, "").split(",")[1];
      let harga = parseFloat(formatText.slice(3));

      if (refCheck.current[index].checked) tesTotal += harga;
    });
    setTotal(tesTotal);
  };

  const deletHandler = (id: string, index: number) => {
    removeFromKeranjang(id);
    data.data.splice(index, 1);
    setRerender(!reRender);
  };

  return (
    <>
      <Head>
        <title>Keranjang</title>
      </Head>
      <Container>
        <Table>
          <thead>
            <tr>
              <th colSpan={2} style={{ width: "38vw" }}>
                Product
              </th>
              <th className="text-center">Harga Satuan</th>
              <th className="text-center">Kuantitas</th>
              <th className="text-center">Harga Total</th>
              <th className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map(({ id, barang }, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input type="checkbox" onClick={totalHargaHandler} ref={(el) => (refCheck.current[index] = el)} />
                  </td>
                  <td>
                    <div className="row">
                      <div className="col-4">
                        <img src={barang.image} className="img-fluid rounded-start" alt={barang.name} />
                      </div>
                      <div className="col-8">
                        <div className="card-body">
                          <h5 className="card-title">{barang.name}</h5>
                          <p className="card-text">{barang.description} ...</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <p>{barang.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                  </td>
                  <td className="text-center">
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={1}
                      min={1}
                      max={99}
                      onChange={(e) => {
                        onChangeQuantity(parseInt(e.currentTarget.value), index);
                        totalHargaHandler();
                      }}
                      ref={(el) => (refQuantity.current[index] = el)}
                      style={{ width: 65 }}
                    />
                  </td>
                  <td className="text-center">
                    <p>
                      <span ref={(el) => (refTotal.current[index] = el)}>{barang.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>
                    </p>
                  </td>
                  <td className="text-center">
                    <OverlayTrigger overlay={<Tooltip>Hapus</Tooltip>}>
                      <Button size="sm" variant="danger" onClick={() => deletHandler(barang.id, index)}>
                        <i className="fas fa-times" />
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <h3>
          Total Yang harus dibayar: <span>{total.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>
        </h3>
      </Container>
    </>
  );
};

Keranjang.navigation = Navigation;

export default Keranjang;
