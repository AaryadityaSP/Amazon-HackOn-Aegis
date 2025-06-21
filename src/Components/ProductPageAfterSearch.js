import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Avatar,
  Divider,
  IconButton,
  Slider,
  Checkbox,
  FormControlLabel,
  Pagination,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import oneplusbannerimage from "../Assets/images/oneplus banner image.jpg";
import oneplusbannerproduct1 from "../Assets/images/oneplus banner product 1.jpg";
import oneplusbannerproduct2 from "../Assets/images/oneplus banner product 2.jpg";
import boultbannerimage from "../Assets/images/boult banner image.jpg";
import lenevobannerimage from "../Assets/images/lenevo banner image.jpg";
import onepluslogo from "../Assets/images/one plus logo.jpg";
import boultlogo from "../Assets/images/boult logo.jpg";
import lenevologo from "../Assets/images/lenevo logo.jpg";

// Dummy Data
const filters = {
  brands: [
    "OnePlus",
    "Samsung",
    "Xiaomi",
    "Redmi",
    "TheGiftKart",
    "Nillkin",
    "KAPAVER",
  ],
  storage: ["128 GB", "256 GB", "512 GB & above"],
  ram: ["4 to 5.9 GB", "6 to 7.9 GB", "8 to 9.9 GB", "10 GB & Above"],
  // ...Add all filter options as needed
};

const products = [
  {
    id: 1,
    title:
      "OnePlus 13 | Smarter with OnePlus AI | Lifetime Display Warranty (12GB RAM, 256GB Storage Midnight Ocean)",
    image: "/images/oneplus13-blue.jpg",
    price: 69997,
    mrp: 72999,
    deal: "Limited time deal",
    prime: true,
    rating: 4.5,
    reviews: 1244,
    bought: "500+ bought in past month",
    delivery: "FREE delivery Sun, 22 Jun",
    fastDelivery: "Or fastest delivery Tomorrow, 21 Jun",
    variants: [
      { color: "ocean" },
      { color: "arctic-dawn" },
      { color: "black" },
    ],
  },
  // ...Add more products as needed
];

const brandsRelated = [
  {
    brand: "OnePlus",
    image: `${oneplusbannerimage}`,
    logoimage: `${onepluslogo}`,
  },
  { brand: "Boult", image: `${boultbannerimage}`, logoimage: `${boultlogo}` },
  {
    brand: "Lenovo",
    image: `${lenevobannerimage}`,
    logoimage: `${lenevologo}`,
  },
];

function FilterSidebar() {
  return (
    <Box sx={{ width: 250, pr: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Delivery Day
      </Typography>
      <FormControlLabel control={<Checkbox />} label="Get It Today" />
      <FormControlLabel control={<Checkbox />} label="Get It by Tomorrow" />
      <FormControlLabel control={<Checkbox />} label="Get It in 2 Days" />
      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ mb: 1 }}>
        Brands
      </Typography>
      {filters.brands.map((brand) => (
        <FormControlLabel key={brand} control={<Checkbox />} label={brand} />
      ))}
      <Button
        size="small"
        sx={{ color: "#007185", textTransform: "none", pl: 0 }}
      >
        See more
      </Button>
      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ mb: 1 }}>
        Price
      </Typography>
      <Slider
        min={98}
        max={83500}
        valueLabelDisplay="auto"
        sx={{ width: "90%" }}
      />
      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ mb: 1 }}>
        Customer Review
      </Typography>
      {[5, 4, 3, 2].map((star) => (
        <Box key={star} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          {[...Array(star)].map((_, i) => (
            <StarIcon key={i} sx={{ color: "#FFA41C", fontSize: 18 }} />
          ))}
          <Typography sx={{ ml: 0.5, fontSize: 14 }}>& Up</Typography>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ mb: 1 }}>
        Storage Capacity
      </Typography>
      {filters.storage.map((s) => (
        <FormControlLabel key={s} control={<Checkbox />} label={s} />
      ))}
      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ mb: 1 }}>
        RAM Size
      </Typography>
      {filters.ram.map((r) => (
        <FormControlLabel key={r} control={<Checkbox />} label={r} />
      ))}
      {/* ...Add more filters as needed */}
    </Box>
  );
}

