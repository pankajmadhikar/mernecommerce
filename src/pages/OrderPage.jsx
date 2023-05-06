import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const OrderPage = (props) => {
  const orderId = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  console.log(orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    // calculate price
    const addDecimal = (num) => {
      return Math.round(num * 100).toFixed(1);
    };
    order.itemPrice = addDecimal(
      order.orderItem.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId.id));
  }, [dispatch, orderId.id]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <div className="container d-flex justify-content-center mt-3">
        <div class="card " style={{ width: "90%" }}>
          <div class="card-body" style={props.takeStyle}>
            <h5 class="card-title">Order Id : {order._id}</h5>
            <h5 class="card-title">Shipping</h5>
            <h6 class="card-subtitle mb-2 ">
              {" "}
              <strong>Name : </strong>
              {userInfo.name}
            </h6>
            <h6 class="card-subtitle mb-2 ">
              {" "}
              <strong>Email : </strong>
              {userInfo.email}
            </h6>
            <hr />
            <p class="card-text">
              {" "}
              <strong>Address : </strong>
              {order.shippingAddress.address}&nbsp;
              {order.shippingAddress.city}&nbsp;
              {order.shippingAddress.postalcode}&nbsp;
              {order.shippingAddress.country}&nbsp;
            </p>
            <h5 class="card-title">Payment Method</h5>
            <p class="card-text">
              <strong>Method :</strong>
              <strong>{order.paymentMethod}</strong>
            </p>

            {order.isDelivered ? (
              <Message variant="success">Paid On {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </div>
        </div>
      </div>

      {/* <div
        className="container mt-3   "
        style={{ border: "1px solid #999", width: "50%" }}>
        <Row
          style={{
            border: "1px solid red",
            display: "flex",
            justifyContent: "center",
          }}>
          <h3>Order Id : {order._id}</h3>
          <Col md={8}>
            <ListGroup.Item variant="flush">
              <h3>Shipping</h3>
              <p style={{ fontSize: "18px" }}>
                <strong>Name : </strong>
                {userInfo.name}
              </p>
              <p style={{ fontSize: "18px" }}>
                <strong>Email : </strong>
                {userInfo.email}
              </p>
              <p style={{ fontSize: "18px" }}>
                <strong>Address : </strong>
                {order.shippingAddress.address}&nbsp;
                {order.shippingAddress.city}&nbsp;
                {order.shippingAddress.postalcode}&nbsp;
                {order.shippingAddress.country}&nbsp;
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment Method</h3>
              <p style={{ fontSize: "18px" }}>
                <strong>Method :</strong>
                <strong>{order.paymentMethod}</strong>
              </p>

              {order.isDelivered ? (
                <Message variant="success">Paid On {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
          </Col>
        </Row>
      </div> */}
    </>
  );
};

export default OrderPage;
