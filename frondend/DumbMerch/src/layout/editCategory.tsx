import { Box, Button, TextField, Typography } from "@mui/material";
import Navbar from "./navbar";
import { useParams } from "react-router-dom";

export default function EditCategory() {
  useParams();
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
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
