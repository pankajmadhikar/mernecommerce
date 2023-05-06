import React, { useEffect } from "react";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Card,
  Image,
  NavLink,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message";
import CheckoutStep from "../component/CheckoutStep";
import { useNavigate } from "react-router-dom";

const PlaceOrderPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const navigate = useNavigate();

  // function for decimal
  const addDecimal = (num) => {
    return Math.round(num * 100).toFixed(1);
  };
  cart.itemPrice = addDecimal(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimal(cart.cartItems > 500 ? 0 : 50);
  cart.taxPrice = addDecimal(Number((0.15 * cart.itemPrice).toFixed(2)));
  cart.totalPrice =
    Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemPrice: cart.itemPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    // eslint next line disabled
  }, [navigate, success]);

  return (
    <>
      <CheckoutStep step1 step2 step3 step4 />
      <div className="container">
        <Row style={{ width: "100%" }}>
          <Col md={8} style={{ border: "1px solid #999" }}>
            <ListGroup variant="flush">
              <ListGroup.Item style={props.takeStyle}>
                <h2>Shipping</h2>
                <p>
                  <strong>Address :</strong>
                  {cart.shippingAddress.address}&nbsp;
                  {cart.shippingAddress.city}&nbsp;
                  {cart.shippingAddress.postalcode}&nbsp;
                  {cart.shippingAddress.country}&nbsp;
                </p>
              </ListGroup.Item>
              <ListGroup.Item style={props.takeStyle}>
                <h2>Payment Method</h2>
                <p>
                  <strong>{cart.paymentMethod}</strong>
                </p>
              </ListGroup.Item>
              <ListGroup.Item style={props.takeStyle}>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>Your Cart is Empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => {
                      return (
                        <ListGroup.Item key={index} style={props.takeStyle}>
                          <Row>
                            <Col md={1}>
                              <Image src={item.image} alt={item.name} fluid />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} X ${item.price} = ${item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item style={props.takeStyle}>
                  <h2>Order Summery</h2>
                </ListGroup.Item>
                <ListGroup.Item style={props.takeStyle}>
                  <Row>
                    <Col>Items</Col>
                    <Col>${cart.itemPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${cart.shippingPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Total</Col>
                    <Col>${cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item style={props.takeStyle}>
                  {error && (
                    <Message variant="danger">
                      {error ? "Login Your Account" : error}
                    </Message>
                  )}
                </ListGroup.Item>
                <NavLink></NavLink>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}>
                  Place Order
                </Button>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PlaceOrderPage;
