import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartAction";
import { Link, useParams } from "react-router-dom";
import Message from "../component/Message";

const CartPage = (props) => {
  const { id, qty } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addToCart(id, qty));
  }, [dispatch, id, qty]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log("cartItems", cartItems);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <div className="container mt-3 " style={props.takeStyle}>
        <Row className="d-flex justify-content-around">
          <Col md={8}>
            <h3>Shopping Cart</h3>
            {cartItems.length === 0 ? (
              <Message>
                Your Cart Is Empty ! <Link to={"/"}>Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item, i) => {
                  return (
                    <ListGroupItem key={i}>
                      <Row className="p-4" style={props.takeStyle}>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={3}>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/products/productdetailspage/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={3}>
                          <strong>Price</strong> : ${item.price} <br />
                          <strong>Total Price</strong> : $
                          {item.price * item.qty}
                        </Col>
                        <Col md={2}>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }>
                            {[...Array(item.countInStock).keys()].map((x) => {
                              return (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              );
                            })}
                          </Form.Control>
                          <Button
                            type="button"
                            variant="light"
                            className="mt-3"
                            onClick={() => removeFromCartHandler(item.product)}>
                            <i
                              className="fa fa-trash text-danger"
                              aria-hidden="true"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            )}
          </Col>
          <Col md={3}>
            <Card style={{ width: "100%" }}>
              <Card.Body style={props.takeStyle}>
                <Card.Title>SUBTOTAL ({cartItems.length}) ITEMS</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Link to={"/shipping"}>
                  <Button variant="primary" style={{ width: "100%" }}>
                    PROCEED TO CHECKOUT
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CartPage;
