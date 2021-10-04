import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useBarang } from "../utils";

import { Button, OverlayTrigger, Tooltip, Modal, Form, Card } from "react-bootstrap";
import Navigation from "../components/navigation";
import Items from "../components/items";
import Container from "../components/container";
import css from "../styles/main.module.css";

const Index = ({ tes }) => {
  console.log(tes);
  const [modalShow, setModalShow] = useState(false);
  const [newData, setNewData] = useState(null);
  const { register, handleSubmit } = useForm();
  const { addBarang } = useBarang();

  const modalOpenHandler = () => setModalShow(true);
  const modalCloseHandler = () => setModalShow(false);

  const onSubmit = async (data: { name: string; description: string; price: any; image: string }) => {
    const response = await addBarang(data);
    setNewData(response.data);
  };

  return (
    <>
      <Head>
        <title>Belanja dong!!!</title>
      </Head>

      <Container>
        <Items newData={newData} />
      </Container>

      <OverlayTrigger overlay={<Tooltip>Add Product</Tooltip>}>
        <Button onClick={modalOpenHandler} className={`rounded-circle ${css.addBtn}`}>
          <i className="fas fa-plus" />
        </Button>
      </OverlayTrigger>

      <Modal show={modalShow} onHide={modalCloseHandler} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Form.FloatingLabel label="Name" className="mb-2">
              <Form.Control {...register("name", { required: true })} type="text" placeholder="Nama barang" />
            </Form.FloatingLabel>
            <Form.FloatingLabel label="Description" className="mb-2">
              <Form.Control {...register("description")} as="textarea" placeholder="Deskrpisi barang" style={{ height: 100 }} />
            </Form.FloatingLabel>
            <Form.FloatingLabel label="Price" className="mb-2">
              <Form.Control {...register("price")} type="number" placeholder="Harga barang" />
            </Form.FloatingLabel>
            <Form.FloatingLabel label="Img Url">
              <Form.Control {...register("image")} type="text" placeholder="Link Gambar barang" />
            </Form.FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

Index.navigation = Navigation;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { tes: "asd" },
  };
};

export default Index;
