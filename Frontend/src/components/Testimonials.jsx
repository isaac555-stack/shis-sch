import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Paper,
  Grid,
  Fade,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const testimonials = [
  {
    name: "Mrs. Adeola Johnson",
    role: "Parent",
    icon: <PersonIcon />,
    message:
      "Shinelight International School has been a blessing for our family. The teachers are caring and truly invest in each child’s success.",
  },
  {
    name: "Samuel Okafor",
    role: "Alumnus",
    icon: <PersonIcon />,
    message:
      "The strong academic foundation and extracurricular opportunities prepared me well for university and beyond.",
  },
  {
    name: "Mrs. Funke Adebayo",
    role: "Parent",
    icon: <PersonIcon />,
    message:
      "Communication with the school is always clear and timely, ensuring that I am well-informed about my child's progress.",
  },
];

const Testimonials = () => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setVisible(true);
    // AOS is initialized in App.jsx
  }, []);

  return (
    <Box sx={{ py: 10, backgroundColor: "#f0f4ff" }} id="testimonials">
      <Container
        maxWidth="md"
        sx={{ textAlign: "center" }}
        data-aos="fade-down"
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          gutterBottom
          fontWeight="bold"
          sx={{ mb: 1 }}
          data-aos="fade-down"
        >
          What Parents & Students Say
        </Typography>
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
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ mb: 6, fontStyle: "italic" }}
          data-aos="fade-down"
          data-aos-delay="150"
        >
          Real stories from our school community that show the heart of
          Shinelight.
        </Typography>

        <Grid container spacing={6} justifyContent="center">
          {testimonials.map((testi, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              sx={{
                display: "flex",
                justifyContent: "center",
                "&:hover .testimonial-paper": {
                  boxShadow:
                    "0 12px 24px rgba(57, 73, 171, 0.3), 0 8px 16px rgba(57, 73, 171, 0.2)",
                  transform: "scale(1.03)",
                },
              }}
            >
              <Fade
                in={visible}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                <Paper
                  elevation={3}
                  className="testimonial-paper"
                  sx={{
                    p: 4,
                    maxWidth: 420,
                    textAlign: "left",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    cursor: "default",
                    position: "relative",
                    bgcolor: "white",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#3949ab",
                        width: 64,
                        height: 64,
                        mr: 2,
                        border: "3px solid #c5cae9",
                      }}
                    >
                      {testi.icon}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ color: "#303f9f" }}
                      >
                        {testi.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testi.role}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      position: "relative",
                      pl: 4,
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: 0,
                        color: "#3949ab",
                        fontSize: 40,
                        lineHeight: 1,
                        fontWeight: "bold",
                        zIndex: 0,
                        backgroundColor: "#d9dae6bd",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundImage:
                          "url('data:image/svg+xml;utf8,<svg fill=%233949ab xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><path d=%22M7.17 6A4.992 4.992 0 0 1 11 8c0 2.21-1.79 4-4 4-.55 0-1-.45-1-1V7.17c0-.52.4-.94.94-.99zM17.17 6A4.992 4.992 0 0 1 21 8c0 2.21-1.79 4-4 4-.55 0-1-.45-1-1V7.17c0-.52.4-.94.94-.99z%22/></svg>')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontStyle: "italic",
                        color: "#1a237e",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {`"${testi.message}"`}
                    </Typography>
                  </Box>
                </Paper>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
