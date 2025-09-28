// Home.jsx
// Purpose: Landing page that composes the hero slider, key sections (intro stats, why choose us, programs,
// testimonials, enroll), and shows a site-wide announcement popup for recent updates.

import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

// Section components
import IntroStats from "../components/IntroStats";
import Programs from "../components/Programs";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import Enroll from "../components/Enroll";
import HeroSlider from "../components/HeroSlider";

// Hero images (consider optimizing with webp/avif and responsive sizes)
import hero1 from "../assets/hero.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";

// Slides for the hero slider. Keep text concise for readability and accessibility.
const slides = [
  {
    image: hero1,
    title: "Qualitative Education Based on Godly Principles",
    subtitle: "We train and prepare pupils to succeed in life and society",
    buttonText: "Discover More",
  },
  {
    image: hero2,
    title: "Building a Bright Future for Every Child",
    subtitle: "A safe, vibrant and caring environment for learning",
    buttonText: "Our Programs",
  },
  {
    image: hero3,
    title: "Equipped for the 21st Century",
    subtitle: "Modern classrooms, science labs and digital learning tools",
    buttonText: "Learn More",
  },
];

const Home = () => {
  // Announcement popup configuration
  // Change ANNOUNCEMENT_ID when there is a new update so returning users see the dialog once.
  const ANNOUNCEMENT_ID = "2025-08-21-home-update";

  // Controls the visibility of the announcement dialog
  const [openUpdate, setOpenUpdate] = useState(false);

  // On initial mount, display the announcement if it hasn't been acknowledged in this browser.
  useEffect(() => {
    try {
      const seen = localStorage.getItem("announcement_seen");
      if (seen !== ANNOUNCEMENT_ID) setOpenUpdate(true);
    } catch {
      // If localStorage is not available (private mode), still show the announcement.
      setOpenUpdate(true);
    }
  }, [ANNOUNCEMENT_ID]);

  // AOS is initialized globally in App.jsx. Keep this effect reserved for future page-level setup.
  useEffect(() => {
    // No-op: global animations already configured
  }, []);

  // Close dialog handler: when persist=true, we record that the user has seen the announcement.
  const handleCloseUpdate = (persist) => {
    if (persist) {
      try {
        localStorage.setItem("announcement_seen", ANNOUNCEMENT_ID);
      } catch {
        // Ignore persistence failures
      }
    }
    setOpenUpdate(false);
  };

  return (
    <Box
      mx={0}
      p={0}
      sx={{
        backgroundImage: `url("https://www.transparenttextures.com/patterns/cubes.png")`,
        backgroundAttachment: "fixed",
        backgroundSize: "auto",
      }}
    >
      {/* Hero area with animated slider and CTA */}
      <HeroSlider slides={slides} />

      {/* One-time announcement dialog (until ANNOUNCEMENT_ID changes) */}
      <Dialog
        open={openUpdate}
        onClose={() => handleCloseUpdate(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold", pr: 6 }}>
          Latest Update
          <IconButton
            aria-label="Close announcement"
            onClick={() => handleCloseUpdate(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" gutterBottom>
            We’ve posted a new update to our News & Updates section.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Highlights include recent events, announcements, and important
            dates. Click “Read more” to view details.
          </Typography>
        </DialogContent>
        <DialogActions>
          {/* Does not persist the dismissal so users will be reminded next visit */}
          <Button onClick={() => handleCloseUpdate(false)} color="inherit">
            Remind me later
          </Button>
          {/* Navigates to /news and persists the dismissal for this announcement ID */}
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/news"
            onClick={() => handleCloseUpdate(true)}
          >
            Read more
          </Button>
        </DialogActions>
      </Dialog>

      {/* Key sections on the home page */}
      <IntroStats />
      <WhyChooseUs />
      <Programs />
      <Testimonials />
      <Enroll />
    </Box>
  );
};

export default Home;
