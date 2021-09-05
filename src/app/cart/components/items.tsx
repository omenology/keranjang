import React from "react";
import { Button } from "react-bootstrap";

const Items = (props) => {
  console.log(props.data);
  return (
    <div className="row">
      <div className="col-6 col-md-3 p-1">
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
      <div className="col-6 col-md-3 p-1">
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
      <div className="col-6 col-md-3 p-1">
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
      <div className="col-6 col-md-3 p-1">
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
  );
};

export default Items;
