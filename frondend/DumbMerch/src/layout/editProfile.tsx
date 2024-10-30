import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EditProfileSchema from "../schemas/editProfileSchema";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "80vh",
  bgcolor: "rgba(0, 0, 0, 0.8)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled("input")({
  display: "none",
});

type TokenPayload = {
  userId: number;
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const [fileNames, setFileNames] = React.useState<string[]>([]);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditProfileSchema),
  });

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const token = localStorage.getItem("token");
  let userId: number | null = null;
  if (token) {
    const decoded = jwtDecode<TokenPayload>(token);
    userId = decoded.userId;
  }

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("address", data.address);
    const files = (
      document.querySelector('input[type="file"]') as HTMLInputElement
    )?.files;

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("file", file);
      });
    }

    if (!userId) {
      setErrorMessage("User ID tidak ditemukan dalam token.");
      return;
    }

    try {
      const response = await axios.put(
        `${baseUrl}/api/profile/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update successful:", response.data);
      setSuccessMessage("Profil berhasil diperbarui.");
      setErrorMessage(""); // Reset error message
      setOpen(false);
      setFileNames([]); // Reset file names
    } catch (error: any) {
      setErrorMessage("Gagal memperbarui profil. Silakan coba lagi.");
      console.error(error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrorMessage(""); // Reset error message on close
    setSuccessMessage(""); // Reset success message on close
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files).map((file) => file.name);
      setFileNames(fileList);
      console.log("Files uploaded:", fileList);
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          bgcolor: "secondary.main",
          ml: 5,
          width: "46%",
          p: 2,
          mt: "-20px",
        }}
      >
        Edit Profile
        <EditIcon sx={{ ml: 2 }} />
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
              Edit Profile
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
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
                {successMessage && (
                  <Typography color="success.main">{successMessage}</Typography>
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
                      accept="image/*" // Optional: to restrict file types
                    />
                  </Button>
                  {fileNames.length > 0 && (
                    <Typography sx={{ mt: 1, color: "white" }}>
                      {fileNames.join(", ")}
                    </Typography>
                  )}
                </Stack>
                <TextField
                  id="outlined-textarea"
                  label="Name"
                  multiline
                  variant="outlined"
                  {...register("username")}
                  InputProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    bgcolor: "primary.main",
                    borderRadius: 1,
                  }}
                />
                {errors.username && (
                  <Typography color="error">
                    {errors.username.message as string}
                  </Typography>
                )}

                <TextField
                  id="outlined-email"
                  label="Email"
                  multiline
                  variant="outlined"
                  {...register("email")}
                  InputProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    bgcolor: "primary.main",
                    borderRadius: 1,
                  }}
                />
                {errors.email && (
                  <Typography color="error">
                    {errors.email.message as string}
                  </Typography>
                )}

                <TextField
                  id="outlined-phone"
                  label="Phone"
                  multiline
                  variant="outlined"
                  {...register("phone")}
                  InputProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    bgcolor: "primary.main",
                    borderRadius: 1,
                  }}
                />
                {errors.phone && (
                  <Typography color="error">
                    {errors.phone.message as string}
                  </Typography>
                )}

                <FormControl fullWidth sx={{ mt: 3 }}>
                  <InputLabel id="gender-select-label">Gender</InputLabel>
                  <Select
                    labelId="gender-select-label"
                    id="gender-select"
                    {...register("gender")}
                    sx={{
                      bgcolor: "primary.main",
                      color: "black",
                      borderRadius: 1,
                    }}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                  {errors.gender && (
                    <Typography color="error">
                      {errors.gender.message as string}
                    </Typography>
                  )}
                </FormControl>

                <TextField
                  id="outlined-address"
                  label="Address"
                  multiline
                  variant="outlined"
                  {...register("address")}
                  InputProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    bgcolor: "primary.main",
                    borderRadius: 1,
                  }}
                />
                {errors.address && (
                  <Typography color="error">
                    {errors.address.message as string}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "secondary.main",
                    mt: 4,
                    p: 2,
                    color: "white",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
