import React from "react";
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
  useTheme,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StarIcon from "@mui/icons-material/Star";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import amazonLogo from "../Assets/images/amazonLogoFooter.png"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Dummy Data
const kpis = [
  { label: "ORDERS", value: 21 },
  { label: "RETURNS", value: 2 },
  { label: "REFUNDS", value: 2 },
  { label: "CASHBACK & OFFERS", value: "Eligible" },
  {
    label: "TRUST SCORE",
    value: (
      <>
        <StarIcon
          sx={{ color: "#FFD700", fontSize: 20, verticalAlign: "middle" }}
        />
        <span style={{ fontWeight: 700, color: "#4caf50" }}> 89</span>
      </>
    ),
  },
  { label: "POLICY", value: "7 Days Return" },
];

const graphData = [
  {
    month: "Jan",
    FakeReviews: 1,
    TrustedReviews: 3,
    HonestReturns: 2,
    FraudReturns: 0,
  },
  {
    month: "Feb",
    FakeReviews: 0,
    TrustedReviews: 4,
    HonestReturns: 1,
    FraudReturns: 1,
  },
  {
    month: "Mar",
    FakeReviews: 2,
    TrustedReviews: 2,
    HonestReturns: 0,
    FraudReturns: 1,
  },
  {
    month: "Apr",
    FakeReviews: 0,
    TrustedReviews: 5,
    HonestReturns: 1,
    FraudReturns: 0,
  },
  {
    month: "May",
    FakeReviews: 1,
    TrustedReviews: 4,
    HonestReturns: 2,
    FraudReturns: 0,
  },
];

// Trust Score Logic Example
const trustScore = 89; // Calculate this in backend
const trustBadge =
  trustScore >= 85
    ? {
        label: "Trusted Customer",
        color: "success",
        icon: <EmojiEventsIcon sx={{ color: "#4caf50" }} />,
      }
    : trustScore >= 60
    ? {
        label: "Regular Customer",
        color: "warning",
        icon: <EmojiEventsIcon sx={{ color: "#FFD700" }} />,
      }
    : {
        label: "Needs Improvement",
        color: "error",
        icon: <EmojiEventsIcon sx={{ color: "#f44336" }} />,
      };

const policy =
  trustScore >= 85
    ? "7 Days Return & Refund"
    : trustScore >= 60
    ? "4 Days Return & Refund"
    : "No Return Policy";

const cashback =
  trustScore >= 85
    ? "Eligible for Special Cashback"
    : trustScore >= 60
    ? "Eligible for Basic Cashback"
    : "No Cashback Benefits";

function CustomerNavBar() {
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
        sx={{ minHeight: 56, px: 0.5, display: "flex", alignItems: "center" }}
      >
        <IconButton edge="start" sx={{ color: "#fff", mr: 1 }}>
          <MenuIcon />
        </IconButton>
        
        <Box
        component="img"
        src={amazonLogo}
        alt="amazon "
        sx={{
            mt: 1,
            height: 25,
            width: "auto",
            mr: 0.5,
            display: { xs: "none", sm: "block" },
        }}
        />
        <Typography
          variant="h6"
          sx={{ color: "#FFD814", fontWeight: 700, mr: 2 }}
        >
          <span style={{ color: "#fff", fontWeight: 400 }}>
            customer console
          </span>
        </Typography>
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
          Your Account
        </Button>
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
              color: "#fff",
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
    </AppBar>
  );
}

export default function CustomerDashboard() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: "#f6fafd",
        minHeight: "100vh",
        fontFamily: "Amazon Ember, Arial, sans-serif",
      }}
    >
      {/* Top Nav */}
      <CustomerNavBar />

      {/* KPI Cards */}
      <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
        {kpis.map((kpi, i) => (
          <Grid item xs={6} sm={3} md={2} key={i}>
            <Card
              sx={{
                p: 2,
                minHeight: 75,
                bgcolor: "#fff",
                boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)",
                borderRadius: 2,
                border: "1px solid #f0f0f0",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#888", fontWeight: 600 }}
              >
                {kpi.label}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#4caf50" }}
              >
                {kpi.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Trust Score Card */}
      <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 3,
              textAlign: "center",
              minHeight: 250,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)",
              border: `2px solid ${
                trustBadge.color === "success"
                  ? "#4caf50"
                  : trustBadge.color === "warning"
                  ? "#FFD700"
                  : "#f44336"
              }`,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Customer Trust Score
            </Typography>
            <Avatar sx={{ bgcolor: "#FFD814", width: 56, height: 56, mb: 1 }}>
              {trustBadge.icon}
            </Avatar>
            <Chip
              label={trustBadge.label}
              color={trustBadge.color}
              sx={{ fontWeight: 700, mb: 1, fontSize: 16 }}
            />
            <Typography variant="h3" sx={{ color: "#4caf50", fontWeight: 700 }}>
              {trustScore}
            </Typography>
            <Typography variant="body2" sx={{ color: "#888", fontWeight: 600 }}>
              {trustBadge.label === "Trusted Customer"
                ? "Eligible for all benefits"
                : trustBadge.label === "Regular Customer"
                ? "Some benefits restricted"
                : "Limited benefits"}
            </Typography>
            <Typography sx={{ mt: 2, fontWeight: 600 }}>{policy}</Typography>
            <Typography sx={{ fontWeight: 600 }}>{cashback}</Typography>
          </Card>
        </Grid>

        {/* Graph and Analytics */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Customer Review & Return History
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontWeight: 600 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="FakeReviews"
                  stroke="#f44336"
                  strokeWidth={3}
                  name="Fake Reviews (Aegis)"
                  dot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="TrustedReviews"
                  stroke="#4caf50"
                  strokeWidth={3}
                  name="Trusted Reviews"
                  dot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="HonestReturns"
                  stroke="#2196f3"
                  strokeWidth={3}
                  name="Honest Returns/Refunds"
                  dot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="FraudReturns"
                  stroke="#ff9800"
                  strokeWidth={3}
                  name="Fraudulent Returns"
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={3}>
                <Card
                  sx={{
                    p: 2,
                    bgcolor: "#fffbe6",
                    borderLeft: "5px solid #FFD814",
                    boxShadow: "none",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#888", fontWeight: 600 }}
                  >
                    Trusted Reviews
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {graphData.reduce((a, b) => a + b.TrustedReviews, 0)}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Card
                  sx={{
                    p: 2,
                    bgcolor: "#fff5f5",
                    borderLeft: "5px solid #f44336",
                    boxShadow: "none",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#888", fontWeight: 600 }}
                  >
                    Fake Reviews (Aegis)
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {graphData.reduce((a, b) => a + b.FakeReviews, 0)}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Card
                  sx={{
                    p: 2,
                    bgcolor: "#e8f5e9",
                    borderLeft: "5px solid #4caf50",
                    boxShadow: "none",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#888", fontWeight: 600 }}
                  >
                    Honest Returns
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {graphData.reduce((a, b) => a + b.HonestReturns, 0)}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Card
                  sx={{
                    p: 2,
                    bgcolor: "#fff8e1",
                    borderLeft: "5px solid #ff9800",
                    boxShadow: "none",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#888", fontWeight: 600 }}
                  >
                    Fraudulent Returns
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {graphData.reduce((a, b) => a + b.FraudReturns, 0)}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
