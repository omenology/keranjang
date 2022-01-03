import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import { dataBarangType } from "../utils";

type props = {
  data: dataBarangType;
  addToKeranjang: Function;
  removeBarang: Function;
};

const Item = ({ data, addToKeranjang, removeBarang }: props) => {
  const addToCartHandler = (id: string): void => {
    addToKeranjang(id);
  };

  return (
    <div className="col-6 col-md-3 p-1">
      <div className="card">
        <OverlayTrigger overlay={<Tooltip>Hapus barang</Tooltip>}>
          <Button
            size="sm"
            variant="danger"
            style={{ position: "absolute", right: 0 }}
            onClick={()=>removeBarang(data.id)}
          >
            <i className="fas fa-times" />
          </Button>
        </OverlayTrigger>
        <img
          src={data.image.replace(
            "http://localhost:4002",
            "http://localhost:5000/api-upload"
          )}
          className="card-img-top"
          style={{ height: 140 }}
        />
        <div className="card-body">
          <h5 className="card-title">{data.name}</h5>
          <p className="card-text">{data.description}</p>
          <p className="fw-bold">
            {data.price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
          <div className="d-grid">
            <Button onClick={() => addToCartHandler(data.id)}>
              Add to Cart <i className="fas fa-cart-plus"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
