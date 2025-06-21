import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import amazonLogo from "../Assets/images/amazonLogo.png";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Search } from "@mui/icons-material";
import ReactCountryFlag from "react-country-flag";
import { AiOutlineCaretDown } from "react-icons/ai";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import setUserAction from "../Actions/setUserAction";
import SignedInAction from "../Actions/SignedInAction";

const menuItems = [
  { label: "All", icon: <AiOutlineCaretDown style={{ fontSize: 18 }} /> },
  { label: "Fresh" },
  { label: "MX Player" },
  { label: "Best Sellers" },
  { label: "Mobiles" },
  { label: "Today's Deals" },
  { label: "Customer Service" },
  { label: "Fashion" },
  { label: "Electronics" },
  { label: "Home & Kitchen" },
  { label: "Amazon Pay" },
  { label: "Computers" },
  { label: "Books" },
];

function NavBar(props) {
  const name = useSelector((state) => state.user.displayName);
  const cartCount = useSelector((state) => state.cart.count);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(setUserAction({}));
    dispatch(SignedInAction(false));
  };

  return (
    <Box>
      {/* Top Navbar */}
      <AppBar position="static" sx={{ background: "#131921" }}>
        <Toolbar sx={{ minHeight: 56, display: "flex", alignItems: "center" }}>
          <Link to="/">
            <img
              src={amazonLogo}
              alt="Amazon"
              style={{ width: "7rem", height: "2rem", marginRight: "1rem" }}
            />
          </Link>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
              marginRight: "1rem",
              cursor: "pointer",
            }}
          >
            <HiOutlineLocationMarker size={22} style={{ marginRight: 4 }} />
            <Box>
              <Typography variant="caption" sx={{ color: "#ccc" }}>
                Hello, {name || "Guest"}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Select your address
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              margin: "0 1rem",
            }}
          >
            <select
              style={{
                height: 40,
                border: "none",
                background: "#eee",
                borderRadius: "4px 0 0 4px",
                padding: "0 8px",
              }}
            >
              <option>All</option>
              <option>Mobiles</option>
              <option>Electronics</option>
              <option>Fashion</option>
            </select>
            <input
              type="text"
              placeholder="Search Amazon.in"
              style={{
                height: 40,
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 16,
                padding: "0 8px",
              }}
            />
            <Button
              sx={{
                height: 40,
                minWidth: 40,
                background: "#febd69",
                borderRadius: "0 4px 4px 0",
                "&:hover": { background: "#f3a847" },
              }}
            >
              <Search />
            </Button>
          </Box>
          <Box
            sx={{
              color: "#fff",
              margin: "0 0.5rem",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ReactCountryFlag countryCode="IN" svg style={{ marginRight: 4 }} />
            <AiOutlineCaretDown style={{ fontSize: 12 }} />
          </Box>
          <Box
            sx={{ color: "#fff", margin: "0 0.5rem", textTransform: "none" }}
          >
            <Typography variant="caption" sx={{ color: "#ccc" }}>
              Hello, {name || "Guest"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, cursor: "pointer" }}
              onClick={name ? handleSignOut : undefined}
            >
              {name ? (
                "Sign out"
              ) : (
                <Link
                  to="/Login"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Sign in
                </Link>
              )}
            </Typography>
          </Box>
          <Box
            sx={{ color: "#fff", margin: "0 0.5rem", textTransform: "none" }}
          >
            <Typography variant="caption" sx={{ color: "#ccc" }}>
              Returns
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              & Orders
            </Typography>
          </Box>
          <Link
            to="/Cart"
            style={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              marginLeft: "1rem",
              position: "relative",
              textDecoration: "none",
            }}
          >
            <ShoppingCartOutlinedIcon fontSize="large" />
            <span
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                background: "red",
                color: "#fff",
                borderRadius: "50%",
                width: 18,
                height: 18,
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cartCount}
            </span>
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              Cart
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      {/* Second Row Menu Bar */}
      <Box
        sx={{
          background: "#232f3e",
          minHeight: 40,
          display: "flex",
          alignItems: "center",
          paddingLeft: 2,
        }}
      >
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              marginRight: 18,
              fontSize: 15,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
            }}
          >
            {item.icon && (
              <span style={{ marginRight: 4, fontSize: 20 }}>{item.icon}</span>
            )}
            {item.label}
          </Link>
        ))}
      </Box>
    </Box>
  );
}

export default NavBar;
