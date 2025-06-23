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

const products = [
  {
    id: 1,
    title: "OnePlus 13 (16GB RAM, 512GB) - Midnight Ocean",
    price: 76999,
    mrp: 99999,
    description: {
      about: [
        "Flagship power made smarter with Qualcomm Snapdragon 8 Elite Mobile Platform – the heart that powers the mind of OnePlus AI. With a faster Neural Engine, an improved CPU and GPU, and a big jump in memory bandwidth.",
        "OxygenOS 15 - Experience the power of all-new OnePlus AI. Search smarter, crank up your creativity, and power your productivity for a smoother digital life.",
        "5th-Gen Hasselblad Camera for Mobile combines a flagship 50MP triple camera system – Wide 50MP Sony's LYT-808 with OIS, 3X Triprism Telephoto 50MP and an Ultra-wide 50MP (120° Fov, 1/2.75 sensor size sensor.",
        "The all-new, record-breaking 2K ProXDR Display. Achieving an industry-first DisplayMate A++. Open your eyes to a new level of color accuracy, brightness and color depth.",
        "Durability meets elegance with an IP69 and IP68 rating – The design is forward-looking and future-proof. Experience the industry's highest levels of water and dust resistance wherever your journey takes you.",
        "Ultra-slim OnePlus Silicon NanoStack Battery – Our biggest battery ever, at 6000 mAh. Amp up your power with 100W wired fast charging, delivering up to 100% charge in 36 minutes, 50W wireless fast charging, for up to 50% charge in 34 minutes.",
      ],
      product_details: {
        Brand_Name: "OnePlus",
        Model_Year: "2025",
        Box_Contents:
          "Power Adapter, SIM Tray Ejector, Phone Case, Screen Protector, USB Cable",
        Battery_Capacity: "6000 mAh (Silicon-Carbon)",
        Battery_Charge_Time:
          "36 Minutes (100W Wired), 34 Minutes (50W Wireless)",
        Display:
          "6.82-inch 2K ProXDR AMOLED, 3168 x 1440, 120Hz, DisplayMate A++",
        Processor: "Qualcomm Snapdragon 8 Elite, 3.2 GHz Octa-core",
        RAM: "16GB",
        Storage: "512GB",
        Operating_System: "OxygenOS 15 (Android 15)",
        Camera: "50MP + 50MP + 50MP Hasselblad Triple Rear, 32MP Front",
        Camera_Features:
          "Wide (Sony LYT-808, OIS), 3X Triprism Telephoto, Ultra-wide (120° FOV), Landscape, Macro, Night, Telephoto, Portrait, Automatic",
        Video: "4K Recording",
        SIM: "Dual SIM (Nano), 5G Supported",
        Network: "Unlocked for All Carriers, LTE, USB Type C",
        Water_Resistance: "IP69 & IP68",
        Dimensions: "16.3 x 7.7 x 0.9 cm",
        Weight: "210 grams",
        Security: "Fingerprint Recognition, Face Unlock",
        Headphone_Jack: "3.5 mm",
        Warranty:
          "1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase",
      },
    },
    category: "mobiles",
    image: oneplus13image1,
    rating: {
      rate: 4.7,
      count: 204,
    },
  },
  {
    id: 2,
    title: "OnePlus 13 (16GB RAM, 512GB) - Black Eclipse",
    price: 76999,
    mrp: 99999,
    description: {
      about: [
        "Flagship power made smarter with Qualcomm Snapdragon 8 Elite Mobile Platform and enhanced AI experiences.",
        "OxygenOS 15 for seamless multitasking and advanced AI features.",
        "5th-Gen Hasselblad Camera: 50MP Sony LYT-808 wide, 50MP 3X Triprism telephoto, 50MP ultra-wide (120° FOV).",
        "2K ProXDR Display with DisplayMate A++, ultra-high color accuracy and brightness.",
        "IP69/IP68 rated for top-tier water and dust resistance.",
        "6000 mAh Silicon NanoStack battery, 100W wired and 50W wireless fast charging.",
      ],
      product_details: {
        Brand_Name: "OnePlus",
        Model_Year: "2025",
        Box_Contents: "Power Adapter, SIM Tray Ejector, Case, USB Cable",
        Battery_Capacity: "6000 mAh",
        Battery_Charge_Time: "36 min (wired), 34 min (wireless)",
        Display: "6.82-inch 2K ProXDR AMOLED, 120Hz",
        Processor: "Snapdragon 8 Elite",
        RAM: "16GB",
        Storage: "512GB",
        Operating_System: "OxygenOS 15 (Android 15)",
        Camera: "Triple 50MP Hasselblad Rear, 32MP Front",
        Camera_Features: "OIS, 3X Telephoto, 120° Ultra-wide",
        Video: "4K",
        SIM: "Dual SIM, 5G",
        Network: "Unlocked, USB Type C",
        Water_Resistance: "IP69 & IP68",
        Dimensions: "16.3 x 7.7 x 0.9 cm",
        Weight: "210g",
        Security: "Fingerprint, Face Unlock",
        Headphone_Jack: "No",
        Warranty: "1 year device, 6 months accessories",
      },
    },
    category: "mobiles",
    image: oneplus13image2,
    rating: {
      rate: 4.7,
      count: 153,
    },
  },
  {
    id: 3,
    title: "OnePlus 13 (16GB RAM, 512GB) - Arctic Dawn",
    price: 76999,
    mrp: 99999,
    description: {
      about: [
        "Snapdragon 8 Elite Mobile Platform with advanced OnePlus AI for smarter performance.",
        "OxygenOS 15 delivers a smooth, intelligent software experience.",
        "Triple 50MP Hasselblad camera system with wide, telephoto, and ultra-wide sensors.",
        "2K ProXDR AMOLED display, DisplayMate A++ certified.",
        "IP69/IP68 water and dust resistance for ultimate durability.",
        "6000 mAh battery, 100W wired, 50W wireless fast charging.",
      ],
      product_details: {
        Brand_Name: "OnePlus",
        Model_Year: "2025",
        Box_Contents: "Charger, Case, USB Cable, SIM Tool",
        Battery_Capacity: "6000 mAh",
        Battery_Charge_Time: "36 min (wired), 34 min (wireless)",
        Display: "6.82-inch 2K ProXDR AMOLED, 120Hz",
        Processor: "Snapdragon 8 Elite",
        RAM: "16GB",
        Storage: "512GB",
        Operating_System: "OxygenOS 15",
        Camera: "Triple 50MP Hasselblad, 32MP Front",
        Camera_Features: "OIS, Telephoto, Ultra-wide",
        Video: "4K",
        SIM: "Dual SIM, 5G",
        Network: "Unlocked, USB Type C",
        Water_Resistance: "IP69 & IP68",
        Dimensions: "16.3 x 7.7 x 0.9 cm",
        Weight: "210g",
        Security: "Fingerprint, Face Unlock",
        Headphone_Jack: "No",
        Warranty: "1 year device, 6 months accessories",
      },
    },
    category: "mobiles",
    image: oneplus13image3,
    rating: {
      rate: 4.6,
      count: 142,
    },
  },
  {
    id: 4,
    title: "OnePlus 13 (12GB RAM, 256GB) - Midnight Ocean",
    price: 69999,
    mrp: 99999,
    description: {
      about: [
        "Experience flagship performance with Snapdragon 8 Elite and OnePlus AI.",
        "OxygenOS 15 for smooth, intelligent operation.",
        "Triple 50MP Hasselblad camera system for pro-level photography.",
        "2K ProXDR AMOLED display, DisplayMate A++.",
        "IP69/IP68 rated for best-in-class durability.",
        "6000 mAh battery, 100W wired, 50W wireless fast charging.",
      ],
      product_details: {
        Brand_Name: "OnePlus",
        Model_Year: "2025",
        Box_Contents: "Charger, Case, USB Cable, SIM Tool",
        Battery_Capacity: "6000 mAh",
        Battery_Charge_Time: "36 min (wired), 34 min (wireless)",
        Display: "6.82-inch 2K ProXDR AMOLED, 120Hz",
        Processor: "Snapdragon 8 Elite",
        RAM: "12GB",
        Storage: "256GB",
        Operating_System: "OxygenOS 15",
        Camera: "Triple 50MP Hasselblad, 32MP Front",
        Camera_Features: "OIS, Telephoto, Ultra-wide",
        Video: "4K",
        SIM: "Dual SIM, 5G",
        Network: "Unlocked, USB Type C",
        Water_Resistance: "IP69 & IP68",
        Dimensions: "16.3 x 7.7 x 0.9 cm",
        Weight: "210g",
        Security: "Fingerprint, Face Unlock",
        Headphone_Jack: "No",
        Warranty: "1 year device, 6 months accessories",
      },
    },
    category: "mobiles",
    image: oneplus13image4,
    rating: {
      rate: 4.6,
      count: 100,
    },
  },
  {
    id: 5,
    title: "OnePlus 13 (12GB RAM, 256GB) - Black Eclipse",
    price: 69999,
    mrp: 99999,
    description: {
      about: [
        "Snapdragon 8 Elite Mobile Platform with next-gen OnePlus AI.",
        "OxygenOS 15 for a seamless, creative, and productive experience.",
        "Flagship 50MP Hasselblad triple camera system.",
        "2K ProXDR AMOLED display, DisplayMate A++.",
        "IP69/IP68 water and dust resistance.",
        "6000 mAh battery, 100W wired, 50W wireless fast charging.",
      ],
      product_details: {
        Brand_Name: "OnePlus",
        Model_Year: "2025",
        Box_Contents: "Charger, USB Cable, Case, SIM Tool",
        Battery_Capacity: "6000 mAh",
        Battery_Charge_Time: "36 min (wired), 34 min (wireless)",
        Display: "6.82-inch 2K ProXDR AMOLED, 120Hz",
        Processor: "Snapdragon 8 Elite",
        RAM: "12GB",
        Storage: "256GB",
        Operating_System: "OxygenOS 15",
        Camera: "Triple 50MP Hasselblad, 32MP Front",
        Camera_Features: "OIS, Telephoto, Ultra-wide",
        Video: "4K",
        SIM: "Dual SIM, 5G",
        Network: "Unlocked, USB Type C",
        Water_Resistance: "IP69 & IP68",
        Dimensions: "16.3 x 7.7 x 0.9 cm",
        Weight: "210g",
        Security: "Fingerprint, Face Unlock",
        Headphone_Jack: "No",
        Warranty: "1 year device, 6 months accessories",
      },
    },
    category: "mobiles",
    image: oneplus13image5,
    rating: {
      rate: 4.5,
      count: 168,
    },
  },
  {
    id: 6,
    title: "OnePlus 13 (12GB RAM, 256GB) - Arctic Dawn",
    price: 69999,
    mrp: 99999,
    description: {
      about: [
        "Flagship power with Snapdragon 8 Elite and the latest OnePlus AI.",
        "OxygenOS 15 for a smarter, faster phone experience.",
        "5th-Gen Hasselblad Camera: 50MP triple camera system.",
        "2K ProXDR AMOLED display, DisplayMate A++.",
        "IP69/IP68 water and dust resistance.",
        "6000 mAh battery, 100W wired, 50W wireless fast charging.",
      ],
      product_details: {
        Brand_Name: "OnePlus",
        Model_Year: "2025",
        Box_Contents: "Charger, USB Cable, Case, SIM Tool",
        Battery_Capacity: "6000 mAh",
        Battery_Charge_Time: "36 min (wired), 34 min (wireless)",
        Display: "6.82-inch 2K ProXDR AMOLED, 120Hz",
        Processor: "Snapdragon 8 Elite",
        RAM: "12GB",
        Storage: "256GB",
        Operating_System: "OxygenOS 15",
        Camera: "Triple 50MP Hasselblad, 32MP Front",
        Camera_Features: "OIS, Telephoto, Ultra-wide",
        Video: "4K",
        SIM: "Dual SIM, 5G",
        Network: "Unlocked, USB Type C",
        Water_Resistance: "IP69 & IP68",
        Dimensions: "16.3 x 7.7 x 0.9 cm",
        Weight: "210g",
        Security: "Fingerprint, Face Unlock",
        Headphone_Jack: "No",
        Warranty: "1 year device, 6 months accessories",
      },
    },
    category: "mobiles",
    image: oneplus13image6,
    rating: {
      rate: 4.5,
      count: 132,
    },
  },
  {
    id: 7,
    title: "OnePlus 13 (24GB RAM, 1TB) - Midnight Ocean",
    price: 89999,
    mrp: 99999,
    description: {
      about: [
        "Ultimate flagship: Snapdragon 8 Elite, OnePlus AI, 24GB RAM, 1TB storage.",
        "OxygenOS 15 for next-level productivity and creativity.",
        "Triple 50MP Hasselblad camera system for stunning shots.",
        "2K ProXDR AMOLED display, DisplayMate A++.",
        "IP69/IP68 water and dust resistance.",
        "6000 mAh battery, 100W wired, 50W wireless fast charging.",
      ],
      product_details: {
        Brand_Name: "OnePlus",
        Model_Year: "2025",
        Box_Contents: "Charger, USB Cable, Case, SIM Tool",
        Battery_Capacity: "6000 mAh",
        Battery_Charge_Time: "36 min (wired), 34 min (wireless)",
        Display: "6.82-inch 2K ProXDR AMOLED, 120Hz",
        Processor: "Snapdragon 8 Elite",
        RAM: "24GB",
        Storage: "1TB",
        Operating_System: "OxygenOS 15",
        Camera: "Triple 50MP Hasselblad, 32MP Front",
        Camera_Features: "OIS, Telephoto, Ultra-wide",
        Video: "4K",
        SIM: "Dual SIM, 5G",
        Network: "Unlocked, USB Type C",
        Water_Resistance: "IP69 & IP68",
        Dimensions: "16.3 x 7.7 x 0.9 cm",
        Weight: "210g",
        Security: "Fingerprint, Face Unlock",
        Headphone_Jack: "No",
        Warranty: "1 year device, 6 months accessories",
      },
    },
    category: "mobiles",
    image: oneplus13image7,
    rating: {
      rate: 3.0,
      count: 24,
    },
  },
  {
    id: 8,
    title: "OnePlus 13 (24GB RAM, 1TB) - Black Eclipse",
    price: 89999,
    mrp: 99999,
    description: {
      about: [
        "Snapdragon 8 Elite, OnePlus AI, 24GB RAM, 1TB storage for ultimate performance.",
        "OxygenOS 15 for a seamless, AI-powered experience.",
        "5th-Gen Hasselblad Camera: 50MP triple camera system.",
        "2K ProXDR AMOLED display, DisplayMate A++.",
        "IP69/IP68 water and dust resistance.",
        "6000 mAh battery, 100W wired, 50W wireless fast charging.",
      ],
      product_details: {
        Brand_Name: "OnePlus",
        Model_Year: "2025",
        Box_Contents: "Charger, USB Cable, Case, SIM Tool",
        Battery_Capacity: "6000 mAh",
        Battery_Charge_Time: "36 min (wired), 34 min (wireless)",
        Display: "6.82-inch 2K ProXDR AMOLED, 120Hz",
        Processor: "Snapdragon 8 Elite",
        RAM: "24GB",
        Storage: "1TB",
        Operating_System: "OxygenOS 15",
        Camera: "Triple 50MP Hasselblad, 32MP Front",
        Camera_Features: "OIS, Telephoto, Ultra-wide",
        Video: "4K",
        SIM: "Dual SIM, 5G",
        Network: "Unlocked, USB Type C",
        Water_Resistance: "IP69 & IP68",
        Dimensions: "16.3 x 7.7 x 0.9 cm",
        Weight: "210g",
        Security: "Fingerprint, Face Unlock",
        Headphone_Jack: "No",
        Warranty: "1 year device, 6 months accessories",
      },
    },
    category: "mobiles",
    image: oneplus13image8,
    rating: {
      rate: 3.0,
      count: 20,
    },
  },
  {
    id: 9,
    title: "OnePlus 13 (24GB RAM, 1TB) - Arctic Dawn",
    price: 89999,
    mrp: 99999,
    description: {
      about: [
        "Top-tier Snapdragon 8 Elite, OnePlus AI, 24GB RAM, 1TB storage.",
        "OxygenOS 15 for a next-gen smartphone experience.",
        "Triple 50MP Hasselblad camera system with AI enhancements.",
        "2K ProXDR AMOLED display, DisplayMate A++.",
        "IP69/IP68 water and dust resistance.",
        "6000 mAh battery, 100W wired, 50W wireless fast charging.",
      ],
      product_details: {
        Brand_Name: "OnePlus",
        Model_Year: "2025",
        Box_Contents: "Charger, USB Cable, Case, SIM Tool",
        Battery_Capacity: "6000 mAh",
        Battery_Charge_Time: "36 min (wired), 34 min (wireless)",
        Display: "6.82-inch 2K ProXDR AMOLED, 120Hz",
        Processor: "Snapdragon 8 Elite",
        RAM: "24GB",
        Storage: "1TB",
        Operating_System: "OxygenOS 15",
        Camera: "Triple 50MP Hasselblad, 32MP Front",
        Camera_Features: "OIS, Telephoto, Ultra-wide",
        Video: "4K",
        SIM: "Dual SIM, 5G",
        Network: "Unlocked, USB Type C",
        Water_Resistance: "IP69 & IP68",
        Dimensions: "16.3 x 7.7 x 0.9 cm",
        Weight: "210g",
        Security: "Fingerprint, Face Unlock",
        Headphone_Jack: "No",
        Warranty: "1 year device, 6 months accessories",
      },
    },
    category: "mobiles",
    image: oneplus13image9,
    rating: {
      rate: 2.5,
      count: 17,
    },
  },
  {
    id: 10,
    title: "OnePlus 13 Vegan Leather Edition (16GB RAM, 512GB) - Black Eclipse",
    price: 78999,
    mrp: 99999,
    description: {
      about: [
        "Special Vegan Leather Edition in Black Eclipse with Snapdragon 8 Elite and OnePlus AI.",
        "OxygenOS 15 for a creative, productive, and smooth experience.",
        "Triple 50MP Hasselblad camera system for flagship photography.",
        "2K ProXDR AMOLED display, DisplayMate A++.",
        "IP69/IP68 water and dust resistance.",
        "6000 mAh battery, 100W wired, 50W wireless fast charging.",
      ],
      product_details: {
        Brand_Name: "OnePlus",
        Model_Year: "2025",
        Box_Contents: "Charger, USB Cable, Case, SIM Tool",
        Battery_Capacity: "6000 mAh",
        Battery_Charge_Time: "36 min (wired), 34 min (wireless)",
        Display: "6.82-inch 2K ProXDR AMOLED, 120Hz",
        Processor: "Snapdragon 8 Elite",
        RAM: "16GB",
        Storage: "512GB",
        Operating_System: "OxygenOS 15",
        Camera: "Triple 50MP Hasselblad, 32MP Front",
        Camera_Features: "OIS, Telephoto, Ultra-wide",
        Video: "4K",
        SIM: "Dual SIM, 5G",
        Network: "Unlocked, USB Type C",
        Water_Resistance: "IP69 & IP68",
        Dimensions: "16.3 x 7.7 x 0.9 cm",
        Weight: "210g",
        Security: "Fingerprint, Face Unlock",
        Headphone_Jack: "No",
        Warranty: "1 year device, 6 months accessories",
      },
    },
    category: "mobiles",
    image: oneplus13image10,
    rating: {
      rate: 2.0,
      count: 12,
    },
  },
];

