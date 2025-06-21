import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Divider,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import StarRatings from "react-star-ratings";
import AddBanner1 from "../Assets/images/amazonAddBanner1.jpg";
import AddBanner2 from "../Assets/images/amazonAddBanner2.jpg";
import AddBanner3 from "../Assets/images/amazonAddBanner3.jpg";
import AddBanner4 from "../Assets/images/amazonAddBanner4.jpg";
import ProductDeliveryOptions from "./ProductDeliveryOptions";
import { TbDiscount2 } from "react-icons/tb";
import { BiRupee, BiChevronLeft } from "react-icons/bi";
import Offers from "./Offers";
import AddNewProductToCartAction from "../Actions/AddNewProductToCartAction";
import AddExistingProductToCartAction from "../Actions/AddExistingProductToCartAction";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBackIos, ArrowForwardIos, PlayArrow } from "@mui/icons-material";

// Dummy data for reviews and audio reviews (replace with real data from backend)
const imageReviews = [
  { img: "/images/review1.jpg" },
  { img: "/images/review2.jpg" },
  { img: "/images/review3.jpg" },
  { img: "/images/review4.jpg" },
  { img: "/images/review5.jpg" },
];

const textReviews = [
  {
    name: "REGULAR CUSTOMER",
    date: "10 May 2025",
    rating: 5,
    title: "Feel of fabric NO IRONG NO WRINKLES",
    body: "Recently I had been walking a lot even in scorching sun. I had to stop to change every 3 km (that's my door to door circle) drenched in sweat. I had one supima cotton t shirt which was great. I could walk longer with less sweat. These were randomly chosen in Amazon by searching for supima cotton t shirt. Amazing product. Very light great feel of the fabric I machine washed and tumble dried and absolutely no wrinkles. I just love them.",
    color: "Vintage Indigo",
    size: "XL",
    verified: true,
    images: ["/images/review2.jpg"],
  },
  // Add more reviews as needed
];

const audioReviews = [
  {
    name: "Rahul Verma",
    date: "8 May 2025",
    rating: 5,
    title: "Comfortable and soft",
    audio: "/audio/audio_review1.mp3",
    images: ["/images/review3.jpg"],
    color: "Black",
    size: "L",
    verified: true,
  },
  // Add more audio reviews as needed
];

const bannerImages = [AddBanner1, AddBanner2, AddBanner3, AddBanner4];

