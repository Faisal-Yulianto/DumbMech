import { Box, Button, TextField, Typography } from "@mui/material";
import Navbar from "./navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, updateCategory } from "../store/categorySlice"; 
import { AppDispatch, RootState } from "../store/store"; 

interface Category {
  id: number;
  categoryName: string;
}

export default function EditCategory() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 
  const categories = useSelector((state: RootState) => state.Category.categories); 
  const [categoryName, setCategoryName] = useState<string>(""); 

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      const category = categories.find((cat: Category) => cat.id === parseInt(id));
      if (category) {                                           
        setCategoryName(category.categoryName); 
      }
    }
  }, [categories, id]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleSave = () => {
    if (categoryName) {
      dispatch(updateCategory({ id: parseInt(id!), categoryData: { categoryName } })) 
        .unwrap()
        .then(() => {
          navigate("/category"); 
        })
        .catch((error) => {
          console.error("Failed to update category: ", error);
        });
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
          Edit Category
        </Typography>
        <TextField
          id="outlined-textarea"
          label="Category"
          multiline
          variant="outlined"
          value={categoryName}
          onChange={handleChange} 
          InputProps={{
            style: { color: "white" },
          }}
          sx={{
            bgcolor: "#262626",
            borderRadius: 1,
          }}
        />
        <Button
          variant="contained"
          sx={{
            width: "100%",
            mt: 5,
            bgcolor: "error.main",
            color: "primary.main",
            height: 50,
          }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