function ProductDescription() {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === String(id));
  const [addBanner, setAddBanner] = useState(AddBanner4);
  const [num, setNum] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [reviewTab, setReviewTab] = useState(0);
  const [collabStatus, setCollabStatus] = useState({});

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
    setCollabStatus((prev) => ({ ...prev, [reviewIdx]: "loading" }));
    try {
      const currentUserId = "Addy"; // Replace with actual logged-in user id if available

      // Use your own logic to get these IDs
      const user_id = currentUserId; // logged-in user
      const collaborator_id = "1122"; // review's author (adjust as per your backend)
      // const product_id = product.id;
      const product_id = "oneplus13";

      const res = await requestCollaboration({
        user_id,
        collaborator_id,
        product_id,
      });
      if (res.status === "pending_approval") {
        setCollabStatus((prev) => ({ ...prev, [reviewIdx]: "requested" }));
      } else if (res.status === "approved" || res.status === "collaborated") {
        setCollabStatus((prev) => ({ ...prev, [reviewIdx]: "collaborated" }));
      } else {
        setCollabStatus((prev) => ({ ...prev, [reviewIdx]: "error" }));
      }
    } catch (err) {
      setCollabStatus((prev) => ({ ...prev, [reviewIdx]: "error" }));
    }
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
            {product.description.about.map((item, i) =>
              item.length > 2 ? <Typography key={i}>• {item}</Typography> : null
            )}
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
            ₹{rupeeCalculate(product.price).toLocaleString()}
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
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mt: 0, ml: 1 }}
                      disabled={
                        collabStatus[idx] === "requested" ||
                        collabStatus[idx] === "collaborated"
                      }
                      onClick={() => handleCollaborate(idx, review)}
                    >
                      {collabStatus[idx] === "requested"
                        ? "Requested"
                        : collabStatus[idx] === "collaborated"
                        ? "Collaborated"
                        : collabStatus[idx] === "loading"
                        ? "Requesting..."
                        : "Collaborate"}
                    </Button>
                    {collabStatus[idx] === "error" && (
                      <Typography
                        color="error"
                        variant="caption"
                        sx={{ ml: 1 }}
                      >
                        Error! Try again.
                      </Typography>
                    )}
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
                  <audio controls src={review.audio} style={{ width: "80%" }}>
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
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mt: 0, ml: 1 }}
                      disabled={
                        collabStatus[idx] === "requested" ||
                        collabStatus[idx] === "collaborated"
                      }
                      onClick={() => handleCollaborate(idx, review)}
                    >
                      {collabStatus[idx] === "requested"
                        ? "Requested"
                        : collabStatus[idx] === "collaborated"
                        ? "Collaborated"
                        : collabStatus[idx] === "loading"
                        ? "Requesting..."
                        : "Collaborate"}
                    </Button>
                    {collabStatus[idx] === "error" && (
                      <Typography
                        color="error"
                        variant="caption"
                        sx={{ ml: 1 }}
                      >
                        Error! Try again.
                      </Typography>
                    )}
                  </Box>
                )}
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProductDescription;
