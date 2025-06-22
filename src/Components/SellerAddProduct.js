import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  InputBase,
  Menu,
  MenuItem,
  TextField,
  CircularProgress
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  CartesianGrid 
} from "recharts";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { getSellerDashboard, getSellerTrackRecord } from "../services/sellerService";
import amazonLogo from "../Assets/images/seller-central_logo-white.svg";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
function SellerNavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLangMenu = (event) => setAnchorEl(event.currentTarget);
  const handleLangClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#03303e",
        minHeight: 56,
        boxShadow: "none",
        borderBottom: "1px solid #1a4249",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 56,
          px: 0.5,
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Menu Icon */}
        <IconButton edge="start" sx={{ color: "#fff", mr: 1 }}>
          <MenuIcon />
        </IconButton>

        {/* Amazon Seller Central Logo */}
        <Box
          component="img"
          src={amazonLogo}
          alt="amazon seller central india"
          sx={{
            height: 32,
            width: "auto",
            mr: 2,
            display: { xs: "none", sm: "block" },
          }}
        />

        {/* Seller Central Text (if no logo image) */}
        {/* <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600, mr: 2 }}>
          amazon <span style={{ fontWeight: 400 }}>seller central</span> <span style={{ fontSize: 12 }}>india</span>
        </Typography> */}

        {/* Your Business Selector */}
        <Button
          variant="contained"
          sx={{
            bgcolor: "#fff",
            color: "#03303e",
            fontWeight: 600,
            borderRadius: 1,
            minWidth: 170,
            height: 34,
            mr: 1.5,
            boxShadow: "none",
            fontSize: 16,
            textTransform: "none",
            px: 2,
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
        >
          Your Business
        </Button>

        {/* Country */}
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 500,
            fontSize: 16,
            ml: 0.5,
            mr: 2,
            minWidth: 36,
          }}
        >
          | India
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            flex: 1,
            maxWidth: 420,
            mx: 2,
            bgcolor: "#0d525d",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            height: 36,
            pl: 2,
            ml: 18,
          }}
        >
          <InputBase
            placeholder="Search"
            sx={{
              color: "white",
              flex: 1,
              fontStyle: "italic",
              fontSize: 16,
              letterSpacing: 0.2,
            }}
          />
          <IconButton
            sx={{
              color: "#fff",
              bgcolor: "#1a4249",
              borderRadius: 1,
              ml: 1,
              width: 36,
              height: 36,
              "&:hover": { bgcolor: "#14505b" },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
        {/* Mail */}
        <IconButton sx={{ color: "#fff", ml: 18 }}>
          <MailOutlineIcon />
        </IconButton>

        {/* Settings */}
        <IconButton sx={{ color: "#fff" }}>
          <SettingsIcon />
        </IconButton>

        {/* Language */}
        <Button
          endIcon={<ArrowDropDownIcon />}
          sx={{
            color: "#fff",
            fontWeight: 500,
            textTransform: "none",
            minWidth: 32,
            fontSize: 16,
          }}
          onClick={handleLangMenu}
        >
          EN
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleLangClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem onClick={handleLangClose}>English (EN)</MenuItem>
          <MenuItem onClick={handleLangClose}>हिन्दी (HI)</MenuItem>
        </Menu>

        {/* Help */}
        <Button
          sx={{
            color: "#fff",
            textTransform: "none",
            fontWeight: 500,
            minWidth: 36,
            fontSize: 16,
          }}
          startIcon={<HelpOutlineIcon />}
        >
          Help
        </Button>
      </Toolbar>
      {/* Optional: Bookmark Bar */}
      <Box
        sx={{
          bgcolor: "#01414d",
          color: "#d1e3e6",
          px: 2,
          py: 0.5,
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #1a4249",
        }}
      >
        <IconButton sx={{ color: "#fff", ml: "30vw" }}>
          <BookmarkBorderIcon />
        </IconButton>
        Add your favourite pages here by clicking this icon in the navigation
        menu.
        <Box sx={{ flex: 1, justifyItems: "center" }} />
        <Button
          sx={{
            color: "#d1e3e6",
            textTransform: "none",
            fontSize: 14,
            minWidth: 36,
          }}
        >
          Hide
        </Button>
      </Box>
    </AppBar>
  );
}


const categories = [
  "Electronics", "Fashion", "Home", "Books", "Beauty", "Other"
];

export default function SellerAddProduct() {
  const [form, setForm] = useState({
    name: "", price: "", description: "", category: "", stock: ""
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
    //   const formData = new FormData();
    //   formData.append('image', image);
    //   formData.append('name', form.name);
    //   formData.append('price', form.price);
    //   formData.append('description', form.description);
    //   formData.append('category', form.category);
    //   formData.append('stock', form.stock);

      // 2. Send data to backend API
    //   const response = await axios.post('http://localhost:5000/api/products', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });

      alert("Product added successfully!");
      navigate("/sellerdashboard");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "#f6fafd", minHeight: "100vh" }}>
      <SellerNavBar />
      <Box sx={{
        maxWidth: 600, mx: "auto", mt: 4, mb: 4, bgcolor: "#fff",
        p: 3, borderRadius: 2, boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)"
      }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Add New Product
        </Typography>
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Processing and saving product...</Typography>
          </Box>
        )}
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                sx={{ bgcolor: "#008296" }}
                disabled={loading}
              >
                Upload Product Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                />
              </Button>
              {imagePreview && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={imagePreview}
                    alt="preview"
                    style={{ 
                      width: 120, 
                      height: 120, 
                      objectFit: "cover", 
                      borderRadius: 6, 
                      border: "1px solid #eee" 
                    }}
                  />
                </Box>
              )}
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Product Name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="price"
                label="Price (₹)"
                type="number"
                value={form.price}
                onChange={handleChange}
                fullWidth
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="stock"
                label="Stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                fullWidth
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="category"
                label="Category"
                value={form.category}
                onChange={handleChange}
                select
                fullWidth
                required
                disabled={loading}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ 
                  bgcolor: "#FFD814", 
                  color: "#111", 
                  fontWeight: 700,
                  '&:disabled': { bgcolor: '#cccccc' }
                }}
                fullWidth
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Add Product'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}