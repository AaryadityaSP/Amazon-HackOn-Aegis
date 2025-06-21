import { Typography, Box } from "@mui/material";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CheckoutButton({ quantity }) {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user);
  const signedIn = useSelector((state) => state.signedIn);

  const handleCheckout = () => {
    axios
      .post(`https://stripe-backend-api-amazon.herokuapp.com/checkout`, {
        cartItems,
        userId: user.uid,
        email: user.email,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const buttonText =
    quantity === 0 ? "Proceed to Buy" : `Proceed to Buy ( ${quantity} items )`;

  const buttonSx = {
    background: "#FFD814",
    boxShadow: "0.5px 0.5px 2px 0.5px #F7CA00",
    width: { xs: "100%", md: "18vw" },
    cursor: "pointer",
    textAlign: "center",
    padding: "0.2rem 0.3rem",
    borderRadius: "0.3rem",
    fontSize: "1rem",
    color: "black",
    marginTop: "1rem",
    "&:hover": {
      background: "#F7CA00",
    },
    transition: "background 0.2s",
  };

  return (
    <>
      {signedIn ? (
        <Typography sx={buttonSx} onClick={handleCheckout}>
          {buttonText}
        </Typography>
      ) : (
        <Link to="/Login" style={{ textDecoration: "none" }}>
          <Typography sx={buttonSx}>{buttonText}</Typography>
        </Link>
      )}
    </>
  );
}

export default CheckoutButton;
