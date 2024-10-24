import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Navbar from "./navbar";
import { Box, Stack } from "@mui/material";
import TransactionCard from "./transaction";

export default function Profile() {
  return (
    <Box>
      <Navbar role={"user"} />
      <Stack direction={"row"} justifyContent={"center"} sx={{mt:15}}>
        <Box pl={10} sx={{ width: "50%" }}>
          <Typography
            sx={{
              color: "secondary.main",
              pl: 5,
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            My Profile
          </Typography>
          <Card sx={{ m: 5 }}>
            <CardActionArea>
              <Stack direction={"row"}>
                <CardMedia
                  component="img"
                  height="435"
                  width="338"
                  image="assets/produk.png "
                />
                <CardContent sx={{ bgcolor: "black", color: "white" }}>
                  <Typography sx={{ color: "secondary.main" }} variant="h6">
                    Name
                  </Typography>
                  <Typography sx={{ mb: 3 }}>yosep</Typography>
                  <Typography sx={{ color: "secondary.main" }} variant="h6">
                    Email
                  </Typography>
                  <Typography sx={{ mb: 3 }}>yosep@gmail.com</Typography>
                  <Typography sx={{ color: "secondary.main" }} variant="h6">
                    Gender
                  </Typography>
                  <Typography sx={{ mb: 3 }}>Male</Typography>
                  <Typography sx={{ color: "secondary.main" }} variant="h6">
                    Address
                  </Typography>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem, voluptatum. Ex, quasi? Molestias temporibus
                    provident, soluta obcaecati maiores fuga eveniet nulla
                    impedit
                  </Typography>
                </CardContent>
              </Stack>
            </CardActionArea>
          </Card>
        </Box>
        <Box sx={{ width: "40%" }}>
          <Typography
            sx={{
              color: "secondary.main",
              pl: 5,
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            My Transaction
          </Typography>

          <TransactionCard
            productName="Mouse"
            date="Saturday, 14 July 2024"
            price="600.000"
            subtotal="600.000"
            productImage="assets/produk.png"
            logoImage="assets/logo-dumbmerch.png"
          />
            <TransactionCard
            productName="Mouse"
            date="Saturday, 14 July 2024"
            price="600.000"
            subtotal="600.000"
            productImage="assets/produk.png"
            logoImage="assets/logo-dumbmerch.png"
          />
        </Box>
      </Stack>
    </Box>
  );
}
