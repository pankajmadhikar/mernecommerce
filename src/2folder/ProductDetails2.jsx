import React, { useEffect, useState } from "react";
import "../externalStyle/ProductDetailsStyle.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DetailsImage from "../helper/DetailsImage";
import { useDispatch, useSelector } from "react-redux";
import { listProductsDetails } from "../actions/productActions";
import { ListGroupItem, Row, Col, Form } from "react-bootstrap";

const ProductDetailsPage = (props) => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listProductsDetails(id));
  }, [dispatch, id]);

  const deliveryMainDiv = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "30px",
  };
  const deliveryChildDiv = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  };
  const iconP = {
    fontSize: "20px",
    backgroundColor: "#999",
    padding: "3px 7px",
    borderRadius: "50px",
  };
  const textP = {
    marginTop: "-13px",
  };

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      {loading ? (
        <h1>.....Loading</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div className="container detail_main mt-3">
          <div className="main_image_box">
            <DetailsImage
              image={product.image}
              image1={product.image1}
              image2={product.image2}
              image3={product.image3}
              image4={product.image4}
            />
          </div>
          <div className="detail_content" style={props.takeStyle}>
            <p style={{ fontSize: "20px" }}>
              <b>{product.category}</b>
            </p>

            <p>
              <span
                style={{
                  background: "goldenrod",
                  color: "black",
                  padding: "2px 6px",
                  borderRadius: "5px",
                }}>
                {product.rating} ★
              </span>
            </p>

            <div>
              <p style={{ fontSize: "30px", marginBottom: "-3px" }}>
                $ {product.price}
              </p>
              <p>
                Price : $<del>{product.price}</del>
              </p>
              <p>Inclusive of all taxes</p>
            </div>
            <hr />
            <div>
              <p style={{ marginBottom: "-3px" }}>
                <b>Offers</b>
              </p>
              <p>Save extra with No Cost EMI, Bank Offer etc. </p>
            </div>
            <hr />

            <p style={{ fontSize: "20px" }}>
              Brand : <b style={{ color: "orangered" }}>company</b>
            </p>
            {product.countInStock > 0 ? (
              <p style={{ color: "green" }}>
                <b>In Stock</b>
              </p>
            ) : (
              <p style={{ color: "red" }}>
                <b>Not Available In Stock</b>
              </p>
            )}

            <hr />
            <p>{product.description}</p>

            {product.countInStock > 0 && (
              <ListGroupItem>
                <Row>
                  <Col>
                    <strong>Quantity</strong>
                  </Col>
                  <Form.Control
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => {
                      return (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Row>
              </ListGroupItem>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}>
              <div style={{ width: "100%" }}>
                <NavLink to={`/cart/${product._id}/${qty}`}>
                  <button
                    type="button"
                    className="btn btn-primary "
                    style={{
                      borderRadius: "50px",
                      width: "100%",
                      fontWeight: "600",
                    }}
                    // onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </NavLink>
              </div>
              <button
                type="button"
                className="btn mt-3  "
                style={{
                  backgroundColor: "#0bc75f",
                  // color: "",
                  borderRadius: "50px",
                  width: "100%",
                  fontWeight: "600",
                }}>
                Buy Now
              </button>
            </div>

            <div style={deliveryMainDiv}>
              <div style={deliveryChildDiv}>
                <p style={iconP}>
                  <i className="fa-solid fa-truck"></i>
                </p>
                <p style={textP}>Free Delivery</p>
              </div>
              <div style={deliveryChildDiv}>
                <p style={iconP}>
                  <i className="fa-sharp fa-solid fa-recycle"></i>
                </p>
                <p style={textP}>20 Days Reaplacement</p>
              </div>
              <div style={deliveryChildDiv}>
                <p style={iconP}>
                  <i className="fa-solid fa-shield-halved"></i>
                </p>
                <p style={textP}>2 Years Warrenty</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailsPage;
