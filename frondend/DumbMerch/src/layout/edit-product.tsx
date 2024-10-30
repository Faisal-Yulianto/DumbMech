import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Navbar from "./navbar";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const VisuallyHiddenInput = styled.input`
  display: none; // Sembunyikan input file dari tampilan
`;
export default function EditProduct() {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files).map((file) => file.name);
      setFileNames(fileList);
    }
  };
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
          Edit Product
        </Typography>
        <Stack direction={'row'} alignItems={'center'}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          sx={{ bgcolor: "secondary.main", color: "primary.main", p: 1, mt: 2,width:'130px' }}
        >
          Upload Image
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            multiple
          />
        </Button>
        <Box ml={2} mt={1}>
          {fileNames.length > 0 ? (
            fileNames.map((name, index) => (
              <Typography key={index} variant="h2" sx={{color:'primary.main'}}>
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
          id="outlined-textarea"
          label="Product Name"
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
         <TextField
          id="outlined-textarea"
          label="Product Desc"
          multiline
          variant="outlined"
          InputProps={{
            style: { color: "white", height:'120px'},
          }}
          sx={{
            bgcolor: "#262626",
            borderRadius: 1,
          }}
        />
         <TextField
          id="outlined-textarea"
          label="Price"
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
         <TextField
          id="outlined-textarea"
          label="Qty"
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
            mt: 10,
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
