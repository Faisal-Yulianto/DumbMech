import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useEditProfile from "../hooks/useEditProfile";
import { CircularProgress, Backdrop } from "@mui/material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

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

const VisuallyHiddenInput = styled("input")({
  display: "none",
});

export default function EditProfileModal() {
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    fileNames,
    emailFromRedux,
    errorMessage,
    handleFileChange,
    setErrorMessage,
    isLoading,
  } = useEditProfile();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          bgcolor: "secondary.main",
          ml: 5,
          width: "43%",
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
            <Backdrop open={isLoading} style={{ zIndex: 1301 }}>
              <CircularProgress color="secondary" size={60} />{" "}
            </Backdrop>
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
                  label="Name"
                  variant="outlined"
                  {...register("username")}
                  InputProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    borderRadius: 1,
                  }}
                />
                {errors.username && (
                  <Typography color="error">
                    {errors.username.message as string}
                  </Typography>
                )}

                <TextField
                  label="Email"
                  variant="outlined"
                  value={emailFromRedux}
                  {...register("email")}
                  InputProps={{
                    style: { color: "black" },
                    readOnly: true,
                  }}
                  sx={{
                    borderRadius: 1,
                  }}
                />
                {errors.email && (
                  <Typography color="error">
                    {errors.email.message as string}
                  </Typography>
                )}

                <TextField
                  label="Phone"
                  variant="outlined"
                  {...register("phone")}
                  InputProps={{
                    style: { color: "black" },
                  }}
                  sx={{
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
                  label="Address"
                  variant="outlined"
                  {...register("address")}
                  InputProps={{
                    style: { color: "black" },
                  }}
                  sx={{
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
                    color: "white",
                    mt: 3,
                  }}
                >
                   {isLoading ? "Loading..." : "Update"}
                </Button>
              </Box>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
