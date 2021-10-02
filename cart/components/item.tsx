import React from "react";
import { Button } from "react-bootstrap";

import { dataBarangType } from "../utils";

type props = {
  data: dataBarangType;
  addToKeranjang: Function;
};
let num = 0;
const Item = ({ data, addToKeranjang }: props) => {
  const addToCartHandler = (id: string): void => {
    addToKeranjang(id);
  };
  console.log(num++, "item");
  return (
    <div className="col-6 col-md-3 p-1">
      <div className="card">
        <img src={data.image} className="card-img-top" style={{ height: 140 }} />
        <div className="card-body">
          <h5 className="card-title">{data.name}</h5>
          <p className="card-text">{data.description}</p>
          <p className="fw-bold">{data.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
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
