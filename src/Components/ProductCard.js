import { Card, Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";
import StarRatings from "react-star-ratings";

const rupeeCalculate = (val) => Math.floor(val);

const ProductCard = ({ item }) => {
  const [hover, setHover] = useState(false);

  return (
    <Card
      sx={{
        height: "58vh",
        width: { xs: "90vw", sm: "45vw", md: "23vw" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "none",
        marginTop: "2rem",
        borderRadius: "1rem",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        "&:hover": {
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.10)",
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        sx={{
          height: "70%",
          width: "80%",
          marginTop: "0.5rem",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundImage: `url(${item.image})`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
      <Typography
        sx={{
          height: "2rem",
          width: "90%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          marginTop: "0.5rem",
        }}
      >
        {item.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          background: "transparent",
          alignItems: "center",
        }}
      >
        <Typography>₹ {rupeeCalculate(item.price * 79.67)}</Typography>
        <Box
          title={`${item.rating.rate} out of 5`}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <StarRatings
            rating={item.rating.rate}
            starRatedColor="#FFA41C"
            numberOfStars={5}
            name="rating"
            starDimension="1.2rem"
            starSpacing="0.15rem"
          />
          <Typography
            sx={{ marginLeft: "0.5rem", color: "#007185", fontSize: "1rem" }}
          >
            {item.rating.count}
          </Typography>
        </Box>
      </Box>
      <Button
        sx={{
          background: "#FEBD69",
          height: "2rem",
          width: "8rem",
          borderRadius: "0.5rem",
          marginTop: "0.5rem",
          color: "black",
          fontWeight: 500,
          "&:hover": {
            background: "#f3a847",
          },
        }}
      >
        Show Now
      </Button>
    </Card>
  );
};

export default ProductCard;
