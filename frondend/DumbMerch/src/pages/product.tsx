import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../layout/navbar";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DraggableDialog from "../layout/delete-confirm"; 
import TransitionModal from "../layout/addProduct";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.grey[900],
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.info.dark,
  },
  "& td, & th": {
    color: theme.palette.primary.main,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(No: number, photo: string, product_name: string, product_desc: string, price: string, qty: number) {
  return { No, photo, product_name, product_desc, price, qty };
}

const rows = [
  createData(1, "assets/produk.png", "Mouse", "Kualitas tinggi untuk gaming", "500.000", 600),
  createData(2, "assets/produk.png", "Keyboard", "Ergonomis dan nyaman", "1.200.000", 250),
  createData(3, "assets/produk.png", "Headphone", "Suara jernih dengan bass yang kuat", "700.000", 150),
];

export default function Product() {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility
  const [selectedRow, setSelectedRow] = useState<number | null>(null); // State to track selected row

  const handleEdit = (id: number) => {
    navigate(`/product/edit/${id}`);
  };

  const handleOpenDialog = (id: number) => {
    setSelectedRow(id); // Set the selected row when opening dialog
    setDialogOpen(true); // Open the dialog
  };

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Close the dialog and reset the selected row to null
   */

/******  f6f2f600-543d-44d9-ba94-1641ccc3f266  *******/  const handleCloseDialog = () => {
    setDialogOpen(false); 
  };

  const handleConfirmAction = () => {
    if (selectedRow !== null) {
      console.log(`Delete action confirmed for product ID: ${selectedRow}`);
    }
    setDialogOpen(false); 
  }

  return (
    <Box>
      <Navbar role={"admin"} />
      <Box sx={{ width: "90%", height: "max-content", pt: 20, margin: "auto" }}>
        <Stack direction="row" justifyContent={'space-between'}>
        <Typography variant="h5" sx={{ color: 'primary.main', pb: 3, fontWeight: 'bold' }}>List Product</Typography>
        <TransitionModal/>
        </Stack>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ fontWeight: 'bold' }}>No</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>Photo</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>Product Name</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>Product Desc</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>Price</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>Qty</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.No}>
                  <StyledTableCell component="th" scope="row">
                    {row.No}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <img src={row.photo} alt={row.product_name} style={{ width: 50, height: 50 }} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.product_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.product_desc}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.price}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.qty}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ color: "primary.main", fontWeight: "bold", width: 100 }}
                      onClick={() => handleEdit(row.No)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpenDialog(row.No)}
                      sx={{ ml: 1, color: "primary.main", fontWeight: "bold", width: 100 }}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <DraggableDialog
          open={dialogOpen}
          handleClose={handleCloseDialog}
          handleConfirm={handleConfirmAction}
        />
      </Box>
    </Box>
  );
}
