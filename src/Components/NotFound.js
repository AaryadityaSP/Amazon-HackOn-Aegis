import React from "react";
import { Typography, Box } from "@mui/material";
import amazonLogo from "../Assets/images/amazonLogoBlack.png";
import { FaRegQuestionCircle } from "react-icons/fa";
import { AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        flexDirection: "column",
        bgcolor: "#fff",
      }}
    >
      <Link to="/">
        <img
          src={amazonLogo}
          alt=""
          style={{ width: "8rem", height: "2.5rem", marginTop: "0.2rem" }}
        />
      </Link>
      <Box
        sx={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FaRegQuestionCircle
          style={{ fontSize: "2.5rem", color: "#CC6600", marginRight: "1rem" }}
        />
        <Box>
          <Typography
            sx={{
              color: "#E47911",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            Looking for something?
          </Typography>
          <Typography sx={{ mt: 1 }}>
            We're sorry. The Web address you entered is not a functioning page on our site.
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              marginTop: "0.5rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <AiFillCaretRight style={{ color: "#CC6600", margin: "0 0.4rem" }} />
            Go to Amazon.in's
            <a
              href="/"
              style={{
                color: "#CC6600",
                margin: "0 0.4rem",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Home
            </a>
            Page
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default NotFound;
