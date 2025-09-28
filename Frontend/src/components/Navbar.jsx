import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import bgImage from "../assets/shinelight-logo.png";

const pages = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "News & Updates", path: "/news" },
  { name: "About Us ", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [anchorElNav, setAnchorNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorNav(null);
  };

  return (
    <AppBar position="fixed" color="primary">
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "#3949ab",
          boxShadow: "0px 0px 4px #232323ff",
          padding: "17px",
        }}
      >
        <Toolbar disableGutters>
          <img
            src={bgImage}
            alt="Shinelight School Logo"
            style={{ height: "45px", marginRight: "10px" }}
          />

          <Typography
            variant="h5"
            noWrap
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            SHINELIGHT INTERNATIONAL SCHOOL
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontWeight: "bold",
              display: { xs: "flex", md: "none", justifyContent: "center" },
            }}
          >
            SHINELIGHT INT'L SCHOOL
          </Typography>

          {/* Mobile Hamburger */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink
                    to={page.path}
                    style={({ isActive }) => ({
                      textDecoration: "none",
                      color: isActive ? "#1e61fdff" : "inherit",
                      fontWeight: isActive ? "bold" : "normal",
                    })}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Links with Animation */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                component={NavLink}
                to={page.path}
                className={({ isActive }) => (isActive ? "active" : "")}
                sx={{
                  marginLeft: 2,
                  color: "white",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "0%",
                    borderRadius: "20px",
                    height: "3px",
                    backgroundColor: "#28adffff",
                    transition: "width 0.4s ease-in-out",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                  "&.active": {
                    color: "#91e7ffff",
                    fontWeight: "bold",
                  },
                  "&.active::after": {
                    width: "100%",
                  },
                }}
              >
                <Typography fontFamily={"montserrat"}>{page.name}</Typography>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
