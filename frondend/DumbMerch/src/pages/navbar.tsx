import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Complain", path: "/complain" },
  { name: "Profile", path: "/profile" },
  { name: "Logout", path: "/login" },
];

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: "inherit",padding:'20px' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img
            src="assets/logo-dumbmerch.png"
            alt="Logo"
            style={{ width: "70px" }}
          />
        </Typography>
        <Box>
          {navItems.map((item) => (
            <Button
              key={item.name}
              component={NavLink}
              to={item.path}
              sx={{
                color: "white",
                textDecoration: "none",
                "&.active": {
                  fontWeight: "bold",
                  color: "secondary",
                },
                marginTop : "-30px",
                marginRight: "16px",
              }}
            >
              {item.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
