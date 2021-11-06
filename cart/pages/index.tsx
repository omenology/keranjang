import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";

import { GetServerSidePropsContextWithSession, useBarang, withSession } from "../utils";
import { useUtils } from "../context";

import { Button, OverlayTrigger, Tooltip, Modal, Form, Card, ProgressBar } from "react-bootstrap";
import Navigation from "../components/navigation";
import Items from "../components/items";
import Container from "../components/container";
import css from "../styles/main.module.css";
import { useTes } from "../utils/useTes";

const Index = ({ tes }) => {
  //console.log(tes);
  const { axios } = useUtils();
  const { register, handleSubmit } = useForm();
  const { addBarang } = useBarang();
  const [newData, setNewData] = useState(null);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");

  const modalOpenHandler = () => setModalShow(true);
  const modalCloseHandler = () => setModalShow(false);

  const onSubmit = async (data: { name: string; description: string; price: any; image: string }) => {
    data.image = imgUrl;
    const response = await addBarang(data);
    setNewData(response.data);
  };

  const inputFileHandler = async (e) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("img", e.target.files[0]);
      const response = await axios({
        method: "POST",
        url: "http://localhost:4002/image",
        headers: {
          "content-type": "multipart/form-data",
        },
        data: formData,
      });
      setImgUrl(response.data.dataFile.url);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
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
            {/* <Form.FloatingLabel label="Img Url">
              <Form.Control {...register("image")} type="text" placeholder="Link Gambar barang" />
            </Form.FloatingLabel> */}
            <div>
              <label htmlFor="formFile" className="form-label">
                image file
              </label>
              <input className="form-control" type="file" id="formFile" onChange={inputFileHandler} />
              {loading ? <ProgressBar animated now={100} style={{ marginTop: 1, height: 5 }} /> : null}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={loading} type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

Index.navigation = Navigation;

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContextWithSession) => {
  // return {
  //   redirect: {
  //     permanent: false,
  //     destination: "/keranjang",
  //   },
  // };
  return {
    props: {},
  };
});

export default Index;
