import Navbar from "./navbar";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {
  Box,
  Avatar,
  Typography,
  Divider,
  Stack,
  TextField,
  Button,
} from "@mui/material";

export default function Complain() {
  return (
    <Box>
      <Navbar role={"user"} />
      <Box sx={{ display: "flex", height: "100vh",mt:15}}>
        {/* Sidebar Kiri: Daftar User */}
        <Box
          sx={{
            width: "35%",
            color: "primary.main",
            pl: 7,
            pt: 4,
          }}
        >
          {/* Daftar User */}
          <Stack spacing={2}>
            {/* User 1 */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar alt="User 1" src="assets/avatar1.png" />
              <Box>
                <Typography variant="body1">User 1</Typography>
                <Typography variant="body2" color="info.main">anjay</Typography>
              </Box>
            </Stack>

            <Divider />

            {/* User 2 */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar alt="User 2" src="assets/avatar2.png" />
              <Box>
                <Typography variant="body1">User 2</Typography>
                <Typography variant="body2" color="info.main">bangsat</Typography>
              </Box>
            </Stack>

            <Divider />

            {/* Tambah User lain jika diperlukan */}
          </Stack>
        </Box>

        {/* Chat Box: Sebelah Kanan */}
        <Box
          sx={{
            borderLeft: "1px solid #6A6A6A",
            height:'maxHeight',
            width: "75%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              mb: 2,
              color: "primary.main",
              p: 5,
            }}
          >
          
            <Stack
              direction="row"
              spacing={2}
              alignItems="flex-start"
              sx={{ mb: 2 }}
            >
              <Avatar alt="User 1" src="assets/avatar1.png" />
              <Box
                sx={{
                  bgcolor: "#6A6A6A",
                  borderRadius: "10px",
                  p: 2,
                  maxWidth: "70%",
                }}
              >
                <Typography variant="body1">asulah</Typography>
              </Box>
            </Stack>

           
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mb: 2 }}
            >
              <Box
                sx={{
                  bgcolor: "#262626",
                  borderRadius: "10px",
                  p: 2,
                  maxWidth: "70%",
                }}
              >
                <Typography variant="body1">mumet njir</Typography>
              </Box>
              <Avatar alt="You" src="assets/your-avatar.png" />
            </Stack>

          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              position: "fixed",
              bottom: 0,
              width: "66%",
              p: 2,
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Type a message..."
              sx={{
                mr: 2,
                borderRadius:3,
                bgcolor: "#262626",
                "& .MuiOutlinedInput-root":{},
                "& input": {
                  color: "primary.main", 
                },
                "& ::placeholder": {
                  color: "primary.main", 
                  opacity: .5, 
                },
              }}
            />
            <Button variant="contained" color="primary">
              <SendRoundedIcon/>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
