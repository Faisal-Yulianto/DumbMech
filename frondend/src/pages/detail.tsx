import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import Navbar from "../layout/navbar";
import { Box, Stack, Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { addToCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  userId: number;
  role: string;
  email: string;
  iat: number;
  exp: number;
}

export default function Detail() {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // Mendapatkan produk berdasarkan ID
  const product = useSelector((state: RootState) =>
    state.product.products.find((p) => p.id === Number(productId))
  );

  // Ambil token dari localStorage
  const token = localStorage.getItem("token");
  
  // Decode token dan ambil userId
  let userId: number | null = null;
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      userId = decoded.userId;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  // Fungsi untuk menambahkan produk ke keranjang
  const handleAddToCart = () => {
    if (product && product.id !== undefined && userId !== null) {
      console.log("Adding to cart:", { userId, productId: product.id, quantity: 1 });
      dispatch(addToCart({ userId, productId: product.id, quantity: 1 }));
      navigate("/cart");
    } else {
      console.error("User not authenticated or product missing");
      // Bisa tambahkan redirect ke login atau alert di sini
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
