import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import axios from "axios";
import jwtDecode from "jwt-decode";

import { GetServerSidePropsContextWithSession, useBarang, withSession } from "../utils";

import { Button, OverlayTrigger, Tooltip, Modal, Form, Spinner, ProgressBar } from "react-bootstrap";
import Navigation from "../components/navigation";
import Item from "../components/item";
import Container from "../components/container";
import css from "../styles/main.module.css";

const Index = ({ token }) => {
  const { register, handleSubmit } = useForm();
  const { data, loading, addBarang, setQuery, addToKeranjang } = useBarang(token);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [loadingUpload, setLoading] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");

  const modalOpenHandler = () => setModalShow(true);
  const modalCloseHandler = () => setModalShow(false);

  const onSubmit = async (data: { name: string; description: string; price: any; image: string }) => {
    data.image = imgUrl;
    try {
      await addBarang(data);
    } catch (error) {
      console.log(error);
    }
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
          Authorization: "Bearer " + token,
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
        <input
          type="number"
          defaultValue={10}
          onChange={(val) => {
            setQuery({ limit: +val.currentTarget.value || 1 });
          }}
        />
        {loading ? (
          <Spinner animation="border" style={{ position: "absolute", top: "50%", left: "50%" }} />
        ) : (
          <div className="row">
            {data.data.map((val, index) => {
              return <Item key={index} data={val} addToKeranjang={addToKeranjang} />;
            })}
          </div>
        )}
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

            <div>
              <label htmlFor="formFile" className="form-label">
                image file
              </label>
              <input className="form-control" type="file" id="formFile" onChange={inputFileHandler} />
              {loadingUpload ? <ProgressBar animated now={100} style={{ marginTop: 1, height: 5 }} /> : null}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={loadingUpload} type="submit">
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
  return {
    props: {
      token: context.req.session.get("token") || null,
    },
  };
});

export default Index;
