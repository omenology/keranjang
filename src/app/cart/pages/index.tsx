import React, { useState } from "react";
import Head from "next/head";

import { Button, Dropdown, OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import css from "../styles/main.module.css";
import Items from "../components/items";
import Navigation from "../components/navigation";

const Index = () => {
  const [modalShow, setModalShow] = useState(false);

  const modalOpenHandler = () => setModalShow(true);
  const modalCloseHandler = () => setModalShow(false);

  return (
    <>
      <Head>
        <title>Belanja dong!!!</title>
      </Head>
      <Navigation />
      <div className={`container-fluid ${css.container}`}>
        <Items data="data" />
      </div>
      <OverlayTrigger overlay={<Tooltip>Add Product</Tooltip>}>
        <Button onClick={modalOpenHandler} className={`rounded-circle ${css.addBtn}`}>
          <i className="fas fa-plus" />
        </Button>
      </OverlayTrigger>
      <Modal show={modalShow} onHide={modalCloseHandler} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius harum quas eos hic libero ab sunt. Tempore praesentium, vero earum nulla sequi eaque aperiam ipsam totam odit, ab magni dolorem.
        </Modal.Body>
        <Modal.Footer>
          <Button>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Index;
