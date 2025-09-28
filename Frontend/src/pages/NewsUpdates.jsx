// NewsUpdates.jsx
// Purpose: Display recent news in responsive cards with a modal preview and share actions.
// Improvements:
// - Modal preview keeps users on the page
// - Share support via Web Share API with clipboard fallback
// - Inline comments for maintainability and clarity

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ThumbsFeedback from "../components/ThumbsFeedback";
import hero1 from "../assets/hero.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";

// Local news data; consider replacing with CMS/API in production
const newsData = [
  {
    title: "Inter-house Sports 2025",
    date: "August 2, 2025",
    image: hero1,
    excerpt:
      "Our annual sports event was a thrilling display of teamwork, discipline, and raw talent. Students from all houses competed in various track and field events...",
    content:
      "Our annual sports event was a thrilling display of teamwork, discipline, and excellence. Students from all houses competed in relay races, high jump, long jump, and several field events. Parents and staff cheered enthusiastically, and the event concluded with an inspiring award ceremony celebrating outstanding performers and exemplary sportsmanship.",
  },
  {
    title: "Science Fair Exhibition",
    date: "July 15, 2025",
    image: hero2,
    excerpt:
      "Innovation was at its peak during our Science Fair as students showcased creative projects, from renewable energy prototypes to AI-powered robots...",
    content:
      "Innovation was at its peak during our Science Fair as students presented projects ranging from renewable energy prototypes to AI-powered robots. Judges commended the originality and research depth. The fair fosters curiosity and hands-on learning, strengthening our students' confidence in STEM fields.",
  },
  {
    title: "Cultural Day Celebration",
    date: "June 28, 2025",
    image: hero3,
    excerpt:
      "Our Cultural Day was a colorful blend of traditional attire, dance performances, and food exhibitions representing different regions of the country...",
    content:
      "Cultural Day showcased Nigeria's rich heritage with traditional attire, dance, music, and cuisine from various regions. Students led performances and presentations, promoting unity and cultural appreciation in a joyous atmosphere.",
  },
];

const NewsUpdates = () => {
  // Modal preview state
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // Optional: any page-level effects can go here (AOS is initialized globally)
  useEffect(() => {}, []);

  const handleOpen = (news) => {
    setSelected(news);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  // Share handler with Web Share API and clipboard fallback
  const handleShare = async (news) => {
    const shareData = {
      title: news.title,
      text: `${news.title} - ${news.excerpt}`,
      url: window.location.origin + "/news",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        alert("Link copied to clipboard");
      } else {
        // Very old browsers
        window.prompt("Copy to clipboard:", `${shareData.title}\n${shareData.text}\n${shareData.url}`);
      }
    } catch (e) {
      // User cancelled or share failed; no-op
      console.warn("Share cancelled or failed", e);
    }
  };

  return (
    <Box sx={{ mt: 12, backgroundColor: "#fafafa" }}>
      <Container>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center", pt: 5, mb: 4 }}
          data-aos="fade-up"
        >
          News & Updates
        </Typography>

        <Grid
          container
          spacing={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {newsData.map((news, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} data-aos="fade-up">
              <Card
                sx={{
                  height: "100%",
                  maxWidth: "800px",
                  display: "flex",
                  flexDirection: "column",

                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={news.image}
                  alt={news.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    gutterBottom
                  >
                    {news.date}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {news.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {news.excerpt}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpen(news)}
                    >
                      Preview
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      color="primary"
                      onClick={() => handleShare(news)}
                    >
                      Share
                    </Button>
                  </Stack>

                  <ThumbsFeedback />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modal preview for selected news */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ pr: 6 }}>
          {selected?.title}
          <IconButton
            aria-label="Close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selected?.image && (
            <Box sx={{ mb: 2 }}>
              <img
                src={selected.image}
                alt={selected.title}
                style={{ maxWidth: "100%", borderRadius: 8 }}
              />
            </Box>
          )}
          <Typography variant="caption" color="text.secondary" gutterBottom>
            {selected?.date}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {selected?.content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="text" color="inherit" onClick={handleClose}>
            Close
          </Button>
          {selected && (
            <Button variant="contained" onClick={() => handleShare(selected)}>
              Share
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewsUpdates;
