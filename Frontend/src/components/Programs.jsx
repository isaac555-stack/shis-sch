import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

import scienceImg from "../assets/images/class.png";
import artsImg from "../assets/images/facilities.png";
import sportsImg from "../assets/images/library1.jpg";
import musicImg from "../assets/images/teachers1.jpg";

const programs = [
  {
    title: "Science Program",
    description:
      "Explore physics, chemistry, biology, agriculture with hands-on labs and expert guidance.",
    image: scienceImg,
  },
  {
    title: "Arts & Humanities",
    description:
      "Develop creativity and critical thinking through immersive studies in literature, history, and the visual arts.",
    image: artsImg,
  },
  {
    title: "Sports & Fitness",
    description:
      "Build teamwork and health with a wide variety of sports activities encouraging creativity.",
    image: sportsImg,
  },
  {
    title: "Music & Performing Arts",
    description:
      "Encourage creative expression and confidence through engaging classes in music, drama, and dance.",
    image: musicImg,
  },
];

const Programs = () => {
  const theme = useTheme();

  useEffect(() => {
    // AOS is initialized in App.jsx
  }, []);

  return (
    <Box>
      <Container maxWidth="lg" id="programs">
        <Box sx={{ textAlign: "center", m: 6 }} data-aos="fade-down">
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ position: "relative", display: "inline-block" }}
          >
            Our Programs
            <Box
              component="span"
              sx={{
                display: "block",
                width: 60,
                height: 4,
                bgcolor: theme.palette.primary.main,
                borderRadius: 2,
                mx: "auto",
                mt: 1,
              }}
            />
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            maxWidth={700}
            mx="auto"
          >
            A wide range of academic and extracurricular activities designed to
            nurture every child’s potential.
          </Typography>
        </Box>

        <Grid container spacing={5}>
          {programs.map((program, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                  maxWidth: "550px",
                  boxShadow: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 8,
                  },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    flexGrow: 1,
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={program.image}
                    alt={program.title}
                    sx={{
                      objectFit: "cover",
                      width: "100%",
                      transition: "transform 0.4s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                </Box>

                <CardContent sx={{ pt: 3 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "600",
                      color: "#013bb7ff",
                    }}
                  >
                    {program.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {program.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Programs;
