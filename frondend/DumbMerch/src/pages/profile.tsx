import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Navbar from "../layout/navbar";
import { Box, Stack } from "@mui/material";
import TransactionCard from "../layout/transaction";
import TransitionsModal from "../layout/editProfile";

export default function Profile() {
  return (
    <Box>
      <Navbar role={"user"} />
      <Stack direction={"row"} justifyContent={"center"} sx={{ mt: 15 }}>
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
          <Card
            sx={{
              m: 5,
              display: "flex",
              flexDirection: "row",
              height: "460px",
              width: "600px",
            }}
          >
            <CardActionArea
              sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}
            >
              <CardMedia
                component="img"
                height="100%"
                width="300px" 
                image="assets/produk.png"
                sx={{ objectFit: "cover" }} 
              />
              <CardContent
                sx={{
                  bgcolor: "black",
                  color: "white",
                  height:'100%',
                  width:'600px',
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ color: "secondary.main" }} variant="h6">
                  Name
                </Typography>
                <Typography sx={{ mb: 1 }}></Typography>
                <Typography sx={{ color: "secondary.main" }} variant="h6">
                  Email
                </Typography>
                <Typography sx={{ mb: 1 }}></Typography>
                <Typography sx={{ color: "secondary.main" }} variant="h6">
                  Phone
                </Typography>
                <Typography sx={{ mb: 1 }}></Typography>
                <Typography sx={{ color: "secondary.main" }} variant="h6">
                  Gender
                </Typography>
                <Typography sx={{ mb: 2 }}></Typography>
                <Typography sx={{ color: "secondary.main" }} variant="h6">
                  Address
                </Typography>
                <Typography></Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <TransitionsModal/>
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
