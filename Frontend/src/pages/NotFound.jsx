import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Container sx={{ mt: 14, textAlign: "center", py: 6 }}>
      <Box sx={{ maxWidth: 640, mx: "auto" }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          The page you are looking for doesn’t exist or may have been moved.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/"
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
