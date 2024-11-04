  import { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchProfile, selectProfile } from "../store/profileSlice";
  import { Box, Stack, Typography, CircularProgress } from "@mui/material";
  import Navbar from "../layout/navbar";
  import TransactionCard from "../layout/transaction";
  import TransitionsModal from "../layout/editProfile";
  import { AppDispatch } from "../store/store";

  export default function Profile() {
    const dispatch = useDispatch<AppDispatch>();
    const profileState = useSelector(selectProfile);
    const { data: profile, status, error } = profileState;

    useEffect(() => {
      if (status === "idle") {
        dispatch(fetchProfile());
      }
    }, [dispatch, status]);

    if (status === "loading") {
      return <CircularProgress color="secondary" />;
    }

    if (status === "failed") {
      return <Typography color="error">Error: {error}</Typography>;
    }

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
            <Box
              sx={{
                m: 5,
                display: "flex",
                flexDirection: "row",
                height: "460px",
                width: "652px",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Box
                component="div"
                sx={{
                  width: "50%",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={profile?.image || "assets/produk.png"}
                  alt="Profile Image"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: "50%",
                  bgcolor: "black",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 2,
                }}
              >
                <Box>
                  <Typography sx={{ color: "secondary.main" }} variant="h6">
                    Username
                  </Typography>
                  <Typography sx={{ mb: 1 }}>{profile?.user.username}</Typography>
                </Box>

                <Box>
                  <Typography sx={{ color: "secondary.main" }} variant="h6">
                    Email
                  </Typography>
                  <Typography sx={{ mb: 1 }}>{profile?.user.email}</Typography>
                </Box>

                <Box>
                  <Typography sx={{ color: "secondary.main" }} variant="h6">
                    Phone
                  </Typography>
                  <Typography sx={{ mb: 1 }}>{profile?.phone}</Typography>
                </Box>

                <Box>
                  <Typography sx={{ color: "secondary.main" }} variant="h6">
                    Gender
                  </Typography>
                  <Typography sx={{ mb: 2 }}>{profile?.gender}</Typography>
                </Box>

                <Box>
                  <Typography sx={{ color: "secondary.main" }} variant="h6">
                    Address
                  </Typography>
                  <Typography>{profile?.address}</Typography>
                </Box>
              </Box>
            </Box>

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
