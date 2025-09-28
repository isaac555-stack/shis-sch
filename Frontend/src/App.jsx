/* App entry: sets up global animations, router, lazy-loaded routes, error boundaries, and layout */
import React, { useEffect, Suspense, lazy, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
/* Lazy-load route components to reduce initial bundle size */
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const News = lazy(() => import("./pages/NewsUpdates"));
const Contact = lazy(() => import("./pages/Contact"));
const Gallery = lazy(() => import("./pages/Gallery"));
const NotFound = lazy(() => import("./pages/NotFound"));

import AOS from "aos";
import "aos/dist/aos.css";
import {
  Box,
  CircularProgress,
  Fab,
  Zoom,
  Snackbar,
  Button as MuiButton,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MuiAlert from "@mui/material/Alert";

/**
 * ErrorBoundary: catches runtime errors in child components and shows a fallback UI
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>Something went wrong. Please refresh.</div>
      );
    }
    return this.props.children;
  }
}
/**
 * ScrollToTop: resets scroll position on each route change for better UX
 */
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);
  return null;
}

function App() {
  // Back-to-top FAB visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Network status snackbar
  const [online, setOnline] = useState(navigator.onLine);
  const [netSnackOpen, setNetSnackOpen] = useState(false);

  // Cookie consent bar
  const [showCookie, setShowCookie] = useState(
    () => localStorage.getItem("cookie_consent") !== "accepted"
  );

  // App-level effects: initialize AOS and handle preloader dismissal
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });

    // Back-to-top indicator
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);

    // Network status listeners
    const handleOnline = () => {
      setOnline(true);
      setNetSnackOpen(true);
    };
    const handleOffline = () => {
      setOnline(false);
      setNetSnackOpen(true);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const preloader = document.getElementById("preloader");

    // Keep loader for at least 500ms
    const timer = setTimeout(() => {
      if (preloader) {
        preloader.classList.add("fade-out");
        setTimeout(() => preloader.remove(), 600); // match fade transition
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <ScrollToTop />
        <Navbar />
        <Suspense
          fallback={
            <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />

          
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />

        {/* Back-to-top floating action button */}
        <Zoom in={showBackToTop}>
          <Fab
            color="primary"
            size="medium"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1300 }}
            aria-label="Back to top"
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Zoom>

        {/* Network status snackbar */}
        <Snackbar
          open={netSnackOpen}
          autoHideDuration={3000}
          onClose={() => setNetSnackOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            onClose={() => setNetSnackOpen(false)}
            severity={online ? "success" : "error"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {online ? "Back online" : "You are offline"}
          </MuiAlert>
        </Snackbar>

        {/* Cookie consent */}
        <Snackbar
          open={showCookie}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              color: "text.primary",
              boxShadow: 3,
              borderRadius: 1,
              p: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <span>We use cookies to improve your experience.</span>
            <MuiButton
              size="small"
              variant="contained"
              onClick={() => {
                localStorage.setItem("cookie_consent", "accepted");
                setShowCookie(false);
              }}
            >
              Accept
            </MuiButton>
          </Box>
        </Snackbar>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
