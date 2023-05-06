import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { register } from "../actions/userAction";
import FormComponent from "../component/FormComponent";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = "/login";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch Code
    if (password !== confirmPassword) {
      setMsg("Password Do Not Match");
    } else {
      dispatch(register(name, email, password));
      navigate("/");
    }
  };

  return (
    <>
      <FormComponent>
        <div style={{ border: "1px solid #999", padding: "20px" }}>
          <h3 style={{ color: "#444" }}>Create Your Accout</h3>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          {msg && <Message variant="danger">{msg}</Message>}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>
                <strong style={{ color: "#444" }}>Name</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label style={{ color: "#444", marginTop: "5px" }}>
                <strong> Email Address</strong>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label style={{ color: "#444", marginTop: "5px" }}>
                <strong>Password</strong>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmpassword">
              <Form.Label style={{ color: "#444", marginTop: "5px" }}>
                <strong> Confirm Password</strong>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-Enter password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }></Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "5px" }}>
              SIGN IN
            </Button>
          </Form>
          <Row>
            <Col style={{ marginTop: "5px" }}>
              Have an account?
              <Link style={{ textDecoration: "none" }} to={redirect}>
                Login
              </Link>
            </Col>
          </Row>
        </div>
      </FormComponent>
    </>
  );
};

export default RegisterPage;
