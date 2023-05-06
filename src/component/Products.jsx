import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../actions/productAction";
import Loader from "./Loader";
import Message from "./Message";

const Products = (props) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  const productBody = {
    width: "16rem",
    backgroundColor: `${props.mode === "light" ? "#fff" : "black"}`,
    color: `${props.mode === "dark" ? "#fff" : "black"}`,
    border: `${props.mode === "light" ? "none" : "0.5px solid gray"}`,
  };

  return (
    <>
      <div
        className="row d-flex justify-content-between align-item-center "
        style={{ width: "100%" }}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          products.map((e) => {
            return (
              <div
                key={e._id}
                className="card mx-2 mt-4 card-style"
                style={productBody}>
                <NavLink to={`/products/productdetailspage/${e._id}`}>
                  <img
                    src={e.image}
                    className="card-img-top"
                    alt="..."
                    style={{ height: "16rem" }}
                  />
                </NavLink>
                <div className="card-body">
                  <NavLink
                    to={`/products/productdetailspage/${e._id}`}
                    style={{ textDecoration: "none" }}>
                    <h5 className="card-title">{e.category}</h5>{" "}
                  </NavLink>
                  <p className="card-text">Price : ${e.price}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Products;
