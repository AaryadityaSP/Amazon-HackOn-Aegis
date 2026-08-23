import React from "react";
import { Typography, Button, Box, Paper, Link as MuiLink } from "@mui/material";
import amazonLogo from "../Assets/images/amazonLogoBlack.png";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import setUserAction from "../Actions/setUserAction";
import SignedInAction from "../Actions/SignedInAction";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDemoLogin = (role, uid, email, name) => {
    // Mock user object
    const user = {
      uid: uid,
      email: email,
      displayName: name,
      role: role // 'customer' or 'seller'
    };
    
    // Save to localStorage for demo persistence
    localStorage.setItem("aegis_user", JSON.stringify(user));
    
    dispatch(setUserAction(user));
    dispatch(SignedInAction(true));
    
    if (role === 'seller') {
      navigate('/sellerdashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", display: "flex", flexDirection: "column", alignItems: "center", pt: 8 }}>
      <Link to="/">
        <img src={amazonLogo} alt="Amazon Logo" style={{ width: "8.2rem", height: "2.6rem", marginBottom: "2rem" }} />
      </Link>
      <Paper
        elevation={3}
        sx={{
          width: "24rem",
          p: 4,
          borderRadius: "0.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Aegis Demo Login</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
          Select a role to quickly log in and test the Hackathon features without needing an account.
        </Typography>

        <Button 
          variant="contained" 
          fullWidth 
          sx={{ mb: 2, bgcolor: '#f0c14b', color: '#111', '&:hover': { bgcolor: '#ddb347' } }}
          onClick={() => handleDemoLogin('customer', 'demo-customer-001', 'customer@aegis-demo.com', 'Aegis Customer')}
        >
          Login as Customer
        </Button>
        
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ mb: 2, bgcolor: '#1976d2', color: '#fff', '&:hover': { bgcolor: '#1565c0' } }}
          onClick={() => handleDemoLogin('seller', 'demo-seller-001', 'seller@aegis-demo.com', 'Aegis Demo Store')}
        >
          Login as Trusted Seller
        </Button>

        <Button 
          variant="contained" 
          fullWidth 
          sx={{ mb: 2, bgcolor: '#d32f2f', color: '#fff', '&:hover': { bgcolor: '#c62828' } }}
          onClick={() => handleDemoLogin('seller', 'demo-bad-seller-001', 'badseller@aegis-demo.com', 'Sketchy Tech')}
        >
          Login as Flagged Seller
        </Button>

        <Button 
          variant="contained" 
          fullWidth 
          sx={{ bgcolor: '#9c27b0', color: '#fff', '&:hover': { bgcolor: '#7b1fa2' } }}
          onClick={() => handleDemoLogin('tester', 'demo-tester-001', 'tester@aegis-demo.com', 'Aegis Tester')}
        >
          Login as Tester (Admin)
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;
