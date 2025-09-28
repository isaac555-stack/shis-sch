// ThumbsFeedback.jsx
// Purpose: Lightweight feedback widget prompting users if content was helpful.
// - Tracks a simple local state; optionally wire to analytics or backend.
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const ThumbsFeedback = () => {
  const [feedback, setFeedback] = useState(null); // null, "up", or "down"

  // Handle user feedback; extend here to send events to analytics or API
  const handleFeedback = (type) => {
    setFeedback(type);
    // You can also send this feedback to backend or analytics here
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="subtitle1" gutterBottom>
        Did you find our news helpful?
      </Typography>
      {feedback === null ? (
        <>
          <Button
            startIcon={<ThumbUpIcon />}
            color="success"
            variant="outlined"
            sx={{ mx: 1 }}
            onClick={() => handleFeedback("up")}
          >
            Yes
          </Button>
          <Button
            startIcon={<ThumbDownIcon />}
            color="error"
            variant="outlined"
            sx={{ mx: 1 }}
            onClick={() => handleFeedback("down")}
          >
            No
          </Button>
        </>
      ) : feedback === "up" ? (
        <Typography color="success.main" variant="body1">
          Thanks for your feedback! 👍
        </Typography>
      ) : (
        <Typography color="error.main" variant="body1">
          Thanks for your feedback! 👎
        </Typography>
      )}
    </Box>
  );
};

export default ThumbsFeedback;
