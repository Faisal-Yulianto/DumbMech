import { Box, Stack, Typography, Button, Divider } from "@mui/material";
import Navbar from "../layout/navbar";
import { formatCurrency } from "../utils/Curency";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { green, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  getCartItems,
  removeFromCart,
  updateCartItem,
} from "../store/cartSlice";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  userId: number;
}

const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.userId;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export default function ShoppingCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const userId = getUserIdFromToken();

  const { items: cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    if (userId) {
      dispatch(getCartItems(userId));
    } else {
      console.warn("User ID tidak ditemukan, redirect ke login.");
      navigate("/login");
    }
  }, [dispatch, userId]);

  const handleAddToCart = (productId: number, currentQty: number) => {
    const item = cartItems.find((item) => item.productId === productId);
    if (!item) return;

    if (currentQty + 1 > item.product.qty) {
      alert(`Stok produk hanya tersedia ${item.product.qty} barang.`);
      return;
    }

    if (userId) {
      dispatch(
        updateCartItem({ userId, productId, quantity: currentQty + 1 })
      ).then(() => dispatch(getCartItems(userId)));
    }
  };

  const handleRemoveFromCart = (productId: number, currentQty: number) => {
    if (!userId) return;

    if (currentQty > 1) {
      dispatch(
        updateCartItem({ userId, productId, quantity: currentQty - 1 })
      ).then(() => dispatch(getCartItems(userId)));
    } else {
      dispatch(removeFromCart({ userId, productId })).then(() =>
        dispatch(getCartItems(userId))
      );
    }
  };

  const handleCheckout = (item: (typeof cartItems)[0]) => {
    navigate("/checkout", { state: { cartItems: [item] } });
  };

  return (
    <Box>
      <Navbar role="user" />
      <Box
        sx={{
          mt: "200px",
          mb: "100px",
          bgcolor: "background.default",
          width: "90%",
        }}
      >
        <Typography
          sx={{
            color: "secondary.main",
            fontSize: 30,
            fontWeight: "bold",
            ml: "90px",
            mt: "50px",
            mb: "20px",
          }}
        >
          Shopping Cart
        </Typography>

        <Stack direction="column" sx={{ ml: 10 }} spacing={2}>
          {cartItems.length === 0 ? (
            <Typography color="gray">No items in the cart</Typography>
          ) : (
            cartItems.map((item) => (
              <Box
                key={item.productId}
                sx={{
                  mb: 2,
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  p: 2,
                  height: "340px",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ color: "primary.main", p: 1 }}
                    >
                      {item.product.productName}
                    </Typography>
                    <Box
                      component="img"
                      src={item.product.image}
                      alt={item.product.productName}
                      sx={{ width: 390, height: 260, objectFit: "cover" }}
                    />
                  </Box>

                  <Stack
                    direction="column"
                    width="100%"
                    justifyContent="space-between"
                  >
                    <Stack
                      direction="row"
                      spacing={4}
                      mt={2}
                      justifyContent="space-around"
                      alignItems="center"
                    >
                      <Box textAlign="center">
                        <Typography variant="body2" color="primary.main">
                          Price
                        </Typography>
                        <Typography variant="body1" color="primary.main">
                          {formatCurrency(item.product.price)}
                        </Typography>
                      </Box>
                      <Box textAlign="center">
                        <Typography variant="body2" color="primary.main">
                          Stock
                        </Typography>
                        <Typography variant="body1" color="primary.main">
                          {item.product.qty} Available
                        </Typography>
                      </Box>
                      <Box textAlign="center">
                        <Typography variant="body2" color="primary.main">
                          Total
                        </Typography>
                        <Typography variant="body1" color="primary.main">
                          {formatCurrency(item.product.price * item.quantity)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Button
                      onClick={() =>
                        handleRemoveFromCart(item.productId, item.quantity)
                      }
                    >
                      <RemoveCircleOutlineIcon sx={{ color: red[500] }} />
                    </Button>
                    <Typography variant="body2" color="primary.main">
                      {item.quantity}
                    </Typography>
                    <Button
                      onClick={() =>
                        handleAddToCart(item.productId, item.quantity)
                      }
                    >
                      <AddCircleOutlineIcon sx={{ color: green[500] }} />
                    </Button>
                  </Stack>
                  <Button
                    onClick={() => handleCheckout(item)}
                    sx={{ bgcolor: "secondary.main", p: 2, width: "30%" }}
                  >
                    Checkout
                  </Button>
                </Stack>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))
          )}
        </Stack>
        <Typography
          variant="h6"
          sx={{ ml: 10, mb: 2, p: 2, color: "primary.main" }}
        >
          Total Price: {formatCurrency(totalPrice)}
        </Typography>
      </Box>
    </Box>
  );
}
