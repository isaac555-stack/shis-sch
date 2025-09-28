import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

import { School, People, LocationOn, Star } from "@mui/icons-material";
import { Slide } from "react-awesome-reveal";

import img1 from "../assets/hero2.jpg";
import img2 from "../assets/hero3.jpg";

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // timeline data
  const historyEvents = [
    {
      date: "Sept 12, 2011",
      title: "Founded",
      description:
        "Shinelight International School was established with a strong commitment to academic excellence and godly values.",
      icon: <School />,
      color: "primary",
    },

    {
      date: "Inception",
      title: "Pioneering Pupils",
      description:
        "The school began with 8 pupils (5 boys, 3 girls), guided by the first Head Teacher.",
      icon: <People />,
      color: "secondary",
    },

    {
      date: "Early Team",
      title: "Founding Staff",
      description:
        "A team of 4 dedicated teachers (2 male, 2 female) joined to nurture both academic brilliance and character formation.",
      icon: <People />,
      color: "success",
    },

    {
      date: "First Site",
      title: "Temporary Campus",
      description:
        "The school started at No. 18 Edo Street, Phase 1 Extension, Jikwoyi, Abuja — a modest site that became the seed ground for future growth.",
      icon: <LocationOn />,
      color: "warning",
    },

    {
      date: "Today",
      title: "Steady Growth",
      description:
        "From humble beginnings, Shinelight has grown into a citadel of learning — and continues to move forward with vision, resilience, and faith toward an even brighter future.",
      icon: <Star />,
      color: "info",
    },
  ];

  return (
    <Container sx={{ px: 2, mt: 14 }}>
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 4,
          letterSpacing: 1,
        }}
      >
        About Us
      </Typography>

      {/* Mission */}
      <Slide direction="up" triggerOnce>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            mb: 4,
            boxShadow: 4,

            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.01)" },
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: { xs: "100%", md: 500 }, objectFit: "cover" }}
            image={img1}
            alt="Mission"
          />
          <CardContent sx={{ flex: 1, p: 3 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Our Mission
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.7 }}
            >
              Raising up Godly Children with high academic and moral integrity,
              who will make notable differences by setting paces worthy of
              emulation in all fields of human endeavour.
            </Typography>
          </CardContent>
        </Card>
      </Slide>

      {/* Vision */}
      <Slide direction="up" triggerOnce delay={200}>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            mb: 6,
            boxShadow: 4,

            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.01)" },
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: { xs: "100%", md: 500 }, objectFit: "cover" }}
            image={img2}
            alt="Vision"
          />
          <CardContent sx={{ flex: 1, p: 3 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Our Vision
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.7 }}
            >
              To see to the total empowerment of our children through holistic
              education.
            </Typography>
          </CardContent>
        </Card>
      </Slide>
      <hr />

      {/* Core Values */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Our Core Values
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {["Discipline", "Excellence", "Integrity", "Faith"].map((value) => (
            <Grid item key={value}>
              <Chip
                label={value}
                color="primary"
                variant="outlined"
                sx={{ fontWeight: "bold", fontSize: "1.2rem", px: 2, py: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* History Section */}
      <Box sx={{ mt: 5, mb: 8 }}>
        <Typography
          variant="h5"
          textAlign="center"
          gutterBottom
          fontWeight="bold"
        >
          Brief History of Shinelight International School
        </Typography>

        {/* Responsive Timeline */}
        {isMobile ? (
          // Mobile: show as List
          <List>
            {historyEvents.map((event, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: `${event.color}.main` }}>
                    {event.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    fontWeight="bold"
                  >
                    {event.title}
                  </Typography>
                  <Box>
                    <Typography
                      component="p" // <- Important
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      {event.date}
                    </Typography>
                    <Typography
                      component="span" // <- Important
                      variant="body2"
                      color="text.secondary"
                      display="block"
                    >
                      {event.description}
                    </Typography>
                  </Box>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        ) : (
          // Desktop: show as Timeline
          <Timeline position="alternate">
            {historyEvents.map((event, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent color="text.secondary">
                  {event.date}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color={event.color}>{event.icon}</TimelineDot>
                  {index !== historyEvents.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </Box>
    </Container>
  );
};

export default About;
