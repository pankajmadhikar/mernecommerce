import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartAction";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import giphy from "../assets/giphy.gif";
import "../externalStyle/CartStyle.css";

const CartPage = (props) => {
  const { id, qty } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItem } = cart;
  console.log(cartItem);

  useEffect(() => {
    dispatch(addToCart(id, qty));
  }, [dispatch, id, qty]);
  return (
    <>
      <div className="container mt-3">
        <h4>{cartItem.length} Item Selected</h4>
      </div>
      {cartItem.length ? (
        <div
          className="card_details container"
          style={{
            width: "100%",
            padding: 10,
            // backgroundColor: `${props.mode === "light" ? "#fff" : "black"}`,
            // color: `${props.mode === "dark" ? "#fff" : "black"}`,
          }}>
          <table className="table " style={props.takeStyle}>
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col"> Product Name</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {cartItem.map((e, i) => {
                return (
                  <tr key={i}>
                    <td className="cartImage">
                      <NavLink to={`/products/productdetailspage/${e._id}`}>
                        {" "}
                        <img
                          src={e.image}
                          style={{ width: "80%", height: "100%" }}
                          alt=""
                        />
                      </NavLink>
                    </td>
                    <td className="cartDetails">
                      <div>
                        <p style={{ marginTop: "-5px" }}>{e.category}</p>
                        <p
                          className="cartPrice"
                          style={{ marginBottom: "-3px" }}>
                          $ {e.price}
                        </p>
                        <p>
                          Price : $<del>{e.price + 100}</del>
                        </p>
                        <p id="total">Total : ${e.price * e.quantity} </p>
                      </div>

                      <div className="product_name_right">
                        <div
                          className=" d-flex justify-content-around align-item-center "
                          style={{
                            width: 100,
                            cursor: "pointer",
                            background: "#111",
                            color: "#fff",
                          }}>
                          <span
                            style={{ fontSize: 24 }}
                            // onClick={
                            //   +e.qty <= 1
                            // ? () => dlt(e.id)
                            // : () => remove(e)
                            // }
                          >
                            -
                          </span>
                          <span style={{ fontSize: 22 }}>{e.qty}</span>
                          <span
                            style={{ fontSize: 24 }}
                            // onClick={() => send(e)}
                          >
                            +
                          </span>
                        </div>
                        <p className="cartItemDelete mt-3">
                          <i
                            className="fas fa-trash"
                            // onClick={() => dlt(e.id)}
                          ></i>
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="cartDetails">
            <strong>Total : ${}</strong>
            <button
              style={{
                background: "#111",
                color: "#fff",
                cursor: "pointer",
                padding: "5px 10px",
                borderRadius: "5px",
              }}>
              Proceed to pay
            </button>
          </div>
        </div>
      ) : (
        <div
          className="container card_details d-flex justify-content-center align-items-center "
          style={{
            width: "100%",
            position: "relative",
          }}>
          <i
            className="fas fa-close "
            style={{
              position: "absolute",
              top: 2,
              right: 30,
              fontSize: 23,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}></i>
          Your Cart Is Empty
          <img
            src={giphy}
            className="emptycart_img"
            style={{
              width: "5rem",
              padding: 10,
            }}
          />
        </div>
      )}
    </>
  );
};

export default CartPage;
