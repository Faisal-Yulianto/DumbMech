import { Box, Stack, Typography } from "@mui/material";
import Navbar from "./navbar";
import ActionAreaCard from "./card";
import theme from "../theme/theme";

export default function Home() {
  return (
    <Box>
      <Navbar />
      <Box>
        <Typography
          sx={{
            color: theme.palette.secondary.main,
            fontSize: 30,
            fontWeight: "bold",
            ml: "90px",
            mt: "50px",
            mb: "20px"
          }}
        >
          Product
        </Typography>
        <Stack direction={'row'} sx={{ml:10}}>
          <ActionAreaCard />
          <ActionAreaCard/>
        </Stack>
      </Box>
    </Box>
  );
}
