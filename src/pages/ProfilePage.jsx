import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [view, setView] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, user } = userDetails;
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, navigate, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch Code
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };

  return (
    <>
      <div className="container mt-3">
        <Row>
          <Col md={5}>
            <h3>Profile</h3>
            <p>User Name : {name}</p>
            <p>User Email : {email}</p>
            <Button variant="success" onClick={() => setView(true)}>
              Update Profile
            </Button>
          </Col>

          {view && (
            <Col md={5}>
              <h3>Update Profile</h3>
              {error && <Message variant="danger">{error}</Message>}
              {success && <Message variant="success">Profile Updated</Message>}
              {loading && <Loader />}
              {msg && <Message variant="danger">{msg}</Message>}

              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group contr olId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmpassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Re-Enter password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  UPDATE
                </Button>
              </Form>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
};

export default ProfilePage;
