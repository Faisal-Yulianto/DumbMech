import { Box, Button, Stack, TextField, Typography, MenuItem, CircularProgress } from "@mui/material";
import Navbar from "./navbar";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchProducts, updateProduct } from "../store/productSlice";
import { fetchCategories } from "../store/categorySlice"; 

const VisuallyHiddenInput = styled.input`
  display: none;
`;

interface Category {
  id: number;
  categoryName: string;
}
export default function EditProduct() {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productDesc, setProductDesc] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const products = useSelector((state: RootState) => state.product.products);
  const categories = useSelector((state: RootState) => state.Category.categories);
  const categoryLoading = useSelector((state: RootState) => state.Category.loading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (id && products.length > 0) {
      const product = products.find((product) => product.id === parseInt(id));
      if (product) {
        setProductName(product.productName);
        setProductDesc(product.productDesc);
        setPrice(product.price);
        setQty(product.qty);
        setCategoryId(product.categoryId); 
      }
    }
  }, [id, products]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files).map((file) => file.name);
      setFileNames(fileList);
    }
  };

  const handleSave = async () => {
    if (id) {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productDesc", productDesc);
      formData.append("price", price.toString());
      formData.append("qty", qty.toString());
      formData.append("categoryId", categoryId.toString());

      const fileInput = document.getElementById("file-upload") as HTMLInputElement;
      if (fileInput && fileInput.files) {
        for (let i = 0; i < fileInput.files.length; i++) {
          formData.append("image", fileInput.files[i]);
        }
      }
      setIsLoading(true); 
      await dispatch(updateProduct({ id: parseInt(id), productData: formData }));
      setIsLoading(false);
      navigate("/product");
    }
  };

  return (
    <Box>
      <Navbar role={"admin"} />
      <Box
        component="form"
        sx={{
          pt: 20,
          width: "90%",
          m: "auto",
          height: "100vh",
          "& .MuiTextField-root": { width: "100%", mt: 3 },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography
          variant="h5"
          sx={{ color: "primary.main", m: "auto", fontWeight: "bold" }}
        >
          Edit Product
        </Typography>
        <Stack direction={"row"} alignItems={"center"}>
          <Button
            component="label"
            variant="contained"
            sx={{
              bgcolor: "secondary.main",
              color: "primary.main",
              p: 1,
              mt: 2,
              width: "130px",
            }}
          >
            Upload Image
            <VisuallyHiddenInput
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              multiple
            />
          </Button>
          <Box ml={2} mt={1}>
            {fileNames.length > 0 ? (
              fileNames.map((name, index) => (
                <Typography key={index} sx={{ color: "primary.main" }}>
                  {name}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No file chosen
              </Typography>
            )}
          </Box>
        </Stack>

        <TextField
          label="Product Name"
          variant="outlined"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          sx={{ bgcolor: "#262626", borderRadius: 1 }}
          InputProps={{ style: { color: "white" } }}
        />

        <TextField
          label="Product Description"
          multiline
          rows={3}
          variant="outlined"
          value={productDesc}
          onChange={(e) => setProductDesc(e.target.value)}
          sx={{ bgcolor: "#262626", borderRadius: 1 }}
          InputProps={{ style: { color: "white" } }}
        />

        <TextField
          label="Price"
          variant="outlined"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          sx={{ bgcolor: "#262626", borderRadius: 1 }}
          InputProps={{ style: { color: "white" } }}
        />

        <TextField
          label="Quantity"
          variant="outlined"
          type="number"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          sx={{ bgcolor: "#262626", borderRadius: 1 }}
          InputProps={{ style: { color: "white" } }}
        />

        <TextField
          select
          label="Category"
          variant="outlined"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          sx={{ bgcolor: "#262626", borderRadius: 1 }}
          InputProps={{ style: { color: "white" } }}
        >
          {categoryLoading ? (
            <MenuItem disabled>Loading categories...</MenuItem>
          ) : (
            categories.map((category: Category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.categoryName}
              </MenuItem>
            ))
          )}
        </TextField>

        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            width: "100%",
            mt: 5,
            bgcolor: "error.main",
            color: "primary.main",
            height: 50,
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Save"}
        </Button>
      </Box>
    </Box>
  );
}
