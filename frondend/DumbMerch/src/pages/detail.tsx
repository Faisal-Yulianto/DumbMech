import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import Navbar from "../layout/navbar";
import { Box, Stack, Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { addToCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Detail() {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // Mendapatkan produk berdasarkan ID
  const product = useSelector((state: RootState) =>
    state.product.products.find((p) => p.id === Number(productId))
  );
  
  // Menyimpan cart items dari localStorage
  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

  // Fungsi untuk menambahkan produk ke keranjang
  const handleAddToCart = () => {
    if (product && product.id !== undefined) {
      console.log("Adding to cart:", { userId: 1, productId: product.id, quantity: 1 });

      // Dispatch untuk menambahkan produk ke cart
      dispatch(addToCart({ userId: 1, productId: product.id, quantity: 1 }));

      // Memperbarui cart di localStorage
      const updatedCart = [...cartItems, { product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Navigasi ke halaman cart
      navigate("/cart");
    }
  };

  // Jika produk tidak ditemukan, tampilkan pesan error
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Box>
      <Navbar role={"user"} />
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 15 }}>
        <Card sx={{ width: '600px', m: "50px", height: 410, borderRadius: "10px" }}>
          <CardMedia component="img" height="500" image={product.image} />
        </Card>
        <Box sx={{ color: 'white', width: '600px' }}>
          <Typography sx={{ fontSize: 30, fontWeight: 'bold' }}>{product.productName}</Typography>
          <Typography sx={{ fontSize: 15, mb: 3 }}>Stock: {product.qty}</Typography>
          <Typography sx={{ fontSize: 15, mb: 5 }}>{product.productDesc}</Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 'bold', color: 'secondary.main', textAlign: 'end', mt: 2 }}>
            Rp.{product.price}
          </Typography>
          <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2, height: "40px" }} onClick={handleAddToCart}>
            Add to cart
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
