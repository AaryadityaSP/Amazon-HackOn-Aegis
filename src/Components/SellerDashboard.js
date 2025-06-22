import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
// Static data for info cards
// Info/Action Cards
const infoCards = [
  {
    title: "Deposit Method",
    content:
      "Your deposit method is missing, invalid or not assigned. A valid deposit method that is assigned to the current marketplace is required to use your Selling on Amazon account and receive disbursements.",
    action: (
      <Button variant="contained" color="error" size="small">
        Add or update deposit method
      </Button>
    ),
    color: "#fff5f5",
    border: "#f44336",
    icon: <MailOutlineIcon sx={{ color: "#FFD814" }} />,
  },
  {
    title: "Launch Your Business",
    content:
      "Complete Account Registration to start selling on Amazon India. Please complete pending steps and start selling to millions of customers.",
    action: (
      <Button
        variant="contained"
        sx={{ background: "#FFD814", color: "#111" }}
        size="small"
      >
        Continue Registration
      </Button>
    ),
    color: "#fffbe6",
    border: "#FFD814",
    icon: <HelpOutlineIcon sx={{ color: "#FFD814" }} />,
  },
  {
    title: "News",
    content: (
      <>
        <Typography variant="body2">
          <b>6 JAN, 2025</b> Increase your chance to sell more and save more
          during the Great... <a href="#">Read more</a>
        </Typography>
        <Typography variant="body2">
          <b>5 JAN, 2025</b> Amazon STEP Evaluation for Q4 2024, from October 1
          to December 31, 2024 <a href="#">Read more</a>
        </Typography>
        <Typography variant="body2">
          <b>4 JAN, 2025</b> Tips for success during the Great Republic Day
          Sale, 2025 <a href="#">Read more</a>
        </Typography>
      </>
    ),
    action: null,
    color: "#f6fafd",
    border: "#2196f3",
    icon: null,
  },
  {
    title: "Tutorials and Training",
    content: "Learn how to sell on Amazon",
    action: (
      <Button
        variant="contained"
        sx={{ background: "#008296", color: "#fff" }}
        size="small"
      >
        Visit Seller University
      </Button>
    ),
    color: "#f6fafd",
    border: "#008296",
    icon: null,
  },
  {
    title: "List Globally",
    content:
      "Get help reaching millions of customers by listing internationally.",
    action: (
      <Button
        variant="contained"
        sx={{ background: "#008296", color: "#fff" }}
        size="small"
      >
        Manage International Listings
      </Button>
    ),
    color: "#f6fafd",
    border: "#008296",
    icon: null,
  },
  {
    title: "Seller Forums",
    content: (
      <>
        <Typography variant="body2">
          <b>5 JAN, 2025</b> Amazon STEP Evaluation for Q4 2024, from October 1
          to December 31, 2024 <a href="#">Read more</a>
        </Typography>
      </>
    ),
    action: null,
    color: "#f6fafd",
    border: "#2196f3",
    icon: null,
  },
];

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
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 16 }}>
          <Link to = {"/seller/add-product"}>
        <AddCircleOutlineIcon
          style={{ fontSize: 40, color: "#008296", cursor: "pointer" }}
          titleAccess="Add Product" 
        />
        </Link>
      </div>
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
export default function SellerDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [trackRecordData, setTrackRecordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch both data in parallel
        const [dashboardRes, trackRes] = await Promise.all([
          getSellerDashboard('seller123'),
          getSellerTrackRecord('seller123')
        ]);
        
        setDashboardData(dashboardRes.data);
        setTrackRecordData(trackRes.data);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        bgcolor: '#f6fafd'
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading seller data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        bgcolor: '#f6fafd',
        flexDirection: 'column'
      }}>
        <Typography variant="h6" color="error">Error: {error}</Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  // Check if data exists before rendering
  if (!dashboardData || !trackRecordData) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        bgcolor: '#f6fafd'
      }}>
        <Typography variant="h6">No data available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f6fafd", minHeight: "100vh" }}>
      <SellerNavBar />

      {/* KPIs */}
      <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
        {dashboardData.kpis.map((kpi, i) => (
          <Grid item xs={6} sm={3} md={1.5} key={i}>
            <Card sx={{ 
              p: 2, 
              minHeight: 75, 
              bgcolor: "#fff", 
              boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)",
              borderRadius: 2,
              border: "1px solid #f0f0f0"
            }}>
              <Typography variant="body2" sx={{ color: "#888", fontWeight: 600 }}>
                {kpi.label}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#72bcd4" }}>
                {kpi.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Custom Stats & Graph */}
      <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            p: 3, 
            borderRadius: 2, 
            boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)" 
          }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Seller Track Record
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trackRecordData.graphData}>
                <CartesianGrid stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="StockUnavailable"
                  stroke="#f44336"
                  strokeWidth={2}
                  name="Stock Unavailable"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="Fraud"
                  stroke="#ff9800"
                  strokeWidth={2}
                  name="Fraud Detected"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="GoodReviews"
                  stroke="#4caf50"
                  strokeWidth={2}
                  name="Good Reviews"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={4}>
                <Card sx={{ 
                  p: 2, 
                  bgcolor: "#fffbe6", 
                  borderLeft: "3px solid #FFD814",
                  boxShadow: "none" 
                }}>
                  <Typography variant="body2" sx={{ color: "#888", fontWeight: 600 }}>
                    Stock Unavailable
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {trackRecordData.stats.stockUnavailable} times
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ 
                  p: 2, 
                  bgcolor: "#fff5f5", 
                  borderLeft: "3px solid #f44336",
                  boxShadow: "none" 
                }}>
                  <Typography variant="body2" sx={{ color: "#888", fontWeight: 600 }}>
                    Fraud Detected
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {trackRecordData.stats.fraudDetected} times
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ 
                  p: 2, 
                  bgcolor: "#e8f5e9", 
                  borderLeft: "3px solid #4caf50",
                  boxShadow: "none" 
                }}>
                  <Typography variant="body2" sx={{ color: "#888", fontWeight: 600 }}>
                    Good Reviews
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {trackRecordData.stats.goodReviews} reviews
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        
        {/* Badge Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            p: 3, 
            textAlign: "center", 
            minHeight: 250, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            borderRadius: 2,
            boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)"
          }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Seller Badge
            </Typography>
            <Avatar sx={{ 
              bgcolor: "#FFD814", 
              width: 56, 
              height: 56, 
              mb: 1 
            }}>
              <EmojiEventsIcon sx={{ color: "#fff" }} />
            </Avatar>
            <Chip
              label={dashboardData.badge.name}
              color="warning"
              sx={{ fontWeight: 700, mb: 1, fontSize: 16 }}
            />
            <Typography variant="body2" sx={{ color: "#888", fontWeight: 600 }}>
              {dashboardData.badge.description}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Info/Action Cards */}
      <Grid container spacing={2} sx={{ mt: 2, px: 2, mb: 2 }}>
        {infoCards.map((card, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <Card sx={{ 
              bgcolor: card.color, 
              borderLeft: `4px solid ${card.border}`, 
              minHeight: 200,
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "space-between", 
              p: 2, 
              borderRadius: 2,
              boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)"
            }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  {card.icon && (
                    <Avatar sx={{ 
                      bgcolor: "transparent", 
                      width: 28, 
                      height: 28, 
                      mr: 1,
                      color: card.border
                    }}>
                      {card.icon}
                    </Avatar>
                  )}
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {card.title}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 1, color: "#333" }}>
                  {card.content}
                </Typography>
              </CardContent>
              {card.action}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
