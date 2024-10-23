import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "./navbar";
import { Box, Button } from "@mui/material";

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
  return (
    <Box>
      <Navbar role={"admin"} />
      <Box sx={{ width: "90%", height: "max-content", pt: 15, margin: "auto" }}>
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
                    <img src={row.photo} alt={row.product_name} style={{ width: 50, height: 50 }} /> {/* Menampilkan foto produk */}
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
                      sx={{ color: "primary.main", fontWeight: "bold",width:100 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ ml: 1, color: "primary.main", fontWeight: "bold",width:100 }}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
