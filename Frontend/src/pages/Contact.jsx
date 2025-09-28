// Contact.jsx
// Purpose: Provide a contact form with client-side validation and API submission.
// - Uses environment-based API URL (VITE_API_BASE_URL) for deployment flexibility.
// - Includes accessibility attributes and UX states (loading, success/error feedback).
import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";
import {
  Typography,
  Container,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

// Base API URL: configurable via Vite env. Falls back to local server in dev.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  // Basic synchronous validator for required fields and email format
  const validate = (values) => {
    const errs = {};
    if (!values.name.trim()) errs.name = "Name is required";
    if (!values.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      errs.email = "Enter a valid email";
    if (!values.subject.trim()) errs.subject = "Subject is required";
    if (!values.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const errors = validate(formData);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  // Submit handler: validates, then posts to API; provides user feedback on success/failure
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!isValid) return;

    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      const res = await axios.post(`${API_BASE}/api/contact`, formData, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      });
      setFeedback({ type: "success", message: res.data.message || "Message sent successfully" });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTouched({});
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.response?.data?.message || err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  // Render: layout includes heading, optional feedback alert, and a validated form
  return (
    <Container sx={{ mt: 12, pt: 4, pb: 6 }}>
      <Slide direction="down" triggerOnce>
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Contact Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            We’d love to hear from you. Whether you have a question, feedback,
            or want to schedule a school visit, just reach out!
          </Typography>

          {feedback.message && (
            <Alert severity={feedback.type} sx={{ mt: 2 }}>
              {feedback.message}
            </Alert>
          )}

          <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit} noValidate>
            <TextField
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              required
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              inputProps={{ "aria-label": "Full Name" }}
            />
            <TextField
              name="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              required
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              inputProps={{ "aria-label": "Email Address" }}
            />
            <TextField
              name="subject"
              label="Subject"
              value={formData.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              required
              error={Boolean(touched.subject && errors.subject)}
              helperText={touched.subject && errors.subject}
              inputProps={{ "aria-label": "Subject" }}
            />
            <TextField
              name="message"
              label="Message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              multiline
              rows={4}
              fullWidth
              margin="normal"
              required
              error={Boolean(touched.message && errors.message)}
              helperText={touched.message && errors.message}
              inputProps={{ "aria-label": "Message" }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              type="submit"
              disabled={loading || !isValid}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
          </Box>
        </Box>
      </Slide>
    </Container>
  );
};

export default Contact;
