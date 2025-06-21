import { Card, Typography, Box } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import RemoveItemFromCartAction from "../Actions/RemoveItemFromCartAction";
import UpdateProductAction from "../Actions/UpdateProductAction";

function CartProductCard(props) {
  const { details } = props;
  const dispatch = useDispatch();
  const calcPrice = (val) => Math.floor(val);
  const deleteFromCart = () => {
    dispatch(RemoveItemFromCartAction(details.id, details.quantity));
  };
  return (
    <Card
      sx={{
        minHeight: "35vh",
        boxShadow: "none",
        display: "flex",
        alignItems: "flex-start",
        p: 2,
        mb: 2,
      }}
    >
      <Box
        component="img"
        src={details.image}
        alt={details.title}
        sx={{
          width: { xs: "30%", md: "20%" },
          height: "auto",
          objectFit: "contain",
          mr: 3,
        }}
      />
      <Box sx={{ width: "75%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            mb: 1,
          }}
        >
          <Typography sx={{ fontSize: "1.2rem", width: "90%" }}>
            {details.title}
          </Typography>
          <Typography>₹ {calcPrice(details.price).toLocaleString()}</Typography>
        </Box>
        <Typography sx={{ fontSize: "0.9rem", color: "#00855A", mt: 0.5 }}>
          In stock
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Typography sx={{ fontSize: "0.9rem", color: "#565959", mr: 0.5 }}>
            Gift options not available.
          </Typography>
          <a
            href="https://www.amazon.in/gp/help/customer/display.html?pop-up=1&nodeId=200898020"
            style={{
              fontSize: "0.9rem",
              color: "#007185",
              textDecoration: "none",
            }}
            target="_blank"
            rel="noopener noreferrer"
            onMouseOver={(e) => (e.target.style.color = "#C7511F")}
            onMouseOut={(e) => (e.target.style.color = "#007185")}
          >
            Learn more
          </a>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Typography sx={{ fontWeight: "bold" }}>Quantity: </Typography>
          <select
            style={{
              width: "3rem",
              marginLeft: "1rem",
              height: "2rem",
              outline: "none",
              paddingLeft: "0.5rem",
              cursor: "pointer",
            }}
            onChange={(e) => {
              dispatch(UpdateProductAction(details.id, e.target.value));
            }}
            value={details.quantity}
          >
            {[...Array(9)].map((_, i) => (
              <option value={i + 1} key={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </Box>
        <Typography
          sx={{
            fontSize: "1rem",
            mt: 2,
            color: "#007185",
            cursor: "pointer",
            textDecoration: "none",
            "&:hover": {
              color: "#C7511F",
              textDecoration: "underline",
            },
          }}
          onClick={deleteFromCart}
        >
          Delete item from Cart
        </Typography>
      </Box>
    </Card>
  );
}

export default CartProductCard;