function ProductCard({ product }) {
  return (
    <Card sx={{ display: "flex", mb: 3, px: 2, py: 2 }}>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{ width: 160, height: 180, objectFit: "contain", mr: 2 }}
      />
      <CardContent sx={{ flex: 1, py: 0 }}>
        <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
          {product.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <StarIcon sx={{ color: "#FFA41C", fontSize: 18 }} />
          <Typography sx={{ ml: 0.5, fontWeight: 600 }}>
            {product.rating}
          </Typography>
          <Typography sx={{ ml: 1, color: "#007185", fontSize: 14 }}>
            {product.reviews.toLocaleString()} ratings
          </Typography>
        </Box>
        <Typography sx={{ color: "#565959", fontSize: 13, mb: 0.5 }}>
          {product.bought}
        </Typography>
        {product.deal && (
          <Chip
            label={product.deal}
            color="error"
            size="small"
            sx={{ fontWeight: 700, mb: 0.5 }}
          />
        )}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#B12704",
            display: "inline-block",
            mr: 1,
          }}
        >
          ₹{product.price.toLocaleString()}
        </Typography>
        <Typography
          sx={{
            color: "#565959",
            fontSize: 14,
            textDecoration: "line-through",
            display: "inline-block",
          }}
        >
          M.R.P.: ₹{product.mrp.toLocaleString()}
        </Typography>
        {product.prime && (
          <Chip
            label="prime"
            color="primary"
            size="small"
            sx={{ ml: 1, fontWeight: 700 }}
          />
        )}
        <Box sx={{ mt: 1, mb: 0.5 }}>
          <Typography sx={{ fontSize: 14, color: "#111" }}>
            {product.delivery}
          </Typography>
          <Typography sx={{ fontSize: 14, color: "#111" }}>
            {product.fastDelivery}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="warning"
          startIcon={<AddShoppingCartIcon />}
          sx={{
            mt: 1,
            fontWeight: 700,
            borderRadius: 2,
            color: "#111",
            backgroundColor: "#ffd814",
            borderRadius: 5
          }}
        >
          Add to cart
        </Button>
        {/* <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
          {product.variants.map((v, idx) => (
            <Avatar
              key={idx}
              sx={{
                width: 32,
                height: 32,
                border: idx === 0 ? "2px solid #232f3e" : "none",
                backgroundColor: `${v.color}`,
                mx: 0.5,
              }}
            />
          ))}
        </Box> */}
      </CardContent>
    </Card>
  );
}

function BrandsRelated() {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Brands related to your search
        <Typography sx={{ color: "#565959", fontSize: 13, mb: 0.5 }}>
          Sponsored
        </Typography>
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {brandsRelated.map((b, i) => (
          <Card
            key={i}
            sx={{
              width: 370,
              height: 293,
              textAlign: "center",
              justifyItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={b.image}
              alt={b.brand}
              sx={{ width: 370, height: 193, objectFit: "contain", mb: 2 }}
            />
            <CardMedia
              component="img"
              image={b.logoimage}
              alt={b.brand}
              sx={{ width: 139, height: 48, objectFit: "contain" }}
            />
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {b.brand}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default function ProductSearchPage() {
  return (
    <Box
      sx={{ bgcolor: "#fff", minHeight: "100vh", px: { xs: 0, md: 2 }, pt: 2 }}
    >
      {/* Header: Results for "oneplus 13" */}
      <Typography sx={{ fontSize: 16, color: "#565959", mb: 2 }}>
        1-16 of 521 results for{" "}
        <span style={{ color: "#c45500", fontWeight: 600 }}>"oneplus 13"</span>
      </Typography>
      <Grid container spacing={2}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <FilterSidebar />
        </Grid>
        {/* Main Content */}
        <Grid item xs={12} md={9}>
          {/* Sponsored Product Banner */}
          <Card sx={{ mb: 3, display: "flex", alignItems: "center", p: 2 }}>
            <CardMedia
              component="img"
              image={oneplusbannerimage}
              alt="OnePlus 13"
              sx={{ width: 408, height: 214, objectFit: "contain", mr: 2 }}
            />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                OnePlus 13 | Pro. Everywhere.
              </Typography>
              <Typography sx={{ color: "#565959", fontSize: 15, mb: 1 }}>
                Shop OnePlus &nbsp;|&nbsp;{" "}
                <span style={{ color: "#c45500" }}>Everywhere.</span>
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {/* Example variants */}
                <CardMedia
                  component="img"
                  image={oneplusbannerproduct1}
                  sx={{ width: 115, height: 105, objectFit: "contain" }}
                />
                <CardMedia
                  component="img"
                  image={oneplusbannerproduct2}
                  sx={{ width: 115, height: 105, objectFit: "contain" }}
                />
              </Box>
            </Box>
          </Card>
          {/* Results */}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Results
          </Typography>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <Pagination count={20} page={1} color="primary" />
          </Box>
          <Divider sx={{ my: 2 }} />
          {/* Brands Related */}
          <BrandsRelated />
          {/* Need Help */}
          <Box sx={{ my: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Need help?
            </Typography>
            <Typography sx={{ color: "#007185" }}>
              Visit the{" "}
              <a href="#" style={{ color: "#007185" }}>
                help section
              </a>{" "}
              or{" "}
              <a href="#" style={{ color: "#007185" }}>
                contact us
              </a>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
