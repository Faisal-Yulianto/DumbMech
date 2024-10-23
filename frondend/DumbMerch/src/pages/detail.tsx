import { Box, Button, Stack,Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import theme from "../theme/theme";
import Navbar from "./navbar";

export default function Detail() {
  return (
    <Box>
      <Navbar role={"user"} />
      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} sx={{mt:15}}>
        <Card
          sx={{ Width: '600px' , m: "50px", Height: 410, borderRadius: "10px" }}
        >
          <CardActionArea>
            <CardMedia component="img" height="500" image="assets/produk.png" />
          </CardActionArea>
        </Card>
        <Box sx={{color : 'white',width: '600px'}}>
           <Typography sx={{fontSize:30,fontWeight:'bold',color: theme.palette.secondary.main}}>Mouse</Typography>
           <Typography sx={{fontSize:15,mb:3}}>Stock : 600</Typography>
           <Typography sx={{fontSize:15}}>- Wireless Mouse</Typography>
           <Typography sx={{fontSize:15}}>- Konektivitas wireless 2.4 GHz</Typography>
           <Typography sx={{fontSize:15}}>- Jarak wireless hingga 10m</Typography>
           <Typography sx={{fontSize:15}}>- plug and play</Typography>
           <Typography sx={{fontSize:15,mb:5}}>- Baterai tahan hingga 15 bulan</Typography>
           <Typography sx={{fontSize:15}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel repellendus, sequi quos ullam nemo maiores perspiciatis itaque recusandae odio dolor provident laudantium ad tempora! Nisi exercitationem ipsa esse quo mollitia repellendus pariatur voluptates hic optio debitis corrupti, eos iure ex? Obcaecati, nemo. Odio maxime ipsam adipisci reprehenderit quae sed ipsa, recusandae nesciunt porro, unde tempora enim, fugit minima! Rem veritatis at ab inventore temporibus consequuntur beatae officiis obcaecati quidem repudiandae</Typography>
           <Typography sx={{fontSize:12,fontWeight:'bold',color: theme.palette.secondary.main,textAlign:'end',mt:2}}>Rp.300.900</Typography>
           <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 2, height: "40px" }}
            >
              Buy
            </Button>
        </Box>
      </Stack>
    </Box>
  );
}
