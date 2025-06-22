import React, { useState, useEffect } from 'react';
import { CircularProgress, Box, Typography, Chip } from '@mui/material';
import axios from "axios";
import {
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
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
const DESCRIPTION_API = "https://t79ov3wv80.execute-api.ap-south-1.amazonaws.com/prod/check";

// Description Analyzer Component
const DescriptionAnalyzer = ({ description }) => {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (description && description.length > 0) {
      analyzeDescription();
    }
  }, [description]);

  const analyzeDescription = async () => {
    setLoading(true);
    try {
      // Combine description array into single string
      const descriptionText = description.join(' ');
      
      const response = await axios.post(DESCRIPTION_API, {
        text: descriptionText
      });
      
      // Extract score from response
      if (response.data && typeof response.data.score === 'number') {
        setScore(Math.round(response.data.score));
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error("Description analysis error:", err);
      setError('Failed to analyze description');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = () => {
    if (!score) return '#9e9e9e';
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 60) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  };

  return (
    <Box sx={{ mt: 1 }}>
      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CircularProgress size={20} />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Analyzing description quality...
          </Typography>
        </Box>
      )}
      
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      
      {!loading && score !== null && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1, fontWeight: 500 }}>
            Description Quality:
          </Typography>
          <Chip 
            label={`${score}%`} 
            sx={{ 
              backgroundColor: getScoreColor(),
              color: 'white',
              fontWeight: 'bold'
            }} 
          />
        </Box>
      )}
    </Box>
  );
};
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
            {product.rating.rate}
          </Typography>
          <Typography sx={{ ml: 1, color: "#007185", fontSize: 14 }}>
            {product.rating.count} ratings
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
         {/* <DescriptionAnalyzer description={product.description.about} /> */}
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
            borderRadius: 5,
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
            <Link
              to={`/oneplus13/${p.id}`}
              key={p.id}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <ProductCard key={p.id} product={p} />
            </Link>
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
