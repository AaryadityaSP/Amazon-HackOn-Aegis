import React, { useEffect } from "react";
import { Box, Button, Typography, Stack, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { BiChevronLeft, BiRupee } from "react-icons/bi";
import CheckoutButton from "./CheckoutButton";

function AddedToCart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const product = useSelector((state) => state.products[id - 1]);
  const cartItems = useSelector((state) => state.cart.items);
  const quantity = useSelector((state) => state.cart.count);

  const cartTotal = () =>
    Math.floor(
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );

  const calcItemQuantity = () => {
    const item = cartItems.find((i) => i.id === product.id);
    return item ? item.quantity : 0;
  };

  return (
    product && (
      <Box
        sx={{ mt: "10vh", pt: "10vh", minHeight: "70vh", bgcolor: "#F4F4F4" }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="center"
          alignItems="flex-start"
        >
          {/* Product Card */}
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              p: 3,
              width: { xs: "90vw", md: "50vw" },
              minHeight: "50vh",
              alignItems: "center",
              bgcolor: "white",
            }}
          >
            <Box>
              <img
                src={product.image}
                alt={product.title}
                style={{
                  height: "45vh",
                  width: "20vw",
                  objectFit: "contain",
                  background: "#fff",
                }}
              />
            </Box>
            <Box sx={{ ml: 4 }}>
              <Typography
                variant="h5"
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <FaCheckCircle style={{ color: "#53f000", marginRight: 8 }} />
                Added to Cart
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {product.title}
              </Typography>
              <Typography variant="body2">
                Total Quantity: {calcItemQuantity()}
              </Typography>
            </Box>
          </Paper>

          {/* Cart Summary */}
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-around",
              width: { xs: "90vw", md: "27vw" },
              minHeight: "20vh",
              p: 3,
              bgcolor: "white",
            }}
          >
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <b>Cart subtotal:</b>&nbsp;
              <BiRupee style={{ fontSize: "1.2rem" }} />
              {cartTotal().toLocaleString()}
            </Typography>
            <CheckoutButton quantity={quantity} />
            <Link to="/Cart" style={{ textDecoration: "none", width: "100%" }}>
              <Typography
                sx={{
                  width: "100%",
                  mt: 2,
                  p: "0.5rem",
                  borderRadius: "0.3rem",
                  border: "1px solid lightgrey",
                  cursor: "pointer",
                  fontSize: "1rem",
                  textAlign: "center",
                  color: "black",
                  boxShadow: "0.5px 0.5px 2px 0px grey",
                  "&:hover": { bgcolor: "#F7FAFA" },
                }}
              >
                Go to Cart
              </Typography>
            </Link>
          </Paper>
        </Stack>

        {/* Bottom Button */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                color: "#007185",
                fontSize: "1.2rem",
                "&:hover": {
                  bgcolor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              <BiChevronLeft />
              <Typography sx={{ fontSize: "1.1rem", ml: 1 }}>
                See more products
              </Typography>
            </Button>
          </Link>
        </Box>
      </Box>
    )
  );
}

export default AddedToCart;
