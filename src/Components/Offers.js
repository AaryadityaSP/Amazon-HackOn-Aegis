import { Card, Drawer, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { NoCostEmiModal } from "./OffersModal";

function Offers() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const toggleDrawer = (value) => {
    setDrawerOpen(value);
  };
  const showModal = (value) => {
    setModalType(value);
  };
  return (
    <Box sx={{ display: "flex", margin: "1rem 0" }}>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        transitionDuration={400}
      >
        <Box
          sx={{
            height: "100vh",
            width: { xs: "90vw", md: "38vw" },
            overflowY: "scroll",
          }}
        >
          {modalType === "NoCostEmiModal" && (
            <NoCostEmiModal toggleDrawer={toggleDrawer} />
          )}
          {/* {modalType === "BankOfferModal" && (
            <BankOfferModal toggleDrawer={toggleDrawer} />
          )}
          {modalType === "PartnerOffersModal" && (
            <PartnerOffersModal toggleDrawer={toggleDrawer} />
          )} */}
        </Box>
      </Drawer>
      <Card
        sx={{
          width: { xs: "60vw", sm: "30vw", md: "10vw" },
          height: { xs: "18vh", md: "15vh" },
          p: "0.7rem",
          mr: "0.8rem",
          boxShadow: "0px 0px 3px 2px #D3D3D3",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
          No Cost EMI
        </Typography>
        <Typography
          sx={{
            fontSize: "0.85rem",
            lineHeight: "1.1rem",
            mt: "0.5rem",
            height: "3.7rem",
            letterSpacing: "0.7px",
          }}
        >
          No Cost EMI available on Amazon Pay Later.
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "0.8rem",
            color: "#007185",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
              color: "#C7511F",
            },
          }}
          onClick={() => {
            showModal("NoCostEmiModal");
            toggleDrawer(true);
          }}
        >
          1 offer{" "}
          <AiOutlineRight
            style={{ fontSize: "0.6rem", marginLeft: "0.2rem" }}
          />
        </Typography>
      </Card>
      <Card
        sx={{
          width: { xs: "60vw", sm: "30vw", md: "10vw" },
          height: { xs: "18vh", md: "15vh" },
          p: "0.7rem",
          mr: "0.8rem",
          boxShadow: "0px 0px 3px 2px #D3D3D3",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
          Bank Offer
        </Typography>
        <Typography
          sx={{
            fontSize: "0.85rem",
            lineHeight: "1.1rem",
            mt: "0.5rem",
            height: "3.7rem",
            letterSpacing: "0.7px",
          }}
        >
          5% Instant Discount up to INR 250 on HSBC Cashback Ca...
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "0.8rem",
            color: "#007185",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
              color: "#C7511F",
            },
          }}
        >
          2 offers{" "}
          <AiOutlineRight
            style={{ fontSize: "0.6rem", marginLeft: "0.2rem" }}
          />
        </Typography>
      </Card>
      <Card
        sx={{
          width: { xs: "60vw", sm: "30vw", md: "10vw" },
          height: { xs: "18vh", md: "15vh" },
          p: "0.7rem",
          mr: "0.8rem",
          boxShadow: "0px 0px 3px 2px #D3D3D3",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
          Partner Offer
        </Typography>
        <Typography
          sx={{
            fontSize: "0.85rem",
            lineHeight: "1.1rem",
            mt: "0.5rem",
            height: "3.7rem",
            letterSpacing: "0.7px",
          }}
        >
          Get GST invoice and save up to 28% on business purchases.
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "0.8rem",
            color: "#007185",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
              color: "#C7511F",
            },
          }}
        >
          1 offer{" "}
          <AiOutlineRight
            style={{ fontSize: "0.6rem", marginLeft: "0.2rem" }}
          />
        </Typography>
      </Card>
    </Box>
  );
}

export default Offers;
