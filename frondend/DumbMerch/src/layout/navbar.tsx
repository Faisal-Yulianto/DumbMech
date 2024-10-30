import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

const navItemsUser = [
  { name: "Complain", path: "/complain" },
  { name: "Profile", path: "/profile" },
  { name: "Logout", path: "/login" },
];

const navItemsAdmin = [
  { name: "Complain", path: "/complain" },
  { name: "Category", path: "/category" },
  { name: "Product", path: "/product" },
  { name: "Logout", path: "/login" },
];

export default function Navbar({ role }: { role: "user" | "admin" }) {
  const navItems = role === "admin" ? navItemsAdmin : navItemsUser;

  return (
    <AppBar position="fixed" sx={{ bgcolor: "black", padding: '20px' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">
            <img
              src="/assets/logo-dumbmerch.png"
              alt="Logo"
              style={{ width: "70px" }}
            />
          </Link>
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
                  color: "secondary.main",
                },
                marginTop: "-30px",
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
