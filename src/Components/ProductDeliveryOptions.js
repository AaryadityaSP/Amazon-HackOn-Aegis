import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { BsShieldCheck } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";
import { SiDropbox } from "react-icons/si";
import { Popover } from "react-tiny-popover";
import { MdDangerous } from "react-icons/md";
import { BsCamera } from "react-icons/bs";

function ProductDeliveryOptions() {
  const [isCODPopoverOpen, setIsCODPopoverOpen] = useState(false);
  const [isReturnablePopoverOpen, setIsReturnablePopoverOpen] = useState(false);
  const [isDeliveredPopoverOpen, setIsDeliveredPopoverOpen] = useState(false);
  const [isWarrantyPopoverOpen, setIsWarrantyPopoverOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", margin: "0.5rem 0" }}>
      {/* Cash on Delivery */}
      <Popover
        isOpen={isCODPopoverOpen}
        positions={["bottom", "top"]}
        padding={15}
        reposition={true}
        onClickOutside={() => setIsCODPopoverOpen(false)}
        content={() => (
          <Box
            sx={{
              p: 2,
              bgcolor: "white",
              width: { xs: "90vw", md: "35vw" },
              borderRadius: "0.5rem",
              border: "1px solid grey",
              boxShadow: "0.5px 0.5px 5px 0px grey",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <Typography sx={{ fontSize: "0.95rem", fontWeight: "bold" }}>
                What is Cash on Delivery (Cash/Card)?
              </Typography>
              <Typography
                sx={{
                  color: "black",
                  fontSize: "1rem",
                  height: "3rem",
                  cursor: "pointer",
                }}
                onClick={() => setIsCODPopoverOpen(false)}
              >
                &#10006;
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "0.9rem" }}>
              Cash on Delivery (COD) payment includes both cash as well as Debit
              card/Credit card/Net banking payments at your doorstep.
            </Typography>
          </Box>
        )}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 1rem",
            cursor: "pointer",
          }}
          onClick={() => setIsCODPopoverOpen(!isCODPopoverOpen)}
        >
          <GiTakeMyMoney
            style={{ width: "2rem", height: "2rem", color: "skyblue" }}
          />
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "#007185",
              mt: "0.5rem",
              cursor: "pointer",
              "&:hover": { color: "#C7511F" },
            }}
          >
            Cash on Delivery
          </Typography>
        </Box>
      </Popover>

      {/* Not Returnable */}
      <Popover
        isOpen={isReturnablePopoverOpen}
        positions={["bottom", "top"]}
        padding={15}
        reposition={true}
        onClickOutside={() => setIsReturnablePopoverOpen(false)}
        content={() => (
          <Box
            sx={{
              p: 2,
              bgcolor: "white",
              width: { xs: "90vw", md: "35vw" },
              borderRadius: "0.5rem",
              border: "1px solid grey",
              boxShadow: "0.5px 0.5px 5px 0px grey",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <Typography sx={{ fontSize: "0.95rem", fontWeight: "bold" }}>
                Not Returnable
              </Typography>
              <Typography
                sx={{
                  color: "black",
                  fontSize: "1rem",
                  height: "3rem",
                  cursor: "pointer",
                }}
                onClick={() => setIsReturnablePopoverOpen(false)}
              >
                &#10006;
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "0.9rem" }}>
              This item is non-returnable due to the nature of the product.
            </Typography>
            <Box sx={{ display: "flex", mt: 2, alignItems: "start" }}>
              <Box sx={{ mr: 2, p: "1.5rem 1.2rem", bgcolor: "#F1F2F2" }}>
                <MdDangerous style={{ fontSize: "3.5rem", color: "#414042" }} />
              </Box>
              <Typography sx={{ fontSize: "0.9rem" }}>
                For damaged, defective, wrong or expired item you can request
                for a refund or replacement within 5 days of delivery.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", mt: 2, alignItems: "start" }}>
              <Box sx={{ mr: 2, p: "1.5rem 1.2rem", bgcolor: "#F1F2F2" }}>
                <BsCamera style={{ fontSize: "3.5rem", color: "#414042" }} />
              </Box>
              <Typography sx={{ fontSize: "0.9rem" }}>
                You will need to share the images of the item and its defects
                through Your Orders for a refund or replacement.
              </Typography>
            </Box>
          </Box>
        )}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 1rem",
            cursor: "pointer",
          }}
          onClick={() => setIsReturnablePopoverOpen(!isReturnablePopoverOpen)}
        >
          <SiDropbox
            style={{ width: "2rem", height: "2rem", color: "skyblue" }}
          />
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "#007185",
              mt: "0.5rem",
              cursor: "pointer",
              "&:hover": { color: "#C7511F" },
            }}
          >
            Not Returnable
          </Typography>
        </Box>
      </Popover>

      {/* Amazon Delivered */}
      <Popover
        isOpen={isDeliveredPopoverOpen}
        positions={["bottom", "top"]}
        padding={15}
        reposition={true}
        onClickOutside={() => setIsDeliveredPopoverOpen(false)}
        content={() => (
          <Box
            sx={{
              p: 2,
              bgcolor: "white",
              width: { xs: "90vw", md: "35vw" },
              borderRadius: "0.5rem",
              border: "1px solid grey",
              boxShadow: "0.5px 0.5px 5px 0px grey",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <Typography sx={{ fontSize: "0.95rem", fontWeight: "bold" }}>
                Amazon Delivered
              </Typography>
              <Typography
                sx={{
                  color: "black",
                  fontSize: "1rem",
                  height: "3rem",
                  cursor: "pointer",
                }}
                onClick={() => setIsDeliveredPopoverOpen(false)}
              >
                &#10006;
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "0.9rem" }}>
              Amazon directly manages delivery for this product. Order delivery
              tracking to your doorstep is available.
            </Typography>
          </Box>
        )}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 1rem",
            cursor: "pointer",
          }}
          onClick={() => setIsDeliveredPopoverOpen(!isDeliveredPopoverOpen)}
        >
          <TbTruckDelivery
            style={{ width: "2rem", height: "2rem", color: "skyblue" }}
          />
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "#007185",
              mt: "0.5rem",
              cursor: "pointer",
              "&:hover": { color: "#C7511F" },
            }}
          >
            Amazon Delivered
          </Typography>
        </Box>
      </Popover>

      {/* 1 Year Warranty */}
      <Popover
        isOpen={isWarrantyPopoverOpen}
        positions={["bottom", "top"]}
        padding={15}
        reposition={true}
        onClickOutside={() => setIsWarrantyPopoverOpen(false)}
        content={() => (
          <Box
            sx={{
              p: 2,
              bgcolor: "white",
              width: { xs: "90vw", md: "35vw" },
              borderRadius: "0.5rem",
              border: "1px solid grey",
              boxShadow: "0.5px 0.5px 5px 0px grey",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <Typography sx={{ fontSize: "0.95rem", fontWeight: "bold" }}>
                1 Year Warranty
              </Typography>
              <Typography
                sx={{
                  color: "black",
                  fontSize: "1rem",
                  height: "3rem",
                  cursor: "pointer",
                }}
                onClick={() => setIsWarrantyPopoverOpen(false)}
              >
                &#10006;
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "0.9rem" }}>
              1 year on product
            </Typography>
          </Box>
        )}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 1rem",
            cursor: "pointer",
          }}
          onClick={() => setIsWarrantyPopoverOpen(!isWarrantyPopoverOpen)}
        >
          <BsShieldCheck
            style={{ width: "2rem", height: "2rem", color: "skyblue" }}
          />
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "#007185",
              mt: "0.5rem",
              cursor: "pointer",
              "&:hover": { color: "#C7511F" },
            }}
          >
            1 Year Warranty
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
}

export default ProductDeliveryOptions;
