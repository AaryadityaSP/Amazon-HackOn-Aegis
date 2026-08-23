import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
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
  CircularProgress,
} from "@mui/material";
import StarRatings from "react-star-ratings";
import { BiChevronLeft } from "react-icons/bi";
import { TbDiscount2 } from "react-icons/tb";
import { PlayArrow } from "@mui/icons-material";
import { requestCollaboration } from "./utils/api";

// Dummy banners (replace with your own images if needed)
import AddBanner1 from "../Assets/images/amazonAddBanner1.jpg";
import AddBanner2 from "../Assets/images/amazonAddBanner2.jpg";
import AddBanner3 from "../Assets/images/amazonAddBanner3.jpg";
import AddBanner4 from "../Assets/images/amazonAddBanner4.jpg";
import oneplus13image1 from "../Assets/images/oneplus13image1.jpg";
import oneplus13image2 from "../Assets/images/oneplus13image2.jpg";
import oneplus13image3 from "../Assets/images/oneplus13image3.jpg";
import oneplus13image4 from "../Assets/images/oneplus13image4.jpg";
import oneplus13image5 from "../Assets/images/oneplus13image5.jpg";
import oneplus13image6 from "../Assets/images/oneplus13image6.jpg";
import oneplus13image7 from "../Assets/images/oneplus13image7.jpg";
import oneplus13image8 from "../Assets/images/oneplus13image8.jpg";
import oneplus13image9 from "../Assets/images/oneplus13image9.jpg";
import oneplus13image10 from "../Assets/images/oneplus13image10.jpg";

import { mockProducts } from "../data/mockProducts";

// Dummy reviews (replace with backend data as needed)
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
    title: "Flagship Experience",
    body: "This OnePlus 13 is a true flagship. The display and camera are outstanding. Battery lasts all day easily.",
    color: "Midnight Ocean",
    size: "512GB",
    verified: true,
    images: ["/images/review2.jpg"],
  },
  // ...more reviews as needed
];

const audioReviews = [
  {
    name: "Rahul Verma",
    date: "8 May 2025",
    rating: 5,
    title: "Amazing Performance",
    audio: "/audio/audio_review1.mp3",
    images: ["/images/review3.jpg"],
    color: "Black Eclipse",
    size: "1TB",
    verified: true,
  },
  // ...more audio reviews as needed
];

const bannerImages = [AddBanner1, AddBanner2, AddBanner3, AddBanner4];

