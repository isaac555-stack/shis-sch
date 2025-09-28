import React from "react";
import { Box, CircularProgress, Fade } from "@mui/material";
import logo from "../assets/shinelight-logo.png"; // replace with your logo path

const PreLoader = ({ loading }) => {
  return (
    <Fade in={loading} timeout={500} unmountOnExit>
      <Box
        sx={{
          position: "fixed"
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          bgcolor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000,
        }}
      >
        <CircularProgress
          size={140}
          thickness={4}
          sx={{ color: "#1565c0", position: "absolute" }}
        />
        <Box
          component="img"
          src={logo}
          alt="School Logo"
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            objectFit: "cover",
            zIndex: 1,
          }}
        />
      </Box>
    </Fade>
  );
};

export default PreLoader;
