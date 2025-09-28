// Gallery.jsx
// Purpose: Interactive gallery with category filters, responsive grid, and lightbox modal.
// Improvements:
// - Accessible ToggleButtonGroup for filters
// - Image count display
// - Lightbox close button and improved alt text
// - Inline comments for maintainability
import React, { useState, useEffect } from "react";
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  Dialog,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import hero1 from "../assets/images/IMG_20250816_165501_862~2.jpg";
import hero2 from "../assets/images/IMG_20250816_172451_857~2.jpg";
import hero3 from "../assets/hero3.jpg";

const galleryData = [
  { src: hero1, category: "Party/Celebration" },
  { src: hero2, category: "Party/Celebration" },
  { src: hero3, category: "Party/Celebration" },
  { src: hero1, category: "Party/Celebration" },
  { src: hero2, category: "Party/Celebration" },

  { src: hero1, category: "Career Day" },
  { src: hero2, category: "Career Day" },
  { src: hero3, category: "Career Day" },
  { src: hero1, category: "Career Day" },
  { src: hero2, category: "Career Day" },
  { src: hero3, category: "Sports Day" },
  { src: hero3, category: "Sports Day" },
];

const categories = [
  "All",
  "Career Day",
  "Cultural Day",
  "Sports Day",
  "Party/Celebration",
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const filteredImages =
    selectedCategory === "All"
      ? galleryData
      : galleryData.filter((img) => img.category === selectedCategory);

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, pt: 14, backgroundColor: "#f9f9f9" }}>
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
          sx={{ textAlign: "center" }}
          data-aos="zoom-in"
        >
          School Gallery
        </Typography>

        {/* Category Buttons */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "center",
          }}
          data-aos="zoom-in"
        >
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={(e, val) => {
              if (val) setSelectedCategory(val);
            }}
            aria-label="filter gallery by category"
            color="primary"
            sx={{ flexWrap: "wrap", gap: 2, justifyContent: "center" }}
          >
            {categories.map((cat) => (
              <ToggleButton key={cat} value={cat} aria-label={cat} sx={{ px: 2, py: 0.5 }}>
                {cat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Image Grid */}
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mb: 2 }}>
          Showing {filteredImages.length} of {galleryData.length}
        </Typography>
        <ImageList
          variant="quilted"
          cols={isXs ? 1 : isSm ? 2 : isMd ? 3 : 3}
          gap={16}
          sx={{
            cursor: "pointer",
          }}
        >
          {filteredImages.map((item, index) => (
            <ImageListItem
              key={index}
              sx={{
                position: "relative",
                borderRadius: "4px",
                overflow: "hidden",
                transition: "transform 0.5s ease, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                },
              }}
              onClick={() => {
                setSelectedImage(item.src);
                setOpenModal(true);
              }}
              data-aos="zoom-in"
              data-aos-delay={index * 100} // stagger effect
            >
              <img
                src={item.src}
                alt={item.category}
                loading="lazy"
                style={{ width: "100%", display: "block" }}
              />

              {/* Text Overlay */}
              <ImageListItemBar title={item.category} />
            </ImageListItem>
          ))}
        </ImageList>

        {/* Modal Lightbox */}
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          maxWidth="xl"
          fullWidth
        >
          <Box sx={{ bgcolor: "#000000d6", m: 0, p: 1, textAlign: "center", position: "relative" }}>
            <IconButton
              aria-label="Close"
              onClick={() => setOpenModal(false)}
              sx={{ position: "absolute", top: 8, right: 8, color: "#ffffff" }}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={selectedImage}
              alt={`${galleryData.find((img) => img.src === selectedImage)?.category || "School"} photo`}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
            <Typography
              variant="h6"
              sx={{ color: "#ffffffff", mt: 1, fontWeight: "bold" }}
            >
              {galleryData.find((img) => img.src === selectedImage)?.category ||
                "School Image"}
            </Typography>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Gallery;
