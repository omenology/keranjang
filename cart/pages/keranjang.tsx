import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { useKeranjang } from "../utils";

import Head from "next/head";
import { Table, Button, OverlayTrigger, Tooltip, FloatingLabel, Form, Card } from "react-bootstrap";
import Navigation from "../components/navigation";
import Container from "../components/container";

import css from "../styles/keranjang.module.css";

const Keranjang = () => {
  const refTotal = useRef([]);
  const refQuantity = useRef([]);
  const refCheck = useRef([]);
  const [total, setTotal] = useState(0);
  const [reRender, setRerender] = useState(true);
  const [snap, setSnap] = useState(undefined);
  const [snapToken, setSnapToken] = useState("");
  const { data, loading, error, removeFromKeranjang, createTransaction } = useKeranjang();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onChangeQuantity = (value: number, index: number) => {
    refTotal.current[index].innerHTML = (data.data[index].barang.price * value).toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  };

  const totalHargaHandler = () => {
    let tesTotal = 0;
    let formatText;
    refTotal.current?.forEach((el, index) => {
      if (el) {
        formatText = el.innerText.replace(/\./g, "").split(",")[0] + "." + el.innerText.replace(/\./g, "").split(",")[1];
      }
      let harga = parseFloat(formatText?.slice(3) || 0);

      if (refCheck.current[index]?.checked) tesTotal += harga;
    });
    setTotal(tesTotal);
  };

  const deletHandler = (id: string, index: number) => {
    removeFromKeranjang(id);
    data.data.splice(index, 1);
    setRerender(!reRender);
    setTimeout(() => {
      totalHargaHandler();
    }, 100);
  };

  const onSubmit = async (dataForm: { reciver: string; shippingAddress: string }) => {
    const bodyTransaction = {
      gross_amount: total,
      shipping_address: dataForm.shippingAddress,
      reciver: dataForm.reciver,
      item_details: [],
    };

    refCheck.current.forEach((val, index) => {
      if (val?.checked) {
        bodyTransaction.item_details.push({
          id: data.data[index].barang.id,
          price: data.data[index].barang.price,
          quantity: parseInt(refQuantity.current[index].value),
          name: data.data[index].barang.name,
        });
      }
    });
    const transaction = (await createTransaction(bodyTransaction)) as { token: string; redirect_url: string };
    console.log(transaction);
    setSnapToken(transaction.token);
  };

  React.useEffect(() => {
    if (!window.snap) {
      setTimeout(() => {
        setRerender(!reRender);
      }, 1000);
    } else {
      setSnap(window.snap);
    }
  }, [window.snap]);

  React.useEffect(() => {
    if (snap && snapToken) snap.pay(snapToken);
  }, [snapToken]);

  return (
    <>
      <Head>
        <title>Keranjang</title>
        <script async src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="SB-Mid-client-8NaNSQNWSjYfRHQ3"></script>
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
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => {
                          deletHandler(barang.id, index);
                          totalHargaHandler();
                        }}
                      >
                        <i className="fas fa-times" />
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Card>
          <Card.Body>
            <div className="row">
              <div className="col">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FloatingLabel label="Penerima" className="mb-2">
                    <Form.Control type="text" {...register("reciver", { required: true })} isInvalid={errors?.reciver} placeholder="Penerima" />
                    <Form.Control.Feedback type="invalid" className={`${css.errMsg}`}>
                      Penerima tidak boleh kosong
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel label="Alatam Penerima" className="mb-2">
                    <Form.Control as="textarea" {...register("shippingAddress", { required: true })} isInvalid={errors?.shippingAddress} placeholder="Alatam Penerima" style={{ height: 100 }} />
                    <Form.Control.Feedback type="invalid" className={`${css.errMsg}`} style={{ top: 8 }}>
                      Alamat penerima tidak boleh kosong
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Button disabled={total == 0 && snap} type="submit">
                    Checkout
                  </Button>
                </Form>
              </div>
              <div className="col">
                <h4 className="text-end">
                  Total Yang harus dibayar: <span>{total.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>
                </h4>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

Keranjang.navigation = Navigation;

export default Keranjang;
