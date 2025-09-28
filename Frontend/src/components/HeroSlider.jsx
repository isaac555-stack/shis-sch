// HeroSlider.jsx
// Purpose: Full-width animated hero section with background image slides, overlaid content, and CTA.
// Notes:
// - Uses react-slick for transitions; consider an accessible slider alternative if needed.
// - Parallax effect disabled on mobile to avoid scroll jank.
import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = (props) => {
  // Slider behavior configuration
  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true,
  };

  return (
    <Box sx={{ pt: 8, mt: 8, mb: 0, p: 0 }}>
      {/* Hero Section: background image + gradient overlay + glassmorphic content box */}
      <Box sx={{ position: "relative", fullWidth: "100%" }} id="home">
        <Slider {...settings}>
          {props.slides.map((slide, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                height: { xs: "90vh", md: "100vh" },
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: { xs: "scroll", md: "fixed" }, // Parallax disabled on mobile
                animation: "zoomOut 6s ease forwards",
              }}
            >
              {/* Decorative light flare overlay for subtle visual depth */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "radial-gradient(circle at 70% 20%, rgba(255,255,255,0.3), transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              {/* Dark gradient overlay improves text contrast over images */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.3))",
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <Container maxWidth="md">
                  {/* Glassmorphic Content Box */}
                  <Box
                    sx={{
                      background: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      p: { xs: 3, md: 5 },
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                      maxWidth: "700px",
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: "bold",
                        mb: 2,
                        fontSize: { xs: "2rem", md: "3.5rem" },
                        opacity: 0,
                        animation: "fadeInUp 0.8s ease forwards",
                        animationDelay: "0.3s",
                      }}
                    >
                      {slide.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        fontSize: { xs: "1rem", md: "1.25rem" },
                        opacity: 0,

                        animation: "fadeInUp 0.8s ease forwards",
                        animationDelay: "0.6s",
                      }}
                    >
                      {slide.subtitle}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        fontWeight: "bold",
                        borderRadius: "8px",
                        padding: "12px 28px",
                        opacity: 0,
                        animation: "fadeInUp 0.8s ease forwards",
                        animationDelay: "0.9s",
                        animationIterationCount: "1",
                        "&:hover": {
                          transform: "translateY(-4px) scale(1.05)",
                          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                        },
                        transition: "transform 0.3s ease",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                        position: "relative",

                        overflow: "hidden",
                      }}
                      href="#home"
                    >
                      {slide.buttonText}
                    </Button>
                  </Box>
                </Container>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Keyframe animations for zoomOut and fadeInUp effects */}
      <style>
        {`
            @keyframes zoomOut {
              0% { transform: scale(1.15); }
              100% { transform: scale(1); }
            }
            @keyframes fadeInUp {
              0% { opacity: 0; transform: translateY(40px); }
              100% { opacity: 1; transform: translateY(0); }
            }
          `}
      </style>
    </Box>
  );
};
export default HeroSlider;
