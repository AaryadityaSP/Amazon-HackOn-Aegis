import React, { useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import horizontalgalleryclothes1 from "../Assets/images/horizontalgalleryclothes1.jpg";
import horizontalgalleryclothes2 from "../Assets/images/horizontalgalleryclothes2.jpg";
import horizontalgalleryclothes3 from "../Assets/images/horizontalgalleryclothes3.jpg";
import horizontalgalleryclothes4 from "../Assets/images/horizontalgalleryclothes4.jpg";
import horizontalgalleryclothes5 from "../Assets/images/horizontalgalleryclothes5.jpg";
import horizontalgalleryclothes6 from "../Assets/images/horizontalgalleryclothes6.jpg";
import horizontalgalleryclothes7 from "../Assets/images/horizontalgalleryclothes7.jpg";
import horizontalgalleryclothes8 from "../Assets/images/horizontalgalleryclothes8.jpg";
import horizontalgalleryclothes9 from "../Assets/images/horizontalgalleryclothes9.jpg";
import horizontalgalleryclothes10 from "../Assets/images/horizontalgalleryclothes10.jpg";
import horizontalgalleryclothes11 from "../Assets/images/horizontalgalleryclothes11.jpg";
import horizontalgalleryebusiness1 from "../Assets/images/horizontalgalleryebusiness1.jpg"
import horizontalgalleryebusiness2 from "../Assets/images/horizontalgalleryebusiness2.jpg"
import horizontalgalleryebusiness3 from "../Assets/images/horizontalgalleryebusiness3.jpg"
import horizontalgalleryebusiness4 from "../Assets/images/horizontalgalleryebusiness4.jpg"
import horizontalgalleryebusiness5 from "../Assets/images/horizontalgalleryebusiness5.jpg"
import horizontalgalleryebusiness6 from "../Assets/images/horizontalgalleryebusiness6.jpg"
import horizontalgalleryebusiness7 from "../Assets/images/horizontalgalleryebusiness7.jpg"
import horizontalgalleryebusiness8 from "../Assets/images/horizontalgalleryebusiness8.jpg"
import horizontalgalleryebusiness9 from "../Assets/images/horizontalgalleryebusiness9.jpg"
import horizontalgalleryebusiness10 from "../Assets/images/horizontalgalleryebusiness10.jpg"
import horizontalgalleryebusiness11 from "../Assets/images/horizontalgalleryebusiness11.jpg"
const galleryItems1 = [
  {
    title: "horizontalgalleryclothes1",
    img: horizontalgalleryclothes1,
  },
  {
    title: "horizontalgalleryclothes2",
    img: horizontalgalleryclothes2,
  },
  {
    title: "horizontalgalleryclothes3",
    img: horizontalgalleryclothes3,
  },
  {
    title: "horizontalgalleryclothes4",
    img: horizontalgalleryclothes4,
  },
  {
    title: "horizontalgalleryclothes5",
    img: horizontalgalleryclothes5,
  },
  {
    title: "horizontalgalleryclothes6",
    img: horizontalgalleryclothes6,
  },
  {
    title: "horizontalgalleryclothes7",
    img: horizontalgalleryclothes7,
  },
  {
    title: "horizontalgalleryclothes8",
    img: horizontalgalleryclothes8,
  },
  {
    title: "horizontalgalleryclothes9",
    img: horizontalgalleryclothes9,
  },
  {
    title: "horizontalgalleryclothes10",
    img: horizontalgalleryclothes10,
  },
  {
    title: "horizontalgalleryclothes11",
    img: horizontalgalleryclothes11,
  },
];

const galleryItems2 = [
  {
    title: "horizontalgalleryebusiness1",
    img: horizontalgalleryebusiness1,
  },
  {
    title: "horizontalgalleryebusiness2",
    img: horizontalgalleryebusiness2,
  },
  {
    title: "horizontalgalleryebusiness3",
    img: horizontalgalleryebusiness3,
  },
  {
    title: "horizontalgalleryebusiness4",
    img: horizontalgalleryebusiness4,
  },
  {
    title: "horizontalgalleryebusiness5",
    img: horizontalgalleryebusiness5,
  },
  {
    title: "horizontalgalleryebusiness6",
    img: horizontalgalleryebusiness6,
  },
  {
    title: "horizontalgalleryebusiness7",
    img: horizontalgalleryebusiness7,
  },
  {
    title: "horizontalgalleryebusiness8",
    img: horizontalgalleryebusiness8,
  },
  {
    title: "horizontalgalleryebusiness9",
    img: horizontalgalleryebusiness9,
  },
  {
    title: "horizontalgalleryebusiness10",
    img: horizontalgalleryebusiness10,
  },
  {
    title: "horizontalgalleryebusiness11",
    img: horizontalgalleryebusiness11,
  },
];

function HorizontalGallery() {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 320; // Adjust based on card width
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%", my: 4 }}>
      
      <Box sx={{ position: "relative" , backgroundColor:"white", ml:2, mr:2, borderRadius: 2.5}}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0, ml: 2 ,pt:2}}>
          Up to 75% off | Get casual ready from Small Businesses
        </Typography>
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
            width: 48,
            height: 48,
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
            pb: 4,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {galleryItems1.map((item, idx) => (
            <Card
              key={idx}
              sx={{
                minWidth: 150,
                maxWidth: 220,
                mx: 1,
                flex: "0 0 auto",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
                borderRadius: 2,
                bgcolor: "#fff",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
                "&:hover": { boxShadow: "0 4px 16px 0 rgba(0,0,0,0.15)" },
              }}
              component="a"
            >
              <CardMedia
                component="img"
                image={item.img}
                alt={item.title}
                sx={{ height: 140, objectFit: "contain", p: 0 }}
              />
            </Card>
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
            width: 48,
            height: 48,
            "&:hover": { background: "#f0f0f0" },
            display: { xs: "none", sm: "flex" },
          }}
        >
          <ArrowForwardIos sx={{ color: "#111" }} />
        </IconButton>
      </Box>
      
      <Box sx={{ position: "relative" , backgroundColor:"white", ml:2, mr:2, borderRadius: 2.5, mt:4}}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0, ml: 2 ,pt:2}}>
          Up to 60% off | Trending products from Emerging Businesses
        </Typography>
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
            width: 48,
            height: 48,
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
            pb: 4,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {galleryItems2.map((item, idx) => (
            <Card
              key={idx}
              sx={{
                minWidth: 150,
                maxWidth: 220,
                mx: 1,
                flex: "0 0 auto",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
                borderRadius: 2,
                bgcolor: "#fff",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
                "&:hover": { boxShadow: "0 4px 16px 0 rgba(0,0,0,0.15)" },
              }}
              component="a"
            >
              <CardMedia
                component="img"
                image={item.img}
                alt={item.title}
                sx={{ height: 140, objectFit: "contain", p: 0 }}
              />
            </Card>
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
            width: 48,
            height: 48,
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

export default HorizontalGallery;
