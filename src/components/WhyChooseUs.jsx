import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

// ✅ Images
import img1 from "../assets/images/teachers1.jpg";
import img2 from "../assets/images/facilities.png";
import img3 from "../assets/images/morals.png";
import img4 from "../assets/images/class.png";
import img5 from "../assets/images/sports1.jpg";
import img6 from "../assets/images/library1.jpg";

const reasons = [
  {
    title: "Qualified Teachers",
    image: img1,
    description:
      "Our dedicated staff are highly trained to provide top-quality education tailored to each student’s unique needs.",
    aos: "fade-up",
  },
  {
    title: "Modern Facilities",
    image: img2,
    description:
      "We offer smart classrooms, advanced labs, and cutting-edge learning tools designed to inspire and empower students.",
    aos: "fade-up",
  },
  {
    title: "Moral & Academic Excellence",
    image: img3,
    description:
      "We foster discipline, integrity, and academic strength to nurture well-rounded students prepared for the future.",
    aos: "fade-up",
  },
  {
    title: "Parent Partnership",
    image: img4,
    description:
      "Building strong connections between school and home ensures your child’s success through active collaboration.",
    aos: "fade-up",
  },
  {
    title: "Sports & Extracurriculars",
    image: img5,
    description:
      "We promote fitness, teamwork, and creativity through a variety of engaging sports and extracurricular activities.",
    aos: "fade-up",
  },
  {
    title: "Rich Library Resources",
    image: img6,
    description:
      "Our extensive library offers a wide collection of books and digital materials to enrich your child’s learning journey.",
    aos: "fade-up",
  },
];

const WhyChooseUs = () => {
  return (
    <Grid>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ textAlign: "center", px: 2, mt: 4 }}
        data-aos="fade-down"
      >
        Why Choose Us
      </Typography>
      <Box
        component="span"
        data-aos="fade-down"
        sx={{
          display: "block",
          width: 60,
          height: 4,
          bgcolor: "primary.main",
          borderRadius: 2,
          mx: "auto",
          mt: 1,
        }}
      />{" "}
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ textAlign: "center", fontStyle: "italic" }}
        data-aos="fade-down"
        data-aos-delay="150"
      >
        Check out the settings that sets us apart in education.
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          py: 8,
          px: 2,
          justifyContent: "center",
        }}
        id="why-choose-us"
      >
        {reasons.map((reason, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ marginBottom: "15px" }}
            key={index}
            data-aos={reason.aos}
            data-aos-delay={index * 150}
          >
            <Card
              sx={{
                height: "100%",
                boxShadow: 3,
                maxWidth: "400px",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={reason.image}
                alt={reason.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" color="#144bc1ff" gutterBottom>
                  {reason.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {reason.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default WhyChooseUs;
