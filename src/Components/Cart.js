import React, { useEffect } from "react";
import { Box, Typography, Divider, Paper, Stack, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CartProductCard from "./CartProductCard";
import emptyCart from "../Assets/images/emptyCart.png";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import CheckoutButton from "./CheckoutButton";
import ClearCartAction from "../Actions/ClearCartAction";

function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = useSelector((state) => state.cart.count);
  const dispatch = useDispatch();

  const calcTotal = () =>
    Math.floor(
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );

  const clearCart = () => {
    dispatch(ClearCartAction());
  };

  return (
    <Box
      sx={{
        background: "#EAEDED",
        mt: "4rem",
        display: "flex",
        minHeight: "100vh",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Left Section */}
      <Box sx={{ m: "2rem 1rem", width: { xs: "100%", md: "72%" } }}>
        {cartItems.length === 0 ? (
          <Paper
            elevation={2}
            sx={{
              m: "2rem",
              p: "1rem",
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", md: "80%" },
              minHeight: "40vh",
              bgcolor: "white",
            }}
          >
            <img src={emptyCart} alt="" style={{ height: 120, marginRight: 32 }} />
            <Box>
              <Typography sx={{ fontSize: "2rem", fontWeight: "bold", mb: 2 }}>
                Your Amazon Cart is empty
              </Typography>
              <Link to="/" style={{ textDecoration: "none", color: "#007185" }}>
                <Typography sx={{ fontSize: "1.3rem", mt: 3 }}>
                  Show Products
                </Typography>
              </Link>
            </Box>
          </Paper>
        ) : (
          <Paper elevation={2} sx={{ p: "1rem", bgcolor: "white" }}>
            <Typography sx={{ fontSize: "2rem", mb: 2 }}>Shopping Cart</Typography>
            {cartItems.map((item, i) => (
              <Box key={i}>
                <Divider sx={{ my: "0.7rem", bgcolor: "#DDDDDD", height: "0.1rem" }} />
                <CartProductCard details={item} />
              </Box>
            ))}
            <Box sx={{ textAlign: "end", pr: "1rem" }}>
              <Typography sx={{ fontSize: "1.2rem", mt: 1 }}>
                Subtotal ({cartCount} items) : <b>₹ {calcTotal().toLocaleString()}</b>
              </Typography>
            </Box>
          </Paper>
        )}
        {/* Clear Cart Button */}
        {cartItems.length !== 0 && (
          <Box sx={{ display: "flex", justifyContent: "end", pr: "2rem", pt: "1rem" }}>
            <Typography
              onClick={clearCart}
              sx={{
                fontSize: "1.2rem",
                color: "#007185",
                cursor: "pointer",
                "&:hover": { color: "#C7511F", textDecoration: "underline" },
              }}
            >
              Clear Cart
            </Typography>
          </Box>
        )}
        {/* Footer */}
        <Typography sx={{ fontSize: "0.8rem", mt: "2rem" }}>
          The price and availability of items at Amazon.in are subject to change. The shopping cart is a temporary place to store a list of your items and reflects each item's most recent price. Do you have a promotional code? We'll ask you to enter your claim code when it's time to pay.
        </Typography>
      </Box>

      {/* Right Section */}
      {cartItems.length !== 0 && (
        <Stack spacing={2} sx={{ minWidth: { xs: "100%", md: 350 }, maxWidth: 400 }}>
          <Paper
            elevation={2}
            sx={{
              m: "2rem 1rem 0 0",
              p: "2rem",
              borderRadius: "0.2rem",
              bgcolor: "white",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FaCheckCircle style={{ color: "#067D62", marginRight: "0.5rem" }} />
              <Typography sx={{ color: "#067D62", fontSize: "0.85rem" }}>
                Your order is eligible for FREE Delivery.
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "0.85rem", ml: "1.5rem" }}>
              Select this option at checkout.{" "}
              <a
                href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200904360&pop-up=1"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#007185",
                  transition: "color 0.2s",
                }}
                onMouseOver={e => (e.target.style.color = "#D2511F")}
                onMouseOut={e => (e.target.style.color = "#007185")}
              >
                Details
              </a>
            </Typography>
            <Typography sx={{ fontSize: "1.2rem", mt: 1 }}>
              Subtotal ({cartCount} items) : <b>₹ {calcTotal().toLocaleString()}</b>
            </Typography>
            <CheckoutButton quantity={0} />
          </Paper>
          <Paper
            elevation={2}
            sx={{
              m: "1rem",
              p: "1rem",
              borderRadius: "0.2rem",
              bgcolor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "#007185" }}>
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  background: "#FFD814",
                  p: "0.3rem 3rem",
                  borderRadius: "0.3rem",
                  color: "black",
                  "&:hover": { background: "#F7CA00" },
                }}
              >
                Continue Shopping
              </Typography>
            </Link>
          </Paper>
        </Stack>
      )}
    </Box>
  );
}

export default Cart;
