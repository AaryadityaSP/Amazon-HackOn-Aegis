import React, { useState } from "react";
import { Button, Divider, Typography, Box, Paper } from "@mui/material";
import amazonLogo from "../Assets/images/amazonLogoFooter.png";
import "react-dropdown/style.css";
import { Popover } from "react-tiny-popover";
import { BsGlobe } from "react-icons/bs";
import { TiArrowUnsorted } from "react-icons/ti";

function Footer() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const options = [
    "English - EN",
    "हिन्दी - HI",
    "தமிழ் - TA",
    "తెలుగు - TE",
    "मराठी - MR",
  ];
  const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "#232F3E", minHeight: "80vh" }}>
      {/* Back to top button */}
      <Button
        onClick={scroll}
        sx={{
          width: "100%",
          height: "10%",
          textAlign: "center",
          bgcolor: "#37475A",
          textTransform: "none",
          fontSize: "0.95rem",
          fontWeight: "normal",
          color: "white",
          "&:hover": { bgcolor: "#485769" },
        }}
      >
        Back to top
      </Button>

      {/* Main footer links */}
      <Box
        sx={{
          height: "60%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          px: "7vw",
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        {/* Column 1 */}
        <Box sx={{ width: { xs: "45%", md: "15%" }, my: 2 }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: "1.15rem", color: "white" }}
          >
            Get to Know Us
          </Typography>
          {[
            { label: "About Us", url: "https://www.aboutamazon.in/" },
            { label: "Careers", url: "https://amazon.jobs/" },
            { label: "Press Releases", url: "https://press.aboutamazon.in/" },
            {
              label: "Amazon Cares",
              url: "https://www.amazon.in/gp/browse.html?node=8872558031",
            },
            {
              label: "Gift a Smile",
              url: "https://www.amazon.in/gp/browse.html?node=4594605031",
            },
            { label: "Amazon Science", url: "https://www.amazon.science/" },
          ].map((item) => (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#DDDDDD" }}
              key={item.label}
            >
              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: "0.95rem",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {item.label}
              </Typography>
            </a>
          ))}
        </Box>

        {/* Column 2 */}
        <Box sx={{ width: { xs: "45%", md: "15%" }, my: 2 }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: "1.15rem", color: "white" }}
          >
            Connect with Us
          </Typography>
          {[
            { label: "Facebook", url: "https://www.facebook.com/AmazonIN" },
            { label: "Twitter", url: "https://twitter.com/AmazonIN" },
            {
              label: "Instagram",
              url: "https://www.instagram.com/amazondotin/",
            },
          ].map((item) => (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#DDDDDD" }}
              key={item.label}
            >
              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: "0.95rem",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {item.label}
              </Typography>
            </a>
          ))}
        </Box>

        {/* Column 3 */}
        <Box sx={{ width: { xs: "100%", md: "18%" }, my: 2 }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: "1.15rem", color: "white" }}
          >
            Make Money with Us
          </Typography>
          {[
            {
              label: "Sell on Amazon",
              url: "https://www.amazon.in/b/?node=2838698031",
            },
            {
              label: "Sell under Amazon Accelerator",
              url: "https://www.amazon.in/b/?node=16192220031",
            },
            {
              label: "Amazon Global Selling",
              url: "https://sell.amazon.in/grow-your-business/amazon-global-selling",
            },
            {
              label: "Become an Affiliate",
              url: "https://affiliate-program.amazon.in/",
            },
            {
              label: "Fulfilment by Amazon",
              url: "https://sell.amazon.in/sell-online/fulfillment-by-amazon",
            },
            {
              label: "Advertise Your Products",
              url: "https://advertising.amazon.com/",
            },
            {
              label: "Amazon Pay on Merchants",
              url: "https://www.amazonpay.in/merchant",
            },
          ].map((item) => (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#DDDDDD" }}
              key={item.label}
            >
              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: "0.95rem",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {item.label}
              </Typography>
            </a>
          ))}
        </Box>

        {/* Column 4 */}
        <Box sx={{ width: { xs: "100%", md: "18%" }, my: 2 }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: "1.15rem", color: "white" }}
          >
            Let Us Help You
          </Typography>
          {[
            {
              label: "COVID-19 and Amazon",
              url: "https://www.amazon.in/gp/help/customer/display.html?nodeId=GDFU3JS5AL6SYHRD",
            },
            {
              label: "Your Account",
              url: "https://www.amazon.in/gp/css/homepage.html",
            },
            {
              label: "Returns Centre",
              url: "https://www.amazon.in/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.in%2Fyour-account%3Fref_%3Dnav_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=inflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&",
            },
            {
              label: "100% Purchase Protection",
              url: "https://www.amazon.in/gp/help/customer/display.html?nodeId=201083470",
            },
            {
              label: "Amazon App Download",
              url: "https://www.amazon.in/gp/browse.html?node=6967393031",
            },
            {
              label: "Amazon Assistant Download",
              url: "https://www.amazon.in/gp/BIT/theamazonapp/",
            },
            {
              label: "Help",
              url: "https://www.amazon.in/gp/help/customer/display.html?nodeId=200507590",
            },
          ].map((item) => (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#DDDDDD" }}
              key={item.label}
            >
              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: "0.95rem",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {item.label}
              </Typography>
            </a>
          ))}
        </Box>
      </Box>

      {/* Divider */}
      <Divider sx={{ bgcolor: "#3A4553" }} />

      {/* Lower Footer */}
      <Box
        sx={{
          mt: "1%",
          minHeight: "25%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo and Language Popover */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "1.5rem",
          }}
        >
          <img
            src={amazonLogo}
            alt=""
            style={{ height: "2rem", width: "5rem", marginRight: "4rem" }}
          />
          <Popover
            isOpen={isPopoverOpen}
            positions={["bottom", "top"]}
            padding={15}
            reposition={true}
            onClickOutside={() => setIsPopoverOpen(false)}
            content={() => (
              <Box
                sx={{
                  p: 2,
                  bgcolor: "white",
                  width: "12vw",
                  borderRadius: "0.5rem",
                  border: "1px solid grey",
                  boxShadow: "0.5px 0.5px 5px 0px grey",
                }}
              >
                {options.map((option) => (
                  <Box sx={{ display: "flex", m: 1 }} key={option}>
                    <input type="radio" style={{ marginRight: 8 }} />
                    <Typography
                      sx={{
                        color: "#444444",
                        fontSize: "0.9rem",
                        "&:hover": {
                          color: "#C7511F",
                          textDecoration: "underline",
                          cursor: "pointer",
                        },
                      }}
                    >
                      {option}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                m: "0 2rem",
                cursor: "pointer",
                height: "2rem",
                width: "8rem",
                fontSize: "0.9rem",
                color: "#DDDDDD",
                border: "1px solid #848688",
                borderRadius: "0.3rem",
              }}
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              <BsGlobe />
              <Typography sx={{ fontSize: "0.9rem", color: "#DDDDDD", ml: 1 }}>
                English
              </Typography>
              <TiArrowUnsorted />
            </Box>
          </Popover>
        </Box>

        {/* Country Links */}
        <Box sx={{ width: "80%", mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              mt: 2,
            }}
          >
            {[
              { label: "Australia", url: "https://www.amazon.com.au/" },
              { label: "Brazil", url: "https://www.amazon.com.br/" },
              { label: "Canada", url: "https://www.amazon.ca/" },
              { label: "China", url: "https://www.amazon.cn/" },
              { label: "France", url: "https://www.amazon.fr" },
              { label: "Germany", url: "https://www.amazon.de" },
              { label: "Italy", url: "https://www.amazon.it" },
              { label: "Japan", url: "https://www.amazon.co.jp" },
              { label: "Mexico", url: "https://www.amazon.com.mx" },
              { label: "Netherlands", url: "https://www.amazon.nl" },
              { label: "Poland", url: "https://www.amazon.pl" },
              { label: "Singapore", url: "https://www.amazon.sg" },
              { label: "Spain", url: "https://www.amazon.es" },
              { label: "Turkey", url: "https://www.amazon.com.tr" },
              { label: "United Arab Emirates", url: "https://www.amazon.ae" },
              { label: "United Kingdom", url: "https://www.amazon.co.uk" },
              { label: "United States", url: "https://www.amazon.com" },
            ].map((item) => (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#DDDDDD" }}
                key={item.label}
              >
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    ml: 1,
                    width: item.label.length > 10 ? "8rem" : "6rem",
                    mt:
                      item.label === "United Kingdom" ||
                      item.label === "United States"
                        ? "-1rem"
                        : 0,
                  }}
                >
                  {item.label}
                </Typography>
              </a>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
