import React, { useRef, useState } from "react";

import Head from "next/head";
import { Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Navigation from "../components/navigation";
import Container from "../components/container";

const Keranjang = () => {
  const refTotal = useRef([]);
  const refQuantity = useRef([]);
  const refCheck = useRef([]);

  const [total, setTotal] = useState(0);

  const data = [
    {
      naem: "barang1",
      description: "yada yada yada yada",
      imgUrl: "http://nakertrans.sumbarprov.go.id/images/noimage.jpg",
      price: 24000,
    },
    {
      naem: "barang2",
      description: "yada yada yada yada",
      imgUrl: "http://nakertrans.sumbarprov.go.id/images/noimage.jpg",
      price: 27000,
    },
    {
      naem: "barang3",
      description: "yada yada yada yada",
      imgUrl: "http://nakertrans.sumbarprov.go.id/images/noimage.jpg",
      price: 124000,
    },
  ];

  const onChangeQuantity = (value: number, index: number) => {
    refTotal.current[index].innerHTML = (data[index].price * value).toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  };

  const onCheck = (value: boolean, index: number) => {
    if (value) {
      setTotal(total + data[index].price * refQuantity.current[index].value);
    } else {
      setTotal(total - data[index].price * refQuantity.current[index].value);
    }
  };

  //rp.replace(".","").split(",")[0].slice(3)

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
            {data.map((val, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input type="checkbox" onClick={(val) => onCheck(val.currentTarget.checked, index)} ref={(el) => (refCheck.current[index] = el)} />
                  </td>
                  <td>
                    <div className="row">
                      <div className="col-4">
                        <img src={val.imgUrl} className="img-fluid rounded-start" alt={val.naem} />
                      </div>
                      <div className="col-8">
                        <div className="card-body">
                          <h5 className="card-title">{val.naem}</h5>
                          <p className="card-text">{val.description} ...</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <p>{val.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
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
                        if (refCheck.current[index].checked) onCheck(true, index);
                      }}
                      ref={(el) => (refQuantity.current[index] = el)}
                      style={{ width: 65 }}
                    />
                  </td>
                  <td className="text-center">
                    <p>
                      <span ref={(el) => (refTotal.current[index] = el)}>{val.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>
                    </p>
                  </td>
                  <td className="text-center">
                    <OverlayTrigger overlay={<Tooltip>Hapus</Tooltip>}>
                      <Button size="sm" variant="danger" onClick={() => console.log("hapus")}>
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
          Total Yang harus dibayar: <span>{total}</span>
        </h3>
      </Container>
    </>
  );
};

Keranjang.navigation = Navigation;

export default Keranjang;
