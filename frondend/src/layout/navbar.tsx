import { AppBar, Toolbar, Typography, Box, Button, IconButton } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Mendefinisikan tipe untuk item navigasi
interface NavItem {
  name: string;
  icon?: JSX.Element; // ikon bersifat opsional
  path: string;
}

const navItemsUser: NavItem[] = [
  { name: "Cart", icon: <ShoppingCartIcon />, path: "/cart" },
  { name: "Home", path: "/" },
  { name: "Complain", path: "/complain" },
  { name: "Profile", path: "/profile" },
  { name: "Logout", path: "/login" },
];

const navItemsAdmin: NavItem[] = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Complain", path: "/complain" },
  { name: "Category", path: "/category" },
  { name: "Product", path: "/product" },
  { name: "Logout", path: "/login" },
];

export default function Navbar({ role }: { role: "user" | "admin" }) {
  const navItems = role === "admin" ? navItemsAdmin : navItemsUser;
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

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
          {navItems.map((item) =>
            item.icon ? ( 
              <IconButton
                key={item.name}
                component={NavLink}
                to={item.path}
                sx={{
                  color: "white",
                  "&.active": {
                    color: "secondary.main",
                  },
                  marginTop: "-30px",
                  marginRight: "16px",
                }}
              >
                {item.icon}
              </IconButton>
            ) : item.name === "Logout" ? ( 
              <Button
                key={item.name}
                onClick={handleLogout} 
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
            ) : (
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
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
