import { Box, Stack, Typography } from "@mui/material";
import Navbar from "../layout/navbar";
import ActionAreaCard from "../layout/card"; 
import theme from "../theme/theme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice"; 
import { AppDispatch, RootState } from "../store/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.product);;

  useEffect(() => {
    dispatch(fetchProducts()); 
  }, [dispatch]);

  return (
    <Box>
      <Navbar role={"user"} />
      <Box sx={{ mt: 15 }}>
        <Typography
          sx={{
            color: theme.palette.secondary.main,
            fontSize: 30,
            fontWeight: "bold",
            ml: "90px",
            mt: "50px",
            mb: "20px",
          }}
        >
          Product
        </Typography>
        <Stack direction={"row"} sx={{ ml: 10 }} flexWrap={"wrap"}>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {products.map((product) => (
            <ActionAreaCard 
              key={product.id}
              productId={product.id}
              productName={product.productName}
              price={product.price}
              image={product.image}
              qty={product.qty} productDesc={""}            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
