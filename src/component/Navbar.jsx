import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Nav, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userAction";
import ToggleSwitch from "./ToggleSwitch";

// Component

const Navbar = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container">
        <NavLink
          className="navbar-brand"
          to={"/"}
          style={{ fontSize: "25px", marginLeft: "10px" }}>
          Home
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

          <NavLink
            to={"/cartpage/:id/:qty"}
            className="nav-link active"
            style={{ marginLeft: "20px", marginTop: "5px" }}>
            <Badge
              badgeContent={cartItems.length}
              color={"primary"}
              id="basic-button"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                fontSize: "20px",
                width: "70px",
                marginRight: "10px",
                color: `${props.mode === "dark" ? "#fff" : "#444"}`,
              }}>
              <div style={{ marginTop: "0px", marginRight: "2px" }}>Cart</div>
              <ShoppingCartIcon />
            </Badge>
          </NavLink>

          {userInfo ? (
            <NavDropdown
              title={userInfo.name}
              id="username"
              style={{
                fontSize: "20px",
                width: "70px",
                marginRight: "10px",
                color: `${props.mode === "dark" ? "#fff" : "#444"}`,
              }}>
              <LinkContainer to={"/profile"} style={props.takeStyle}>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler} style={props.takeStyle}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to={"/login"}>
              <Nav.Link
                style={{
                  fontSize: "20px",
                  width: "70px",
                  marginRight: "10px",
                  color: `${props.mode === "dark" ? "#fff" : "#444"}`,
                }}>
                <i className="fas fa-user"></i>
                &nbsp; Singin
              </Nav.Link>
            </LinkContainer>
          )}

          <ToggleSwitch applyMode={props.applyMode} mode={props.mode} />

          {/* <Box>
            <NavLink to={"/login"}>
              <Button
                variant="contained"
                style={{
                  marginLeft: "20px",
                  marginTop: "5px",
                }}>
                Signin
              </Button>
            </NavLink>
          </Box> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
