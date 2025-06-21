import React, { useState } from "react";
import { Button, Divider, Typography, Box } from "@mui/material";
import { BiChevronDown, BiChevronRight, BiChevronLeft } from "react-icons/bi";

export const NoCostEmiModal = (props) => {
  const [FAQ, setFAQ] = useState(false);
  const [terms, setTerms] = useState(false);
  const [rotateChevron, setRotateChevron] = useState(false);
  const [rotateChevron2, setRotateChevron2] = useState(false);

  const rotateFAQ = rotateChevron ? "rotate(180deg)" : "rotate(0)";
  const rotateTerms = rotateChevron2 ? "rotate(180deg)" : "rotate(0)";

  const showFAQ = (val) => {
    setFAQ(val);
    setRotateChevron(!rotateChevron);
  };
  const showTerms = (val) => {
    setTerms(val);
    setRotateChevron2(!rotateChevron2);
  };

  return (
    <Box>
      <Box sx={{
        background: "#F5F6F7",
        height: "10.5vh",
        display: "flex",
        alignItems: "center",
        px: "1.5rem",
        justifyContent: "space-between",
        boxShadow: "0 1px 5px 0 #d1d1d1",
        position: "fixed",
        width: { xs: "100vw", md: "38vw" },
        top: 0,
        zIndex: 1200
      }}>
        <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>No Cost EMI</Typography>
        <Button
          sx={{ color: "black", fontSize: "1.5rem", height: "3rem", background: "transparent" }}
          onClick={() => props.toggleDrawer(false)}
        >
          &#10006;
        </Button>
      </Box>
      <Box sx={{ pt: "10.5vh", px: "1.5rem", pb: 2 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "0.9rem" }}>Special Offers</Typography>
        <Typography sx={{ fontSize: "1.15rem", fontWeight: "bold", mt: 2 }}>
          Avail No Cost EMI on select cards for orders above ₹3000
        </Typography>
        <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.4, width: "95%", mt: 1 }}>
          To make this a No Cost EMI offer, interest amount will be discounted from the price of your order. Total amount you pay to the bank (excluding GST) will be equal to the price of the item. Bank may charge you GST only on the interest amount. Certain tenures are available on no cost EMI only on down payment. Please check EMI plans in payments page for more details.
        </Typography>
        <Divider sx={{ mt: 2 }} />
        <Typography
          sx={{
            fontSize: "0.75rem",
            color: "#0a8cc2",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            mt: 2,
            "&:hover": { textDecoration: "underline", color: "#C7511F" }
          }}
          onClick={() => showFAQ(!FAQ)}
        >
          <BiChevronDown style={{ fontSize: "0.7rem", marginRight: "0.1rem", transform: rotateFAQ, transition: "all 0.05s linear" }} />
          FAQs
        </Typography>
        {FAQ && (
          <Box sx={{ mt: 1 }}>
            <ul style={{ margin: 0 }}>
              <li>
                <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold", mt: 1 }}>
                  Is No Cost EMI available on buying more than one product in one order?
                </Typography>
                <Typography sx={{ fontSize: "0.8rem", lineHeight: 1.3 }}>
                  Yes. You can buy any number of products and avail No Cost EMI on products eligible for No Cost EMI. The discount will be calculated only on the eligible items.
                </Typography>
              </li>
              
            </ul>
          </Box>
        )}
        <Typography
          sx={{
            fontSize: "0.75rem",
            color: "#0a8cc2",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            mt: 2,
            "&:hover": { textDecoration: "underline", color: "#C7511F" }
          }}
          onClick={() => showTerms(!terms)}
        >
          <BiChevronDown style={{ fontSize: "0.7rem", marginRight: "0.1rem", transform: rotateTerms, transition: "all 0.05s linear" }} />
          Terms and Conditions
        </Typography>
        {terms && (
          <Box sx={{ mt: 1, pl: 2 }}>
            <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
              Terms and Conditions of Credit Card No Cost EMI
            </Typography>
            <Typography sx={{ fontSize: "0.78rem", lineHeight: 1.4, mt: 1 }}>
              The following terms and conditions apply to no cost equated monthly installment ("EMI") transactions made using a credit card issued by any bank and using EMI facility as a payment option ("No Cost EMI").
            </Typography>
            <ul style={{ paddingLeft: "1.5rem", fontSize: "0.78rem" }}>
              <li>
                The No Cost EMI facility is being offered to the customers who make a purchase transaction on www.amazon.in or the mobile application/ mobile site thereof (collectively, "Amazon.in") using a credit card issued by any bank using EMI facility; if available on Amazon.in.
              </li>
              {/* ...add other terms similarly */}
            </ul>
          </Box>
        )}
      </Box>
    </Box>
  );
}
