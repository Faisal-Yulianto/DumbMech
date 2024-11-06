import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import theme from '../theme/theme';
import { Link } from 'react-router-dom';

interface ActionAreaCardProps {
  productId: number
  productName: string;
  productDesc: string;
  price: number;
  image?: string; 
  qty: number;
}

export default function ActionAreaCard({ productName, price, image, qty, productId }: ActionAreaCardProps) {
  return (
      <Card sx={{ maxWidth: 355, ml: '20px',mb:2, height: 430, borderRadius: '10px' }}>
        <CardActionArea component={Link} to={`/detail/${productId}`}>
          <CardMedia
            component="img"
            height="312"
            image={image || "assets/produk.png"} 
            alt={productName}
          />
          <CardContent sx={{ bgcolor: '#212121',p:2 }}>
            <Typography gutterBottom variant="h5" sx={{ color: theme.palette.secondary.main }}>
              {productName}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.primary.main, mt: 1 }}>
              Rp.{price.toLocaleString()} 
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.primary.main, mt: 1 }}>
              Stock: {qty}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
  );
}
