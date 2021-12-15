import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import axios from "axios";

import { GetServerSidePropsContextWithSession, useBarang, withSession, API_BASE_URL } from "../utils";

import { Button, OverlayTrigger, Tooltip, Modal, Form, Spinner, ProgressBar, Card, Pagination } from "react-bootstrap";
import Navigation from "../components/navigation";
import Item from "../components/item";
import Container from "../components/container";
import css from "../styles/main.module.css";

const Index = ({ token }) => {
  const { register, handleSubmit } = useForm();
  const { data, loading, addBarang, query, setQuery, addToKeranjang } = useBarang(token);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [loadingUpload, setLoading] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<{ key: string; value: "ASC" | "DESC" }>({ key: "createdAt", value: "ASC" });

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
        baseURL: API_BASE_URL,
        url: "/api-upload/image",
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
  React.useEffect(() => {
    setQuery({ ...query, offset: (page - 1) * query.limit });
  }, [page]);
  React.useEffect(() => {
    setQuery({ ...query, order: { [order.key]: order.value } });
  }, [order]);

  return (
    <>
      <Head>
        <title>Belanja dong!!!</title>
      </Head>

      <Container>
        <div className="row" style={{ padding: "10px 0", backgroundColor: "gray" }}>
          <div className="col-3">
            <input className="form-control" type="text" placeholder="Keyword Search" />
          </div>
          <div className="col-2">
            <div className="d-flex">
              <select
                className="form-select"
                aria-label="list view"
                defaultValue="10"
                onChange={(e) => {
                  setQuery({ ...query, limit: +e.currentTarget.value });
                }}
                style={{ width: 85 }}
              >
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select>
              <Pagination className="m-0">
                <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page <= 1} />
                <Pagination.Item disabled>
                  <p className="m-0">
                    {page}/{Math.ceil((data?.info.total || 0) / query.limit)}
                  </p>
                </Pagination.Item>
                <Pagination.Next onClick={() => setPage(page + 1)} disabled={Math.ceil((data?.info.total || 0) / query.limit) == page} />
              </Pagination>
            </div>
          </div>
          <div className="col-3">
            <div className="d-flex">
              <select
                className="form-select"
                aria-label="list view"
                defaultValue="createdAt"
                onChange={(e) => {
                  //setQuery({ ...query, order: { [e.currentTarget.value]: order } });
                  setOrder({ ...order, key: e.currentTarget.value });
                }}
              >
                <option value="createdAt">Date</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
              <Pagination className="m-0">
                <Pagination.Item active={order.value === "ASC"} onClick={() => setOrder({ ...order, value: "ASC" })}>
                  ASC
                </Pagination.Item>
                <Pagination.Item active={order.value === "DESC"} onClick={() => setOrder({ ...order, value: "DESC" })}>
                  DESC
                </Pagination.Item>
              </Pagination>
            </div>
          </div>
        </div>
        {loading ? (
          <Spinner animation="border" style={{ position: "absolute", top: "50%", left: "50%" }} />
        ) : (
          <div className="row">
            {data?.data.map((val, index) => {
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
