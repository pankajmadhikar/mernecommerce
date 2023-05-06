import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { savePaymentMethod } from "../actions/cartAction";
import CheckoutStep from "../component/CheckoutStep";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const PaymentPage = (props) => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  console.log("Shipping Address", shippingAddress);

  // if (!shippingAddress) {
  //   navigate("/shipping");
  // }
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <CheckoutStep step1 step2 step3 />
      <div
        className="container text-center d-flex justify-content-center    "
        style={props.takeStyle}>
        <div
          style={{
            display: "flex",
            border: "2px solid #999",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            height: "50vh",
          }}>
          <h1>Payment Method</h1>
          <Form onSubmit={submitHandler} style={{ width: "40%" }}>
            <Form.Group>
              <Form.Label as="legend">Select Payment Method</Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  label="Paypal or Credit Card"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }></Form.Check>
              </Col>
            </Form.Group>
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
