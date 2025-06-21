import React, { useState } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Box,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { sendEmailVerification } from "firebase/auth";
import SignedInAction from "../Actions/SignedInAction";
import amazonLogo from "../Assets/images/amazonLogoBlack.png";
import setUserAction from "../Actions/setUserAction";

function SignUp() {
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const createNewAccount = (e) => {
    e.preventDefault();
    var form = document.getElementById("form");
    var nameCheck = document.getElementById("name");
    var emailCheck = document.getElementById("email");
    var passwordCheck = document.getElementById("password");

    if (form.checkValidity()) {
      auth
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          var user = auth.currentUser;
          user
            .updateProfile({
              displayName: username,
            })
            .then(() => {
              sendEmailVerification(auth.currentUser).then(() => {
                dispatch(SignedInAction(true));
                dispatch(setUserAction(user));
                navigate(-2);
              });
            })
            .catch((e) => {
              alert(e.message);
            });
        })
        .catch((e) => {
          var index = e.message.search("characters");
          index === -1
            ? setError(e.message + "\n\n Please sign in with this email.")
            : setError(e.message + "\n\n Please try stronger password");
          setOpen(true);
        });
    } else {
      !passwordCheck.checkValidity() &&
        setError("Please enter the password to continue");
      !emailCheck.checkValidity() &&
        setError("Please enter valid email address");
      !nameCheck.checkValidity() &&
        setError("Please enter display name to continue ");
      !emailCheck.checkValidity() &&
        !passwordCheck.checkValidity() &&
        !nameCheck.checkValidity() &&
        setError("Please enter all the fields to continue");
      setOpen(true);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
      <Box
        sx={{
          py: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <img
            src={amazonLogo}
            alt=""
            style={{ width: "8.2rem", height: "2.6rem" }}
          />
        </Link>
        <Paper
          elevation={2}
          sx={{
            height: "23.5rem",
            width: "19rem",
            m: 2,
            p: "1rem 2rem",
            border: "0.1rem solid rgba(148, 148, 148, 0.5)",
            borderRadius: "0.3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "2rem", mb: 2 }}>Sign up</Typography>
          <form id="form" style={{ width: "100%" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "0.85rem",
                letterSpacing: "0.05rem",
              }}
            >
              Display Name
            </Typography>
            <input
              id="name"
              type="text"
              maxLength="10"
              required
              placeholder="Enter your name ( Max length is 10 characters )"
              style={{
                width: "100%",
                height: "1.5rem",
                border: "0.1rem solid #949494",
                margin: "0.3rem 0 0.7rem 0",
                padding: "0.2rem",
                fontSize: "0.85rem",
                borderRadius: "0.2rem",
                outline: "none",
              }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "0.85rem",
                letterSpacing: "0.05rem",
              }}
            >
              Email or mobile phone number
            </Typography>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your email"
              style={{
                width: "100%",
                height: "1.5rem",
                border: "0.1rem solid #949494",
                margin: "0.3rem 0 0.7rem 0",
                padding: "0.2rem",
                fontSize: "0.85rem",
                borderRadius: "0.2rem",
                outline: "none",
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "0.85rem",
                letterSpacing: "0.05rem",
              }}
            >
              Password
            </Typography>
            <input
              type="password"
              id="password"
              required
              placeholder="Enter your password"
              style={{
                width: "100%",
                height: "1.5rem",
                border: "0.1rem solid #949494",
                margin: "0.3rem 0 0.7rem 0",
                padding: "0.2rem",
                fontSize: "0.85rem",
                borderRadius: "0.2rem",
                outline: "none",
              }}
              onChange={(e) => setPass(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "linear-gradient(to bottom,#F7DDA0,#F0C14B)",
                border: "0.1rem solid #A88734",
                borderRadius: "0.2rem",
                fontSize: "0.9rem",
                mt: 2,
                width: "100%",
                height: "1.8rem",
                color: "black",
                boxShadow: "none",
                "&:hover": {
                  background: "linear-gradient(to top,#EEB934,#F4D485)",
                },
              }}
              onClick={createNewAccount}
            >
              Create your Amazon account
            </Button>
          </form>
          <Typography sx={{ fontSize: "0.8rem", my: 2 }}>
            By continuing, you agree to Amazon's{" "}
            <a
              href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=200545940"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0066C0", textDecoration: "none" }}
            >
              Conditions of Use
            </a>{" "}
            and{" "}
            <a
              href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=200534380"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0066C0", textDecoration: "none" }}
            >
              Privacy Notice
            </a>
            .
          </Typography>
        </Paper>
        <Divider
          sx={{ width: "23rem", fontSize: "0.8rem", color: "#767676", my: 2 }}
        >
          Already a Member?
        </Divider>
        <Link to="/Login" style={{ width: "100%", textAlign: "center" }}>
          <Button
            variant="outlined"
            sx={{
              width: "23rem",
              height: "1.8rem",
              fontSize: "0.9rem",
              border: "0.1rem solid #8D9096",
              mt: 2,
              borderRadius: "0.2rem",
              background: "linear-gradient(to top,#E7E9EC,#FBFCFD)",
              color: "black",
              "&:hover": {
                background: "linear-gradient(to top,#DADDE2,#F5F7F9)",
              },
            }}
          >
            Sign In
          </Button>
        </Link>
      </Box>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Oops😢 an Error Occured"}</DialogTitle>
        <DialogContent>
          <Typography style={{ whiteSpace: "pre-line" }}>{error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Okay</Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          py: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderTop: "0.15rem solid #d9d7d7",
          mt: 4,
        }}
      >
        <Box
          sx={{ width: "20%", display: "flex", justifyContent: "space-around" }}
        >
          <a
            href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=200545940"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0066C0",
              fontSize: "0.8rem",
              textDecoration: "none",
            }}
          >
            Conditions of Use
          </a>
          <a
            href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=200534380"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0066C0",
              fontSize: "0.8rem",
              textDecoration: "none",
            }}
          >
            Privacy Notice
          </a>
          <a
            href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=508510"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0066C0",
              fontSize: "0.8rem",
              textDecoration: "none",
            }}
          >
            Help
          </a>
        </Box>
        <Typography sx={{ fontSize: "0.75rem", color: "#555555", mt: 1 }}>
          © 1996-2022, Amazon.com, Inc. or its affiliates
        </Typography>
      </Box>
    </Box>
  );
}

export default SignUp;
