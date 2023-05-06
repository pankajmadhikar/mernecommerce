import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PaymentPage from "./pages/PaymentPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ShippingPage from "./pages/ShippingPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";

const App = () => {
  const [mode, setMode] = useState("light");
  const [takeStyle, setTakeStyle] = useState({
    backgroundColor: "#fff",
    color: "black",
  });

  const applyMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(1 13 22)";
      setTakeStyle({
        backgroundColor: "rgb(1, 13, 22)",
        color: "#fff",
      });
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      setTakeStyle({
        backgroundColor: "#fff",
        color: "black",
      });
    }
  };

  return (
    <Router>
      <Navbar mode={mode} applyMode={applyMode} takeStyle={takeStyle} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage mode={mode} applyMode={applyMode} takeStyle={takeStyle} />
          }
          exact
        />
        <Route
          path="/login"
          element={
            <LoginPage
              mode={mode}
              applyMode={applyMode}
              takeStyle={takeStyle}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage
              mode={mode}
              applyMode={applyMode}
              takeStyle={takeStyle}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              mode={mode}
              applyMode={applyMode}
              takeStyle={takeStyle}
            />
          }
        />
        <Route
          path="/shipping"
          element={
            <ShippingPage
              mode={mode}
              applyMode={applyMode}
              takeStyle={takeStyle}
            />
          }
        />
        <Route
          path="/payment"
          element={
            <PaymentPage
              mode={mode}
              applyMode={applyMode}
              takeStyle={takeStyle}
            />
          }
        />
        <Route
          path="/placeorder"
          element={
            <PlaceOrderPage
              mode={mode}
              applyMode={applyMode}
              takeStyle={takeStyle}
            />
          }
        />
        <Route
          path="/order/:id"
          element={
            <OrderPage
              mode={mode}
              applyMode={applyMode}
              takeStyle={takeStyle}
            />
          }
        />
        <Route
          path="/products/productdetailspage/:id"
          element={<ProductDetailsPage takeStyle={takeStyle} />}
        />
        <Route
          path="/cartpage/:id/:qty"
          element={<CartPage mode={mode} takeStyle={takeStyle} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

// import React from "react";
// import MainMarket from "./marketplace app/MainMarket";

// const App = () => {
//   return <MainMarket />;
// };

// export default App;
