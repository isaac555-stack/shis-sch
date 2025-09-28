// Footer.jsx
// Purpose: Footer with branding, quick links, and contact information plus social links.
// Notes:
// - Replace placeholder social hrefs with actual profiles.
// - Ensure links use descriptive text for accessibility.
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Email,
  Phone,
  LocationOn,
  Twitter,
  LinkedIn,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2c387e",
        color: "white",
        py: 6,
        px: { xs: 3, md: 8 },
        mt: 8,
        borderTop: "4px solid #0d47a1",
      }}
    >
      <Grid container spacing={5} justifyContent="space-between">
        {/* Branding & About */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
            sx={{
              letterSpacing: 1.5,
              textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
              mb: 1,
              color: "#fff",
            }}
          >
            Shinelight International School
          </Typography>

          <Typography
            variant="body2"
            sx={{ mb: 2, lineHeight: 1.6, maxWidth: 360 }}
          >
            Delivering quality education rooted in excellence, character, and
            faith — preparing your child for a bright future.
          </Typography>

          {/* Logo placeholder */}

          <Typography
            variant="subtitle2"
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontStyle: "italic",
            }}
          >
            Powered by Ziko Technologies.
            <br /> For inquiries, call +234 9066179476, +234 8023323161
          </Typography>

          {/* Social Icons */}
          <Stack
            direction="row"
            spacing={1}
            justifyContent={{ xs: "center", md: "flex-start" }}
          >
            <IconButton
              aria-label="facebook"
              href="https://facebook.com"
              target="_blank"
              rel="noopener"
              sx={{ color: "white" }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              aria-label="instagram"
              href="https://instagram.com"
              target="_blank"
              rel="noopener"
              sx={{ color: "white" }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              aria-label="twitter"
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              sx={{ color: "white" }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              aria-label="linkedin"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener"
              sx={{ color: "white" }}
            >
              <LinkedIn />
            </IconButton>
          </Stack>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={6} md={3}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Link href="#home" color="inherit" underline="hover">
              Home
            </Link>
            <Link href="#programs" color="inherit" underline="hover">
              Programs
            </Link>
            <Link href="#why-choose-us" color="inherit" underline="hover">
              Why Choose Us
            </Link>
            <Link href="#testimonials" color="inherit" underline="hover">
              Testimonials
            </Link>
            <Link href="/contact" color="inherit" underline="hover">
              Contact
            </Link>
            <Link href="/about" color="inherit" underline="hover">
              About Us
            </Link>
            <Link href="/news" color="inherit" underline="hover">
              News and Updates
            </Link>
          </Box>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={6} md={4}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Contact Us
          </Typography>
          <Stack spacing={1.5}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationOn sx={{ mr: 1 }} />
              <Typography variant="body2" sx={{ maxWidth: 280 }}>
                18th Edo Street, Jikwoyi, Phase 1, Abuja, Nigeria
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body2">+234 802 332 3161</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body2">+234 906 617 9476</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Email sx={{ mr: 1 }} />
              <Typography variant="body2">
                shinelightinternationalschool@gmail.com
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Divider
        sx={{
          my: 4,
          borderColor: "rgba(255,255,255,0.3)",
          maxWidth: 900,
          mx: "auto",
        }}
      />

      <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
        &copy; {new Date().getFullYear()} Shinelight International School. All
        rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
