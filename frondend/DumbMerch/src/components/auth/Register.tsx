import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent={"center"}
        alignItems={"center"}
        pt={10}
      >
        <Box p={6} width="800px">
          <img src="assets/logo-dumbmerch.png" width="264px" alt="Logo" />
          <Typography variant="h1" color="primary">
            Easy, Fast and Reliable
          </Typography>
          <Typography variant="h2" color="info" mb={5}>
            Go shopping for merchandise, just go to dumb merch shoping. The
            biggest merchandise in Indonesia
          </Typography>
          <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 4, mr:3 }} 
            >
              Register
            </Button>
            <Button
              sx={{ mt: 4 }}
              component={Link} to="/login"
            >
              login
            </Button>
        </Box>

        <Box bgcolor="#181818" width="416px" height="443px" p={4}>
          <Typography
            variant="h2"
            color="primary"
            fontWeight={"bold"}
            fontSize="26px"
            mb={2}
          >
            Register
          </Typography>
          <form>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Name"
              InputProps={{
                sx: {
                  bgcolor: "#BCBCBC", 
                },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Email"
              InputProps={{
                sx: {
                  bgcolor: "#BCBCBC",
                },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Password"
              type="password"
              InputProps={{
                sx: {
                  bgcolor: "#BCBCBC",
                },
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 4 , height:'50px'}} 
            >
              Register
            </Button>
          </form>
        </Box>
      </Stack>
    </Box>
  );
}
