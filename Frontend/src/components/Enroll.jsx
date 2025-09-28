import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Fade,
  Modal,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Enroll = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmallScreen ? "80%" : 450,
    maxHeight: "80vh",
    overflowY: "auto",
    bgcolor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(12px)",
    borderRadius: 3,
    boxShadow: 24,
    p: isSmallScreen ? 3 : 4,
    outline: "none",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  };

  return (
    <Fade in={true} timeout={700} mountOnEnter unmountOnExit>
      <Container
        sx={{
          py: 2,
          my: 6,
          background: "linear-gradient(135deg, #3949ab 0%, #5c6bc0 100%)",
          borderRadius: 6,
          boxShadow: "0 12px 40px rgba(57, 73, 171, 0.5)",
          maxWidth: { xs: "90%", md: "md" },
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: 4,
            p: { xs: 3, sm: 6 },
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 2,
              letterSpacing: 1,
              textShadow: "0 2px 10px rgba(0,0,0,0.25)",
            }}
          >
            Ready to Join Shinelight?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: "rgba(255,255,255,0.9)",
              fontWeight: 500,
              lineHeight: 1.5,
              maxWidth: 600,
              mx: "auto",
              textShadow: "0 1px 6px rgba(0,0,0,0.2)",
            }}
          >
            Enroll your child in a school where excellence, character, and
            purpose thrive. Begin their journey with us today and watch them
            soar to greatness.
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              background: "linear-gradient(45deg, #f48fb1 30%, #ce93d8 90%)",
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: 8,
              boxShadow: "0 6px 20px rgba(206, 147, 216, 0.6)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(45deg, #ce93d8 30%, #f48fb1 90%)",
                boxShadow: "0 10px 30px rgba(206, 147, 216, 0.85)",
                transform: "scale(1.05)",
              },
            }}
          >
            Enroll Now
          </Button>
        </Box>

        <Modal open={open} onClose={handleClose} closeAfterTransition>
          <Fade in={open} timeout={400}>
            <Box sx={modalStyle}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  onClick={handleClose}
                  sx={{ color: "#333", p: 0, mb: 1 }}
                  aria-label="close modal"
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h2"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Enroll Now
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mb: 2, fontSize: "1.1rem", color: "#222" }}
              >
                Thank you for your interest in Shinelight International School!
                To enroll your child, please visit our contact page and fill out
                the form. Our admissions team will respond promptly with next
                steps and all the details you need.
              </Typography>
              <Button
                onClick={handleClose}
                variant="outlined"
                sx={{
                  alignSelf: "flex-end",
                  px: 3,
                  fontWeight: "bold",
                  borderRadius: 3,
                }}
              >
                Close
              </Button>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </Fade>
  );
};

export default Enroll;