function ProductDescription() {
  const { id } = useParams();
  const product = useSelector((state) => state.products[id - 1]);
  const [addBanner, setAddBanner] = useState(AddBanner4);
  const [num, setNum] = useState(0);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const interval = setInterval(() => {
      setNum((prev) => (prev === 3 ? 0 : prev + 1));
      setAddBanner(bannerImages[num]);
    }, 5000);
    return () => clearInterval(interval);
  }, [num]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [itemQuantity, setItemQuantity] = useState(1);
  const [reviewTab, setReviewTab] = useState(0);

  const descriptionArray = (para) => para.split(".");
  const capitalize = (word) => word.charAt(0).toUpperCase() + word.substring(1);
  const rupeeCalculate = (val) => Math.floor(val);

  const addToCart = () => {
    let unique = true;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === product.id) {
        unique = false;
        break;
      }
    }
    unique
      ? dispatch(AddNewProductToCartAction(product, itemQuantity))
      : dispatch(AddExistingProductToCartAction(product.id, itemQuantity));
  };

  return (
    <>
      {product && (
        <Box sx={{ marginTop: "0rem", padding: "1rem" }}>
          {/* Banner */}
          <a
            href="https://www.primevideo.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box
              sx={{
                backgroundImage: `url(${addBanner})`,
                backgroundSize: "100vw 15vh",
                backgroundRepeat: "no-repeat",
                height: "15vh",
              }}
            />
          </a>
          {/* Back to Products */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                fontSize: "1.1rem",
                color: "#007185",
                "&:hover": {
                  background: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              <BiChevronLeft /> <Typography>Back to products</Typography>
            </Button>
          </Link>
          {/* Main Product Section */}
          <Box
            sx={{
              display: "flex",
              marginTop: "2rem",
              justifyContent: "space-between",
              flexWrap: { xs: "wrap", md: "nowrap" },
              gap: 3,
            }}
          >
            {/* Product Image */}
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                height: "60vh",
                width: "22vw",
                objectFit: "contain",
                background: "#fff",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            />
            {/* Product Details */}
            <Box sx={{ flex: 1, minWidth: 320 }}>
              <Typography
                sx={{ fontSize: "1.8rem", fontWeight: "bold", mb: 1 }}
              >
                {product.title}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
              >
                {product.rating && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <StarRatings
                      rating={product.rating.rate}
                      starRatedColor="#FFA41C"
                      numberOfStars={5}
                      name="rating"
                      starDimension="1.2rem"
                      starSpacing="0.15rem"
                    />
                    <Typography
                      sx={{
                        marginLeft: "0.5rem",
                        color: "#007185",
                        fontSize: "1rem",
                      }}
                    >
                      {product.rating.count} ratings
                    </Typography>
                  </Box>
                )}
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: "#232f3e",
                    color: "#fff",
                    fontSize: "0.8rem",
                    ml: 2,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    textTransform: "none",
                  }}
                  disableElevation
                >
                  Amazon's Choice
                </Button>
              </Box>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
                ₹{rupeeCalculate(product.price * 79.67).toLocaleString()}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", mb: 1 }}>
                Inclusive of all taxes
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
              ></Box>

              <Divider sx={{ my: 2 }} />
              {/* Offers */}
              <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  <TbDiscount2
                    style={{
                      color: "#C7511F",
                      fontSize: "1.8rem",
                      marginRight: "1rem",
                      fontWeight: "bolder",
                    }}
                  />
                  Offers
                </Typography>
                <Offers />
              </Box>
              {/* Delivery & Options */}
              <ProductDeliveryOptions />
              <Divider sx={{ my: 2 }} />
              {/* Quantity and Cart */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Typography>Quantity:</Typography>
                <select
                  name="ItemQuantity"
                  id="ItemQuantityId"
                  style={{
                    width: "6rem",
                    height: "2rem",
                    outline: "none",
                    cursor: "pointer",
                  }}
                  onChange={(e) => setItemQuantity(Number(e.target.value))}
                >
                  {[...Array(9)].map((_, idx) => (
                    <option value={idx + 1} key={idx + 1}>
                      {idx + 1}
                    </option>
                  ))}
                </select>
                <Button
                  variant="contained"
                  sx={{
                    background: "#FFD814",
                    color: "black",
                    fontWeight: 600,
                    borderRadius: "0.5rem",
                    ml: 2,
                    "&:hover": { background: "#F7CA00" },
                  }}
                  onClick={addToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    background: "#FFA41C",
                    color: "#232f3e",
                    fontWeight: 600,
                    borderRadius: "0.5rem",
                    ml: 1,
                    "&:hover": { background: "#F7CA00" },
                  }}
                >
                  Buy Now
                </Button>
              </Box>
              <Divider sx={{ my: 2 }} />
              {/* About this item */}
              <Box>
                <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  About this item
                </Typography>
                {descriptionArray(product.description).map((items, i) => {
                  items = items.charAt(0).toUpperCase() + items.substring(1);
                  return (
                    items.length > 2 && (
                      <Typography key={i}>• {items}</Typography>
                    )
                  );
                })}
              </Box>
            </Box>
            {/* Purchase Box */}
            <Box
              sx={{
                minWidth: 280,
                maxWidth: 320,
                bgcolor: "#fff",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignSelf: "flex-start",
              }}
            >
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
                ₹{rupeeCalculate(product.price * 79.67).toLocaleString()}
              </Typography>
              <Typography color="success.main">In stock</Typography>
              <Typography sx={{ fontSize: "0.95rem" }}>
                Ships from Amazon
              </Typography>
              <Typography sx={{ fontSize: "0.95rem" }}>
                Sold by Cocoblu Retail
              </Typography>
              <Button
                variant="contained"
                sx={{
                  background: "#FFD814",
                  color: "black",
                  fontWeight: 600,
                  borderRadius: "0.5rem",
                  "&:hover": { background: "#F7CA00" },
                }}
                onClick={addToCart}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: "#FFA41C",
                  color: "#232f3e",
                  fontWeight: 600,
                  borderRadius: "0.5rem",
                  "&:hover": { background: "#F7CA00" },
                }}
              >
                Buy Now
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#007185",
                  color: "#007185",
                  fontWeight: 600,
                  borderRadius: "0.5rem",
                }}
              >
                Add to Wish List
              </Button>
            </Box>
          </Box>

          {/* Product Details and About */}
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Product details
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography>
                  <b>Material composition:</b> 100% Cotton
                </Typography>
                <Typography>
                  <b>Pattern:</b> Solid
                </Typography>
                <Typography>
                  <b>Fit type:</b> Regular Fit
                </Typography>
                <Typography>
                  <b>Sleeve type:</b> Half Sleeve
                </Typography>
                <Typography>
                  <b>Collar style:</b> Round Collar
                </Typography>
                <Typography>
                  <b>Length:</b> Standard Length
                </Typography>
              </Grid>
              {/* Add more details or columns as needed */}
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              About this item
            </Typography>
            <ul>
              <li>
                Style Number: IM21 | 100% Super Combed Supima Cotton Fabric
              </li>
              <li>Composition: Supima Cotton</li>
              <li>Round Neck</li>
              <li>Label Free for All Day Comfort</li>
              <li>
                Gentle wash 40°C; Do not bleach; Do not wring; Tumble dry low;
                Low iron
              </li>
            </ul>
          </Box>

          {/* Customer Reviews Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Customer reviews
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
              <StarRatings
                rating={4.0}
                starRatedColor="#FFA41C"
                numberOfStars={5}
                name="rating"
                starDimension="1.3rem"
                starSpacing="0.15rem"
              />
              <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
                4.0 out of 5
              </Typography>
              <Typography sx={{ color: "#555" }}>369 global ratings</Typography>
            </Box>
            {/* Ratings breakdown */}
            <Box sx={{ width: 300, mb: 2 }}>
              {[5, 4, 3, 2, 1].map((star, idx) => (
                <Box
                  key={star}
                  sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                >
                  <Typography sx={{ width: 30 }}>{star} star</Typography>
                  <Box
                    sx={{
                      height: 10,
                      width: `${[53, 24, 8, 6, 9][idx]}%`,
                      background: "#FFA41C",
                      borderRadius: 5,
                      mx: 1,
                    }}
                  />
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    {[53, 24, 8, 6, 9][idx]}%
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Tabs for Text/Audio Reviews */}
            <Tabs
              value={reviewTab}
              onChange={(_, newValue) => setReviewTab(newValue)}
              sx={{ mb: 2 }}
            >
              <Tab label="Top text reviews" />
              <Tab label="Top audio reviews" />
            </Tabs>

            {/* Reviews with images */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
              {imageReviews.map((review, idx) => (
                <Avatar
                  key={idx}
                  src={review.img}
                  sx={{ width: 56, height: 56, border: "1px solid #ddd" }}
                  variant="rounded"
                />
              ))}
              <Button
                size="small"
                sx={{ ml: 1, color: "#007185", textTransform: "none" }}
              >
                See all photos
              </Button>
            </Box>

            {/* Review Content */}
            {reviewTab === 0 ? (
              // Text Reviews
              <Box>
                {textReviews.map((review, idx) => (
                  <Card key={idx} sx={{ mb: 2, p: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Avatar sx={{ mr: 1, bgcolor: "#232f3e" }}>
                        {review.name[0]}
                      </Avatar>
                      <Typography sx={{ fontWeight: 600 }}>
                        {review.name}
                      </Typography>
                      <Typography sx={{ ml: 2, color: "#555" }}>
                        Reviewed in India on {review.date}
                      </Typography>
                      {review.verified && (
                        <Typography
                          sx={{
                            ml: 2,
                            bgcolor: "#e7f3e3",
                            color: "#2e7d32",
                            px: 1,
                            borderRadius: 1,
                            fontSize: "0.85rem",
                          }}
                        >
                          Verified Purchase
                        </Typography>
                      )}
                    </Box>
                    <StarRatings
                      rating={review.rating}
                      starRatedColor="#FFA41C"
                      numberOfStars={5}
                      name="rating"
                      starDimension="1.1rem"
                      starSpacing="0.12rem"
                    />
                    <Typography sx={{ fontWeight: 600, mt: 1 }}>
                      {review.title}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>{review.body}</Typography>
                    {review.images && review.images.length > 0 && (
                      <Box sx={{ display: "flex", mt: 1, gap: 1 }}>
                        {review.images.map((img, i) => (
                          <Avatar
                            key={i}
                            src={img}
                            sx={{
                              width: 48,
                              height: 48,
                              border: "1px solid #ddd",
                            }}
                            variant="rounded"
                          />
                        ))}
                      </Box>
                    )}
                  </Card>
                ))}
              </Box>
            ) : (
              // Audio Reviews
              <Box>
                {audioReviews.map((review, idx) => (
                  <Card key={idx} sx={{ mb: 2, p: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Avatar sx={{ mr: 1, bgcolor: "#232f3e" }}>
                        {review.name[0]}
                      </Avatar>
                      <Typography sx={{ fontWeight: 600 }}>
                        {review.name}
                      </Typography>
                      <Typography sx={{ ml: 2, color: "#555" }}>
                        Reviewed in India on {review.date}
                      </Typography>
                      {review.verified && (
                        <Typography
                          sx={{
                            ml: 2,
                            bgcolor: "#e7f3e3",
                            color: "#2e7d32",
                            px: 1,
                            borderRadius: 1,
                            fontSize: "0.85rem",
                          }}
                        >
                          Verified Purchase
                        </Typography>
                      )}
                    </Box>
                    <StarRatings
                      rating={review.rating}
                      starRatedColor="#FFA41C"
                      numberOfStars={5}
                      name="rating"
                      starDimension="1.1rem"
                      starSpacing="0.12rem"
                    />
                    <Typography sx={{ fontWeight: 600, mt: 1 }}>
                      {review.title}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <audio
                        controls
                        src={review.audio}
                        style={{ width: "80%" }}
                      >
                        Your browser does not support the audio element.
                      </audio>
                      <IconButton>
                        <PlayArrow />
                      </IconButton>
                    </Box>
                    {review.images && review.images.length > 0 && (
                      <Box sx={{ display: "flex", mt: 1, gap: 1 }}>
                        {review.images.map((img, i) => (
                          <Avatar
                            key={i}
                            src={img}
                            sx={{
                              width: 48,
                              height: 48,
                              border: "1px solid #ddd",
                            }}
                            variant="rounded"
                          />
                        ))}
                      </Box>
                    )}
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

export default ProductDescription;
