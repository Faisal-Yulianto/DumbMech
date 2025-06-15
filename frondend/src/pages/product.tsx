import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from '../store/productSlice';
import { AppDispatch, RootState } from '../store/store'; 
import { Box, Button, Stack, Typography } from '@mui/material';
import Navbar from '../layout/navbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DraggableDialog from '../layout/delete-confirm';
import TransitionModal from '../layout/addProduct';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.grey[900],
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.info.dark,
  },
  '& td, & th': {
    color: theme.palette.primary.main,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Product = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state: RootState) => state.product);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (id: number) => {
    navigate(`/product/edit/${id}`);
  };

  const handleOpenDialog = (id: number) => {
    setSelectedRow(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmAction = () => {
    if (selectedRow !== null) {
      dispatch(deleteProduct(selectedRow));
    }
    setDialogOpen(false);
  };

  return (
    <Box>
      <Navbar role={"admin"} />
      <Box sx={{ width: '90%', height: 'max-content', pt: 20, margin: 'auto' }}>
        <Stack direction="row" justifyContent={"space-between"} >
          <Typography variant="h5" sx={{ color: 'primary.main', pb: 3, fontWeight: 'bold' }}>
            List Product
          </Typography>
          <TransitionModal />
        </Stack>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography>Error: {error}</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>No</StyledTableCell>
                  <StyledTableCell align="center">Photo</StyledTableCell>
                  <StyledTableCell align="center">Product Name</StyledTableCell>
                  <StyledTableCell align="center">Product Desc</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Qty</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <StyledTableRow key={product.id}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell align="center">
                      <img src={product.image || 'assets/placeholder.png'} alt={product.productName} style={{ width: 50, height: 50 }} />
                    </StyledTableCell>
                    <StyledTableCell align="center">{product.productName}</StyledTableCell>
                    <StyledTableCell align="center">{product.productDesc}</StyledTableCell>
                    <StyledTableCell align="center">{product.price}</StyledTableCell>
                    <StyledTableCell align="center">{product.qty}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button variant="contained" color="error" onClick={() => handleEdit(product.id)} sx={{ color: 'primary.main', fontWeight: 'bold', width: 100 }}>
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleOpenDialog(product.id)} sx={{ ml: 1, color: 'primary.main', fontWeight: 'bold', width: 100 }}>
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <DraggableDialog open={dialogOpen} handleClose={handleCloseDialog} handleConfirm={handleConfirmAction} />
      </Box>
    </Box>
  );
};

export default Product;
