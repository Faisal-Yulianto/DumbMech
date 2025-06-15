import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Navbar from "../layout/navbar";
import { formatCurrency } from "../utils/Curency";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useLocation } from "react-router-dom";
import { CartItem } from "../utils/checkoutTypes";

export default function Checkout() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  return (
    <Box>
      <Navbar role={"user"} />
      <Box sx={{ mt: 15, width: "90%", mx: "auto" }}>
        <Typography
          align="center"
          color="secondary.main"
          variant="h1"
          fontWeight={700}
        >
          Checkout
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography
            sx={{ mt: 10, pb: 5, color: "secondary.main" }}
            variant="h4"
            fontWeight={700}
          >
            Delivery Options
          </Typography>
          <Typography
            sx={{ mt: 10, pb: 5, color: "secondary.main", mr: 50 }}
            variant="h4"
            fontWeight={700}
            textAlign={"start"}
          >
            In your Cart
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-around">
          <Box
            sx={{
              width: "60%",
              bgcolor: "#212121",
              p: 5,
              borderRadius: "10px",
            }}
          >
            <Stack direction="row" sx={{ pt: 5 }}>
              <Typography
                color="primary.main"
                sx={{
                  border: "2px solid",
                  width: "50%",
                  p: 2,
                  borderRadius: "10px",
                }}
                variant="h5"
                textAlign={"center"}
              >
                <LocalShippingIcon color="primary" sx={{ mr: 2 }} /> Ship
              </Typography>
              <Typography
                color="primary.main"
                sx={{
                  border: "5px solid red",
                  width: "50%",
                  p: 2,
                  ml: 2,
                  borderRadius: "10px",
                }}
                variant="h5"
                textAlign={"center"}
              >
                <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                Pick Up
              </Typography>
            </Stack>
            <TextField
              fullWidth
              type="text"
              sx={{ bgcolor: "white", borderRadius: "10px", mt: 5 }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            ></TextField>
            <TextField
              fullWidth
              type="text"
              sx={{ bgcolor: "white", borderRadius: "10px", mt: 2 }}
              id="outlined-basic"
              label="Phone"
              variant="outlined"
            ></TextField>
            <TextField
              fullWidth
              multiline
              rows={4}
              type="text"
              sx={{ bgcolor: "white", borderRadius: "10px", mt: 2 }}
              id="outlined-basic"
              label="Address"
              variant="outlined"
            >
              {" "}
            </TextField>
          </Box>
          {cartItems.map((item:CartItem) => (
            <Box
              key={item.productId}
              sx={{
                width: "40%",
                bgcolor: "#212121",
                p: 5,
                ml: 1,
                borderRadius: "10px",
              }}
            >
              <Stack direction={"row"} justifyContent={"space-between"} p={2}>
                <Typography variant="h5" color="primary.main">
                  Sub total
                </Typography>
                <Typography variant="h5" color="primary.main">
                  {/* {formatCurrency()} */}
                </Typography>
              </Stack>

              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                p={2}
                mt={-3}
              >
                <Typography variant="h5" color="primary.main">
                  Estimated Shipping
                </Typography>
                <Typography variant="h5" color="primary.main">
                  Rp1000
                </Typography>
              </Stack>

              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                p={2}
                mt={-3}
              >
                <Typography variant="h5" color="primary.main">
                  Estimated Tax
                </Typography>
                <Typography variant="h5" color="primary.main">
                  Rp1000
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                p={2}
                mt={-1}
                borderTop="2px solid white"
              >
                <Typography variant="h5" fontWeight={700} color="primary.main">
                  Total
                </Typography>
                <Typography variant="h5" fontWeight={700} color="primary.main">
                  Rp 102.000
                </Typography>
              </Stack>
              <Typography variant="h6" color="secondary.main" p={2}>
                Arrives fri, july 24 - Tue, jul 26
              </Typography>
              <Stack p={2}>
                <Typography
                  variant="h5"
                  color="primary.main"
                  sx={{ textAlign: "center", mb: "20px" }}
                >
                  {item.product.productName}
                </Typography>
                <Box>
                  <img src={item.product.image} width={"100%"} />
                </Box>
                <Box pl={4}>
                  <Typography variant="body1" color="primary.main" pt={1}>
                    {item.product.productDesc}
                  </Typography>
                  <Typography variant="body1" color="primary.main" pt={5}>
                    {formatCurrency(item.product.price)}
                  </Typography>
                  <Typography variant="body1" color="primary.main" pt={0}>
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body1" color="primary.main" pt={0}>
                    {/* Sub total: {formatCurrency(totalPrice)} */}
                  </Typography>
                </Box>
              </Stack>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 5, height: "40px" }}
              >
                Bayar
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
