import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
} from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";
import HorizontalGallery from "./HorizontalGallery";
import amazonBanner from "../Assets/images/amazonBanner.jpg";
import ac from "../Assets/images/air conditioner.jpg";
import fridge from "../Assets/images/refrigerators.jpg";
import wallpapers from "../Assets/images/wallpapers.jpg";
import hometools from "../Assets/images/home tolls.jpg";
import microwaves from "../Assets/images/microwaves.jpg";
import washingmachine from "../Assets/images/washing machines.jpg";
import cushioncovers from "../Assets/images/cushion.jpg";
import vases from "../Assets/images/vases.jpg";
import homestorage from "../Assets/images/home storage.jpg";
import lighting from "../Assets/images/lighting.jpg";
import ps5 from "../Assets/images/ps5.jpg";
import ps5slim from "../Assets/images/ps5 slim fortnite.jpg";
import ps5controller from "../Assets/images/ps5 controller.jpg";
import cleaningsupplies from "../Assets/images/cleaning supplies.jpg";
import bathroomaccessories from "../Assets/images/bathroom accessories.jpg";
import bannerimage1 from "../Assets/images/bannerimage1.jpg";
import bannerimage2 from "../Assets/images/bannerimage2.jpg";
import bannerimage3 from "../Assets/images/bannerimage3.jpg";
import bannerimage4 from "../Assets/images/bannerimage4.jpg";
import bannerimage5 from "../Assets/images/bannerimage5.jpg";
import bannerimage6 from "../Assets/images/bannerimage6.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

function BannerCarousel() {
  const bannerImages = [
    bannerimage1,
    bannerimage2,
    bannerimage3,
    bannerimage4,
    bannerimage5,
    bannerimage6,
  ];

  return (
    <Box sx={{ width: "100%", position: "relative", overflow: "hidden" }}>
      <Carousel
        navButtonsAlwaysVisible
        interval={4000}
        animation="fade"
        // indicators={true}
        // indicatorIconButtonProps={{
        //   style: {
        //     padding: "8px",
        //     color: "#fff",
        //   },
        // }}
        // activeIndicatorIconButtonProps={{
        //   style: {
        //     color: "#f90",
        //   },
        // }}
        // indicatorContainerProps={{
        //   style: {
        //     position: "absolute",
        //     bottom: 10,
        //     left: 0,
        //     right: 0,
        //     textAlign: "center",
        //     zIndex: 3,
        //   },
        // }}
        NavButton={({ onClick, className, style, next, prev }) => (
          <IconButton
            onClick={onClick}
            className={className}
            style={{
              ...style,
              background: "rgba(255,255,255,0.7)",
              position: "absolute",
              top: "40%", // Yahan 50% ki jagah 40% ya 35% kar dein
              transform: "translateY(-50%)",
              left: prev ? 10 : "auto",
              right: next ? 10 : "auto",
              zIndex: 4,
              width: 48,
              height: 48,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            {prev && <ArrowBackIos sx={{ color: "#111" }} />}
            {next && <ArrowForwardIos sx={{ color: "#111" }} />}
          </IconButton>
        )}
        sx={{
          width: "100%",
          height: "70vh",
          position: "relative",
        }}
      >
        {bannerImages.map((img, idx) => (
          <Box
            key={idx}
            sx={{
              backgroundImage: `url(${img})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "70vh",
              width: "100%",
              paddingTop: "100px",
            }}
          />
        ))}
      </Carousel>
    </Box>
  );
}

const categoryPanels = [
  {
    title: "Appliances for your home | Up to 55% off",
    items: [
      { label: "Air conditioners", img: ac },
      { label: "Refrigerators", img: fridge },
      { label: "Microwaves", img: microwaves },
      { label: "Washing machines", img: washingmachine },
    ],
    link: "/appliances",
  },
  {
    title: "PlayStation 5 Slim & Accessories | No Cost EMI",
    items: [
      { label: "PS5 digital", img: ps5 },
      { label: "PS5 slim", img: ps5slim },
      { label: "Controller", img: ps5controller },
    ],
    link: "/ps5",
  },
  {
    title: "Revamp your home in style | Up to 40% off",
    items: [
      { label: "Cushion covers", img: cushioncovers },
      { label: "Vases", img: vases },
      { label: "Home storage", img: homestorage },
      { label: "Lighting", img: lighting },
    ],
    link: "/home-style",
  },
  {
    title: "Under ₹499 | Home improvement essentials",
    items: [
      { label: "Cleaning supplies", img: cleaningsupplies },
      { label: "Bathroom tools", img: bathroomaccessories },
      { label: "Home tools", img: hometools },
      { label: "Wallpapers", img: wallpapers },
    ],
    link: "/home-improvement",
  },
];

function Home() {
  const data = useSelector((state) => state.products);

  return (
    <Box sx={{ backgroundColor: "#E3E6E6" }}>
      <Box sx={{ mt: 0, pb: "2rem", width: "100%", overflowX: "hidden" }}>
        {/* Banner and Overlapping Panels */}
        <Box sx={{ position: "relative", width: "100%" }}>
          <BannerCarousel />
          <Grid
            container
            spacing={2}
            sx={{
              position: "absolute",
              zIndex: 2,
              left: 0,
              right: 0,
              width: "100%",
              mt: { xs: "-60px", sm: "-80px", md: "-270px" }, // Overlap panels on banner
              pl: 2,
              justifyContent: "center",
            }}
          >
            {categoryPanels.map((panel, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card
                  sx={{
                    minHeight: 280,
                    p: 1,
                    boxShadow: "0 4px 20px 0 rgba(0,0,0,0.10)",
                    borderRadius: 2,
                    bgcolor: "#fff",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {panel.title}
                    </Typography>
                    <Grid container spacing={1}>
                      {panel.items.map((item, i) => (
                        <Grid item xs={6} key={i}>
                          <CardMedia
                            component="img"
                            image={item.img}
                            alt={item.label}
                            sx={{ height: 100, objectFit: "contain", mb: 0.5 }}
                          />
                          <Typography variant="body2" align="center">
                            {item.label}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                    <Button
                      component={Link}
                      to={panel.link}
                      size="small"
                      sx={{ mt: 1, color: "#007185", textTransform: "none" }}
                    >
                      See more
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Spacer to push product grid below overlapping panels */}
        <Box sx={{ height: { xs: 120, sm: 140, md: 180 } }} />

        {/* Horizontal Gallery */}
        <HorizontalGallery />
        {/* Product Grid */}
        <Box sx={{ backgroundColor: "white", mx: 2, borderRadius: 0.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, ml: 4 }}>
            Top Trending Deals for you
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ mt: -5, px: 2 }}>
          {Object.keys(data).map((i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={i}>
              {/* <Link
                to={`/products/${data[i].id}`}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                }}
              > */}
                <ProductCard item={data[i]} />
              {/* </Link> */}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;
