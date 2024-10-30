import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import registerSchema from "../../schemas/registerSchema";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate(); 
  const [errorMessage, setErrorMessage] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });
  
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`${baseUrl}/api/auth/register`, data); 
      console.log('Registration successful:', response.data);
      navigate('/login'); 
    } catch (error: any) {
      setErrorMessage('Registration failed. Please try again.'); 
      console.error(error);
    }
  };

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
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Name"
              {...register('username')}
              InputProps={{
                sx: {
                  bgcolor: "#BCBCBC", 
                },
              }}
              error={!!errors.username} 
              helperText={errors.name?.message as string} 
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Email"
              type="email"
              {...register('email')}
              InputProps={{
                sx: {
                  bgcolor: "#BCBCBC",
                },
              }}
              error={!!errors.email} 
              helperText={errors.email?.message as string} 
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Password"
              type="password"
              {...register('password')}
              InputProps={{
                sx: {
                  bgcolor: "#BCBCBC",
                },
              }}
              error={!!errors.password} 
              helperText={errors.password?.message as string}
            />
            <Button
              type="submit" 
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 4, height:'50px'}} 
            >
              Register
            </Button>
          </form>
        </Box>
      </Stack>
    </Box>
  );
}
