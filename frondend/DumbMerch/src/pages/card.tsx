import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import theme from '../theme/theme';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 241,ml:'20px', Height:410,borderRadius:'10px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="312"
          image="assets/produk.png"
          alt="green iguana"
        />
        <CardContent sx={{ bgcolor: '#212121'}}>
          <Typography gutterBottom variant="h5" sx={{ color: theme.palette.secondary.main}}>
            Mouse
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.primary.main,mt:1 }}>
            Rp.700.000
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.primary.main,mt:1 }}>
            Stock : 600
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}