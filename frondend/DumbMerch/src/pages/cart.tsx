import { Box, Stack, Typography, Button, Divider } from "@mui/material";
import Navbar from "../layout/navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { green, red } from "@mui/material/colors";

interface Product {
  id: number;
  productName: string;
  price: number;
  image: string;
  qty: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Menyimpan cart dari localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Fungsi untuk menambah jumlah produk dalam keranjang
  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.product.id === product.id);
    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cartItems, { product, quantity: 1 }];
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // Fungsi untuk mengurangi jumlah produk dalam keranjang
  const handleRemoveFromCart = (productId: number) => {
    const existingItem = cartItems.find((item) => item.product.id === productId);
    if (existingItem && existingItem.quantity > 1) {
      const updatedCart = cartItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = cartItems.filter((item) => item.product.id !== productId);
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const navigate = useNavigate();

  // Fungsi untuk format angka dengan pemisah ribuan
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  // Menghitung total harga
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  // Fungsi untuk mengarahkan ke halaman checkout dan mengirimkan data cart
  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems } });
  };

  return (
    <Box>
      <Navbar role={"user"} />
      <Box sx={{ mt: "200px", mb: "100px", bgcolor: "background.default", width: "90%" }}>
        <Typography sx={{ color: "secondary.main", fontSize: 30, fontWeight: "bold", ml: "90px", mt: "50px", mb: "20px" }}>
          Shopping Cart
        </Typography>
        <Stack direction={"column"} sx={{ ml: 10 }} spacing={2}>
          {cartItems.length === 0 ? (
            <Typography>No items in the cart</Typography>
          ) : (
            cartItems.map((item) => (
              <Box key={item.product.id} sx={{ mb: 2, border: "1px solid #ccc", borderRadius: "5px", p: 2, height: "340px" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box>
                    <Typography variant="h5" sx={{ color: "primary.main", p: 1 }}>
                      {item.product.productName}
                    </Typography>
                    <Box
                      component="img"
                      src={item.product.image}
                      alt={item.product.productName}
                      sx={{ width: 390, height: 260, objectFit: "cover" }}
                    />
                  </Box>
                  <Stack direction="column" width={"100%"} justifyContent={'space-between'}>
                    <Stack direction="row" spacing={4} mt={2} justifyContent={"space-around"} alignItems="center">
                      <Box textAlign="center">
                        <Typography variant="body2" color="primary.main">
                          Price
                        </Typography>
                        <Typography variant="body1" sx={{ color: "primary.main" }}>
                          {formatCurrency(item.product.price)}
                        </Typography>
                      </Box>
                      <Box textAlign="center">
                        <Typography variant="body2" color="primary.main">
                          Stock
                        </Typography>
                        <Typography variant="body1" sx={{ color: "primary.main" }}>
                          {item.product.qty} Available
                        </Typography>
                      </Box>
                      <Box textAlign="center">
                        <Typography variant="body2" color="primary.main">
                          Total
                        </Typography>
                        <Typography variant="body1" sx={{ color: "primary.main" }}>
                          {formatCurrency(item.product.price * item.quantity)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Button onClick={() => handleRemoveFromCart(item.product.id)}>
                      <RemoveCircleOutlineIcon sx={{ color: red[500] }} />
                    </Button>
                    <Typography variant="body2" color="primary.main">
                      {item.quantity}
                    </Typography>
                    <Button onClick={() => handleAddToCart(item.product)}>
                      <AddCircleOutlineIcon sx={{ color: green[500] }} />
                    </Button>
                  </Stack>
                </Stack>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))
          )}
        </Stack>
        <Typography variant="h6" sx={{ ml: 10, mb: 2, p: 2, color: "primary.main" }}>
          Total Price: {formatCurrency(calculateTotal())}
        </Typography>
        <Button onClick={handleCheckout} sx={{ bgcolor: "secondary.main", p: 2, width: '95%', ml: 10 }}>
          Checkout
        </Button>
      </Box>
    </Box>
  );
}
