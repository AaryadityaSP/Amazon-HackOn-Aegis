import { Button, Divider, Typography, Box, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SetCartFromLocalStorageAction from "../Actions/SetCartFromLocalStorageAction";
import { FaCheckCircle } from "react-icons/fa";
import orderPlaced from "../Assets/images/testing.png";

function CheckoutSuccess() {
  const dispatch = useDispatch();
  const signedIn = useSelector((state) => state.signedIn);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify({ items: [], count: 0 }));
    localStorage.setItem("signedIn", JSON.stringify(signedIn));
    dispatch(SetCartFromLocalStorageAction({ items: [], count: 0 }));
  }, [dispatch, signedIn]);

  const deliveryDate = () => {
    let current = new Date();
    current.setDate(current.getDate() + 5);
    const date = current.getDate();
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][current.getMonth()];
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][current.getDay()];
    return `${weekday}, ${date} ${month}`;
  };

  return (
    <Box
      sx={{
        mt: "2.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "white",
        minHeight: "calc(100vh - 2.5rem)",
        p: "1rem 2rem",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          height: { xs: "auto", md: "67%" },
          width: "99%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ebebeb",
          borderRadius: "0.3rem",
          mt: "1.5rem",
          p: "1.3rem",
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            p: "1.5rem",
            borderRadius: "0.3rem",
            boxShadow: "0.5px 0.5px 3px 2px lightgrey",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography
              sx={{
                color: "#0d755e",
                fontSize: "1.2rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaCheckCircle style={{ marginRight: "0.5rem" }} />
              Order placed, thank you!
            </Typography>
            <Typography sx={{ fontSize: "1rem", mt: "0.7rem" }}>
              Confirmation will be sent to your email.
            </Typography>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "1rem", mt: "1rem" }}
            >
              Shipping to {user.displayName}
            </Typography>
            <Divider sx={{ my: "0.7rem", width: "98%" }} />
            <Typography sx={{ color: "green", fontWeight: "bold" }}>
              {deliveryDate()}
            </Typography>
            <Typography>Delivery date</Typography>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "50%" }, ml: { md: 2 } }}>
            <a
              href="https://www.primevideo.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Box
                component="img"
                src={orderPlaced}
                alt=""
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "0.7rem",
                  mt: { xs: 2, md: 0 },
                  cursor: "pointer",
                }}
              />
            </a>
          </Box>
        </Box>
      </Paper>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          sx={{
            background: "gold",
            fontSize: "1.2rem",
            p: "0.5rem 2rem",
            mt: "2rem",
            color: "black",
            borderRadius: "0.3rem",
            "&:hover": { background: "#F7CA00" },
          }}
        >
          Continue Shopping
        </Button>
      </Link>
    </Box>
  );
}

export default CheckoutSuccess;
