import React, { useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import ProductCard from "./ProductCard"; // Your provided ProductCard

function HorizontalSection({ title, products }) {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust as needed
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box sx={{ my: 4, px: 2, position: "relative" }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "rgba(255,255,255,0.8)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            width: 40,
            height: 40,
            "&:hover": { background: "#f0f0f0" },
            display: { xs: "none", sm: "flex" },
          }}
        >
          <ArrowBackIos sx={{ color: "#111" }} />
        </IconButton>
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
            pl: 6,
            pr: 6,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {products.map((item) => (
            <Box key={item.id} sx={{ minWidth: 240, maxWidth: 240, mx: 1, flex: "0 0 auto" }}>
              <ProductCard item={item} />
            </Box>
          ))}
        </Box>
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "rgba(255,255,255,0.8)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            width: 40,
            height: 40,
            "&:hover": { background: "#f0f0f0" },
            display: { xs: "none", sm: "flex" },
          }}
        >
          <ArrowForwardIos sx={{ color: "#111" }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default HorizontalSection;
