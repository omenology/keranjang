import React, { BaseSyntheticEvent, useRef } from "react";
import Head from "next/head";

import css from "../styles/main.module.css";
import { Button } from "react-bootstrap";

const Index = () => {
  const navEl = useRef(null);

  const clickHandler = (e: BaseSyntheticEvent) => {
    for (const el of navEl.current.children) {
      el.classList.remove(`${css.active}`);
    }

    e.currentTarget.classList.add(`${css.active}`);
  };

  return (
    <>
      <Head>
        <title>Belanja dong!!!</title>
      </Head>
      <div className={`row ${css.nav}`}>
        <div className="col-1">Logo</div>
        <div className={`col-10 p-2`}>
          <ul ref={navEl} className="nav justify-content-center">
            <li className={`nav-item ${css.navBtn} ${css.active}`} onClick={clickHandler}>
              <span className="nav-link">Beranda</span>
            </li>
            <li className={`nav-item ${css.navBtn}`} onClick={clickHandler}>
              <span className="nav-link">Keranjang</span>
            </li>
            <li className={`nav-item ${css.navBtn}`} onClick={clickHandler}>
              <span className="nav-link">Riwayat</span>
            </li>
          </ul>
        </div>
        <div className="col-1"></div>
      </div>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-3">
            <div className="card">
              <img src="http://nakertrans.sumbarprov.go.id/images/noimage.jpg" className="card-img-top" style={{ height: 140 }} />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p className="fw-bold">Rp 450.000</p>
                <div className="d-grid">
                  <Button>
                    Add to Cart <i className="fas fa-cart-plus"></i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
