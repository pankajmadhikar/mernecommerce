import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormComponent from "../component/FormComponent";
import { saveShippingAddress } from "../actions/cartAction";
import { useNavigate } from "react-router-dom";
import CheckoutStep from "../component/CheckoutStep";

const ShippingPage = (props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalcode, setPostalcode] = useState(shippingAddress.postalcode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch
    dispatch(saveShippingAddress({ address, city, postalcode, country }));
    navigate("/placeorder");
  };

  return (
    <>
      <FormComponent>
        <CheckoutStep step1 step2 />
        <div style={{ border: "1px solid #999", padding: "20px" }}>
          <Form onSubmit={submitHandler} style={props.takeStyle}>
            <Form.Group controlId="address">
              <Form.Label style={{ color: "#444" }}>
                {" "}
                <strong>Address</strong>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label style={{ color: "#444", marginTop: "5px" }}>
                {" "}
                <strong>City</strong>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="postalcode">
              <Form.Label style={{ color: "#444", marginTop: "5px" }}>
                <strong>Postalcode</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Postalcode"
                value={postalcode}
                required
                onChange={(e) => setPostalcode(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label style={{ color: "#444", marginTop: "5px" }}>
                {" "}
                <strong>Country</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}></Form.Control>
            </Form.Group>
            {/* <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "5px" }}>
              continue
            </Button> */}
          </Form>
        </div>
      </FormComponent>
    </>
  );
};

export default ShippingPage;
