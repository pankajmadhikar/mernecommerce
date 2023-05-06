import React from "react";
import Banner from "../component/Banner";
import Products from "../component/Products";

const HomePage = (props) => {
  return (
    <>
      <div
        style={{
          textAlign: "center",
          padding: "10px 10px",
          background: `${
            props.mode === "light" ? "#F2F2F2" : "rgb(2 19 32 / 79%)"
          }`,
        }}>
        <Banner />
      </div>
      <div className="container my-3">
        <Products mode={props.mode} takeStyle={props.takeStyle} />
      </div>
    </>
  );
};

export default HomePage;
