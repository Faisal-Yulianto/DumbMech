import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress, Backdrop, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAddCategory } from "../hooks/useAddCategory"; 

const style = {
  borderRadius: "20px",
  position: "absolute",
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

export default function AddCategoryModal() {
  const {
    open,
    isLoading,
    errorMessage,
    errors,
    register,
    handleSubmit,
    handleOpen,
    handleClose,
    onSubmit,
  } = useAddCategory();

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          bgcolor: "secondary.main",
          ml: 5,
          width: "180px",
          p: 1,
          mt: "-20px",
        }}
      >
        <AddIcon />
        Add Category
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
              id="transition-modal-title"
              variant="h3"
              component="h2"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Add Category
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
              <TextField
                label="Category Name"
                variant="outlined"
                {...register("CategoryName", {
                  required: "Category Name is required",
                })}
                InputProps={{
                  style: { color: "black" },
                }}
                sx={{ borderRadius: 1 }}
              />
              {errors.CategoryName && (
                <Typography color="error">
                  {errors.CategoryName.message}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "secondary.main",
                  color: "white",
                  mt: 3,
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
}
