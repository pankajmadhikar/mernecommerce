import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { login } from "../actions/userAction";
import FormComponent from "../component/FormComponent";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = "/register";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch Code

    if (!error) {
      navigate("/login");
    }
  };

  return (
    <>
      <FormComponent>
        <div style={{ border: "1px solid #999", padding: "20px" }}>
          <h3 style={{ color: "#444" }}>Login To Your Account</h3>
          {error && (
            <Message variant="danger">
              {error ? "Invalid Email or Password" : ""}
            </Message>
          )}
          {loading && <Loader />}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>
                <strong style={{ color: "#444" }}>Email Address</strong>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group
              controlId="password"
              style={{ color: "#444", marginTop: "10px" }}>
              <strong>Password</strong>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              style={{ marginTop: "10px" }}
              type="submit"
              onClick={() => {
                dispatch(login(email, password));
                if (!error) navigate("/");
              }}>
              SIGN IN
            </Button>
          </Form>
          <Row>
            <Col style={{ marginTop: "10px" }}>
              New Costomer?{" "}
              <Link style={{ textDecoration: "none" }} to={redirect}>
                Register
              </Link>
            </Col>
          </Row>
        </div>
      </FormComponent>
    </>
  );
};

export default LoginPage;
