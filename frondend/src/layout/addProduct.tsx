import * as React from "react";
import {
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  Backdrop,
  Stack,
  TextField,
  CircularProgress,
  styled,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAddProduct } from "../hooks/useAddProduct";

const style = {
  borderRadius: "20px",
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "80vh",
  bgcolor: "rgba(255, 255, 255, 0.6)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled("input")({
  display: "none",
});

const AddProductModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const {
    fileNames,
    errorMessage,
    isLoading,
    handleFileChange,
    handleSubmit,
    onSubmit,
    fetchAndSetCategories,
    register,
    errors,
    categories,
    categoryLoading,
  } = useAddProduct();

  const handleOpen = () => {
    setOpen(true);
    fetchAndSetCategories();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          bgcolor: "secondary.main",
          ml: 5,
          width: "160px",
          p: 1.5,
          mt: "-20px",
        }}
      >
        <AddIcon />
        Add Product
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Add Product
            </Typography>
            <Backdrop open={isLoading} style={{ zIndex: 1301 }}>
              <CircularProgress color="secondary" size={60} />
            </Backdrop>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                width: "90%",
                m: "auto",
                "& .MuiTextField-root": { width: "100%", mt: 3 },
              }}
              noValidate
              autoComplete="off"
            >
              {errorMessage && (
                <Typography color="error">{errorMessage}</Typography>
              )}

              <Stack direction={"row"} alignItems={"center"}>
                <Button
                  component="label"
                  variant="contained"
                  sx={{
                    bgcolor: "secondary.main",
                    color: "primary.main",
                    p: 1,
                    mr: 2,
                    width: "130px",
                  }}
                >
                  Upload Image
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                    multiple
                  />
                </Button>
                {fileNames.length > 0 && (
                  <Typography sx={{ mt: 1, color: "white" }}>
                    {fileNames.join(", ")}
                  </Typography>
                )}
              </Stack>

              <TextField
                label="Product Name"
                variant="outlined"
                {...register("productName")}
                InputProps={{
                  style: { color: "black" },
                }}
                sx={{
                  borderRadius: 1,
                }}
              />
              {errors.productName && (
                <Typography color="error">
                  {errors.productName.message as string}
                </Typography>
              )}

              <TextField
                multiline
                rows={3}
                label="Description"
                variant="outlined"
                {...register("productDesc")}
                InputProps={{
                  style: { color: "black" },
                }}
                sx={{
                  borderRadius: 1,
                }}
              />
              {errors.productDesc && (
                <Typography color="error">
                  {errors.productDesc.message as string}
                </Typography>
              )}

              <TextField
                label="Price"
                variant="outlined"
                {...register("price")}
                InputProps={{
                  style: { color: "black" },
                }}
                sx={{
                  borderRadius: 1,
                }}
              />
              {errors.price && (
                <Typography color="error">
                  {errors.price.message as string}
                </Typography>
              )}

              <TextField
                label="Quantity"
                variant="outlined"
                {...register("qty")}
                InputProps={{
                  style: { color: "black" },
                }}
                sx={{
                  borderRadius: 1,
                }}
              />
              {errors.qty && (
                <Typography color="error">
                  {errors.qty.message as string}
                </Typography>
              )}

              <TextField
                select
                label="Category"
                variant="outlined"
                {...register("categoryId")}
                InputProps={{
                  style: { color: "black" },
                }}
                sx={{
                  borderRadius: 1,
                }}
              >
                {categoryLoading ? (
                  <MenuItem disabled>Loading categories...</MenuItem>
                ) : (
                  categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.categoryName}
                    </MenuItem>
                  ))
                )}
              </TextField>
              {errors.categoryId && (
                <Typography color="error">
                  {errors.categoryId.message as string}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "secondary.main",
                  color: "white",
                  width: "10%",
                  mt: 3,
                  p: 1.5,
                }}
              >
               {isLoading ? "Loading..." : "Add"}     
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddProductModal;
