import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Fade,
  Divider,
  Card,
} from "@mui/material";
import bgImage from "../assets/shinelight-logo.png";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { value: 999, suffix: "+", label: "Happy Students" },
  { value: 30, suffix: "+", label: "Qualified Teachers" },
  { value: 14, suffix: "+", label: "Years of Excellence" },
  { value: 100, suffix: "%", label: "Success Rate" },
];

const IntroStats = () => {
  const [visible, setVisible] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    setVisible(inView);
  }, [inView]);

  return (
    <Box
      sx={{
        pt: { xs: 6, md: 10 },
        pb: { xs: 8, md: 12 },
        backgroundImage: `url("https://www.transparenttextures.com/patterns/cubes.png")`,
        backgroundColor: "#eef2ff", // fallback color
        backgroundAttachment: "fixed",
        backgroundSize: "auto",
      }}
      ref={ref}
    >
      <Container maxWidth="lg">
        <Fade in={visible} timeout={1000}>
          <Card
            sx={{
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              p: { xs: 4, md: 8 },
              // backgroundImage: `url("https://www.transparenttextures.com/patterns/cubes.png")`,
              backgroundColor: "rgba(255,255,255,0.9)", // slight transparency for "glass" effect
              backdropFilter: "blur(8px)",
              textAlign: "center",
            }}
          >
            <img
              src={bgImage}
              alt="Shinelight School Logo"
              style={{ height: "120px" }}
            />

            {/* Intro Section */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontFamily: "Montserrat, sans-serif", lineHeight: 1.3 }}
              color="#1a237e"
              fontWeight="bold"
            >
              Welcome to Shinelight International School
            </Typography>

            <Divider
              sx={{
                my: 3,
                mx: "auto",
                width: "80px",
                borderBottomWidth: 3,
                borderColor: "#3949ab",
              }}
            />

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: { xs: "1rem", md: "1.2rem" },
                lineHeight: 1.8,
                maxWidth: 750,
                mx: "auto",
              }}
            >
              At Shinelight International School, we nurture excellence in
              academics, character, and creativity. Our dedicated staff and
              modern facilities provide the perfect environment for your child’s
              growth.
            </Typography>

            {/* Stats Section */}
            <Grid
              container
              spacing={4}
              justifyContent="space-around"
              sx={{ mt: 6 }}
            >
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Box
                    sx={{
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.07)" },
                    }}
                  >
                    <Typography
                      variant="h2"
                      fontWeight="bold"
                      sx={{
                        background: "linear-gradient(135deg, #3949ab, #1e3a8a)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        userSelect: "none",
                      }}
                    >
                      {visible ? (
                        <CountUp
                          end={stat.value}
                          suffix={stat.suffix}
                          duration={5}
                          delay={index * 0.3}
                        />
                      ) : (
                        `0${stat.suffix}`
                      )}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ opacity: 0.85, fontWeight: 500, mt: 1 }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default IntroStats;