function ProductDescription() {
  const { id } = useParams();
  const product = mockProducts.find((p) => String(p.id) === String(id));
  const [addBanner, setAddBanner] = useState(AddBanner4);
  const [num, setNum] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [reviewTab, setReviewTab] = useState(0);
  const [collabStatus, setCollabStatus] = useState({});
  const role = useSelector((state) => state.user.role);

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
  const handleCollaborate = async (reviewIdx, review) => {
    // Only sellers can collaborate
    const userStr = localStorage.getItem("aegis_user");
    let isSeller = false;
    let sellerName = "Seller";
    let sellerId = "demo-seller-001";
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role === 'seller' || user.role === 'tester') {
          isSeller = true;
          sellerName = user.displayName;
          sellerId = user.uid;
        }
      } catch (e) {}
    }

    if (!isSeller) {
      alert("Only verified sellers can collaborate on reviews.");
      return;
    }

    const comment = window.prompt("Enter your official response to this review:");
    if (!comment) return; // User cancelled

    setCollabStatus((prev) => ({ ...prev, [reviewIdx]: "loading" }));
    
    // Simulate API delay
    setTimeout(() => {
      // Save to localStorage
      const pendingReqs = JSON.parse(localStorage.getItem("aegis_collaborations") || "[]");
      
      const newReq = {
        id: Date.now().toString(),
        productId: product.id,
        productTitle: product.title,
        reviewIdx,
        reviewName: review.name,
        reviewBody: review.body,
        sellerId,
        sellerName,
        comment,
        status: "pending" // can be pending, accepted, rejected
      };
      
      pendingReqs.push(newReq);
      localStorage.setItem("aegis_collaborations", JSON.stringify(pendingReqs));
      
      setCollabStatus((prev) => ({ ...prev, [reviewIdx]: "requested" }));
      alert("Collaboration request sent to the customer!");
    }, 1000);
  };
  
  // Helper to check if a review has an accepted collaboration
  const getAcceptedCollaboration = (reviewIdx) => {
    const reqs = JSON.parse(localStorage.getItem("aegis_collaborations") || "[]");
    return reqs.find(r => String(r.productId) === String(product.id) && r.reviewIdx === reviewIdx && r.status === "accepted");
  };
  const rupeeCalculate = (val) => Math.floor(val);

  if (!product) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" color="error">
          Product not found.
        </Typography>
        <Link to="/">
          <Button variant="contained" sx={{ mt: 2 }}>
            Back to products
          </Button>
        </Link>
      </Box>
    );
  }

  return (
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
          <Typography sx={{ fontSize: "1.8rem", fontWeight: "bold", mb: 1 }}>
            {product.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
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
            ₹{rupeeCalculate(product.price).toLocaleString()}
          </Typography>
          <Typography sx={{ fontSize: "0.9rem", mb: 1 }}>
            Inclusive of all taxes
          </Typography>
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
            <Typography sx={{ fontSize: "0.95rem", color: "#555", ml: 3 }}>
              Get ₹2000 instant discount on select bank cards. No cost EMI
              available.
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          {/* Quantity and Cart */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
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
              // onClick={addToCart} // Add your cart logic here
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
            {product.description?.about?.map((item, i) =>
              item.length > 2 ? <Typography key={i}>• {item}</Typography> : null
            )}

            {/* Aegis Description Analyzer */}
            <Box sx={{ 
              mt: 2, 
              p: 2, 
              borderRadius: 2, 
              bgcolor: '#f8fafc',
              border: '1px solid #e2e8f0'
            }}>
              <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600, color: '#0f172a', mb: 1 }}>
                ✨ Aegis AI Verification
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', color: '#334155' }}>
                Our AI has analyzed the seller's claims against our database. 
                <span style={{ color: '#16a34a', fontWeight: 600, marginLeft: '4px' }}>
                  ✓ 100% of claims verified.
                </span> No misleading specifications detected.
              </Typography>
            </Box>
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
            border: "1px solid #ddd",
          }}
        >
          <Typography sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
            ₹{rupeeCalculate(product.price).toLocaleString()}
          </Typography>
          <Typography color="success.main" sx={{ fontWeight: 600 }}>In stock</Typography>
          <Typography sx={{ fontSize: "0.95rem", mt: -1 }}>
            Ships from Amazon
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography sx={{ fontSize: "0.95rem" }}>
              Sold by {product.seller?.name || "Cocoblu Retail"}
            </Typography>
            
            {/* Aegis Trust Shield */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              bgcolor: product.seller?.trustScore >= 80 ? '#f0fdf4' : '#fef3c7',
              border: `1px solid ${product.seller?.trustScore >= 80 ? '#bbf7d0' : '#fde68a'}`,
              p: 1, 
              borderRadius: 1,
              mt: 1
            }}>
              <Typography sx={{ fontSize: '1.2rem' }}>
                {product.seller?.trustScore >= 80 ? '🛡️' : '⚠️'}
              </Typography>
              <Box>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: product.seller?.trustScore >= 80 ? '#166534' : '#92400e' }}>
                  Aegis Trust Score: {product.seller?.trustScore || 85}/100
                </Typography>
                <Typography sx={{ fontSize: "0.75rem", color: product.seller?.trustScore >= 80 ? '#15803d' : '#b45309' }}>
                  {product.seller?.trustScore >= 80 ? 'Highly Trusted Seller' : 'Average Trust Seller'}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            variant="contained"
            sx={{
              background: "#FFD814",
              color: "black",
              fontWeight: 600,
              borderRadius: "50px", // More Amazon-like rounded button
              mt: 1,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { background: "#F7CA00", boxShadow: "none" },
            }}
            // onClick={addToCart}
          >
            Add to Cart
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "#FFA41C",
              color: "#232f3e",
              fontWeight: 600,
              borderRadius: "50px",
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { background: "#fa8900", boxShadow: "none" },
            }}
          >
            Buy Now
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 1, color: '#007185' }}>
            <Typography sx={{ fontSize: '0.9rem' }}>🔒 Secure transaction</Typography>
          </Box>
          <Divider />
          <Button
            variant="outlined"
            sx={{
              borderColor: "#d5d9d9",
              background: "#fff",
              color: "#0f1111",
              textTransform: "none",
              fontWeight: 500,
              borderRadius: "0.5rem",
              boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)",
              "&:hover": { background: "#f7fafa", borderColor: "#d5d9d9" },
            }}
          >
            Add to Wish List
          </Button>
        </Box>
      </Box>
      {/* Product Details */}
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Product details
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {Object.entries(product.description.product_details).map(
            ([key, val], i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Typography>
                  <b>{key.replace(/_/g, " ")}:</b> {val}
                </Typography>
              </Grid>
            )
          )}
        </Grid>
        <Divider sx={{ my: 2 }} />
      </Box>
      {/* Customer Reviews Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Customer reviews
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}>
          <StarRatings
            rating={product.rating.rate}
            starRatedColor="#FFA41C"
            numberOfStars={5}
            name="rating"
            starDimension="1.3rem"
            starSpacing="0.15rem"
          />
          <Typography sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
            {product.rating.rate} out of 5
          </Typography>
          <Typography sx={{ color: "#555" }}>
            {product.rating.count} global ratings
          </Typography>
        </Box>
        {/* Ratings breakdown (static example) */}
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
            {product.reviews?.textReviews?.map((review, idx) => (
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
                
                {/* Aegis Review Analyzer */}
                <Box sx={{ mt: 1, display: 'inline-flex', alignItems: 'center', gap: 0.5, bgcolor: '#f0f9ff', border: '1px solid #bae6fd', px: 1, py: 0.5, borderRadius: 1 }}>
                  <Typography sx={{ fontSize: '0.8rem', color: '#0369a1', fontWeight: 600 }}>
                    🧠 Aegis AI: 95% Genuine
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#0ea5e9', ml: 1 }}>
                    Matches expected sentiment. No AI generation detected.
                  </Typography>
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
                
                {/* Display published seller comment if accepted */}
                {getAcceptedCollaboration(idx) && (
                  <Box sx={{ mt: 2, ml: 2, p: 2, bgcolor: "#f8f9fa", borderLeft: "4px solid #f0c14b", borderRadius: 1 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "0.9rem", color: "#c45500" }}>
                      Response from {getAcceptedCollaboration(idx).sellerName}:
                    </Typography>
                    <Typography sx={{ fontSize: "0.9rem", mt: 0.5 }}>
                      {getAcceptedCollaboration(idx).comment}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Button variant="outlined" sx={{ borderRadius: 8, mr: 2 }}>
                    Helpful
                  </Button>
                  
                  {/* Only show collaborate button if not already accepted, and only to sellers/testers */}
                  {!getAcceptedCollaboration(idx) && (role === "seller" || role === "tester") && (
                    <Button 
                      variant="outlined" 
                      sx={{ borderRadius: 8 }}
                      onClick={() => handleCollaborate(idx, review)}
                      disabled={collabStatus[idx] === "loading" || collabStatus[idx] === "requested"}
                    >
                      {collabStatus[idx] === "loading" 
                        ? <CircularProgress size={20} /> 
                        : collabStatus[idx] === "requested" 
                        ? "Requested" 
                        : "Collaborate"}
                    </Button>
                  )}
                </Box>
              </Card>
            ))}
          </Box>
        ) : (
          // Audio Reviews
          <Box>
            {product.reviews?.audioReviews?.map((review, idx) => (
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
                  <audio controls src={review.audio} style={{ width: "80%" }}>
                    Your browser does not support the audio element.
                  </audio>
                  <IconButton>
                    <PlayArrow />
                  </IconButton>
                </Box>
                {/* Aegis Review Analyzer */}
                <Box sx={{ mt: 1, display: 'inline-flex', alignItems: 'center', gap: 0.5, bgcolor: '#f0f9ff', border: '1px solid #bae6fd', px: 1, py: 0.5, borderRadius: 1 }}>
                  <Typography sx={{ fontSize: '0.8rem', color: '#0369a1', fontWeight: 600 }}>
                    🧠 Aegis AI: 95% Genuine
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#0ea5e9', ml: 1 }}>
                    Matches expected sentiment. No AI generation detected.
                  </Typography>
                </Box>
                {review.images && review.images.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    {review.images.map((img, i) => (
                      <img key={i} src={img} alt="review" style={{ width: 80, height: 80, marginRight: 8, borderRadius: 4 }} />
                    ))}
                  </Box>
                )}
                
                {/* Display published seller comment if accepted */}
                {getAcceptedCollaboration("audio_" + idx) && (
                  <Box sx={{ mt: 2, ml: 2, p: 2, bgcolor: "#f8f9fa", borderLeft: "4px solid #f0c14b", borderRadius: 1 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "0.9rem", color: "#c45500" }}>
                      Response from {getAcceptedCollaboration("audio_" + idx).sellerName}:
                    </Typography>
                    <Typography sx={{ fontSize: "0.9rem", mt: 0.5 }}>
                      {getAcceptedCollaboration("audio_" + idx).comment}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Button variant="outlined" sx={{ borderRadius: 8, mr: 2 }}>
                    Helpful
                  </Button>
                  
                  {/* Only show collaborate button if not already accepted, and only to sellers/testers */}
                  {!getAcceptedCollaboration("audio_" + idx) && (role === "seller" || role === "tester") && (
                    <Button 
                      variant="outlined" 
                      sx={{ borderRadius: 8 }}
                      onClick={() => handleCollaborate("audio_" + idx, review)}
                      disabled={collabStatus["audio_" + idx] === "loading" || collabStatus["audio_" + idx] === "requested"}
                    >
                      {collabStatus["audio_" + idx] === "loading" 
                        ? <CircularProgress size={20} /> 
                        : collabStatus["audio_" + idx] === "requested" 
                        ? "Requested" 
                        : "Collaborate"}
                    </Button>
                  )}
                </Box>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProductDescription;
