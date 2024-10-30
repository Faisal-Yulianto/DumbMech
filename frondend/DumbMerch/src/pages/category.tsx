import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../layout/navbar";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import DraggableDialog from "../layout/delete-confirm"; // Import dialog

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

function createData(No: number, Category_Name: string) {
  return { No, Category_Name };
}

const rows = [
  createData(1, "mouse"),
  createData(2, "keyboard"),
  createData(3, "headphone"),
];

export default function Category() {
  const navigate = useNavigate();
  
  // State untuk membuka dialog
  const [dialogOpen, setDialogOpen] = React.useState(false);
  
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null); // Row yang dipilih

  const handleEdit = (id: number) => {
    navigate(`/category/edit/${id}`);
  };

  // Buka dialog dengan row yang dipilih
  const handleOpenDialog = (id: number) => {
    setSelectedRow(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmAction = () => {
    // Lakukan action delete di sini
    console.log(`Delete action confirmed for category ID: ${selectedRow}`);
    setDialogOpen(false);
  };

  return (
    <Box>
      <Navbar role={"admin"} />
      <Box sx={{ width: "90%", height: "max-content", pt: 15, margin: "auto" }}>
        <Typography
          variant="h5"
          sx={{ color: "primary.main", pb: 3, fontWeight: "bold" }}
        >
          List Category
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ fontWeight: "bold" }}>
                  No
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: "bold" }}>
                  Category Name
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: "bold" }}>
                  Action
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.No}>
                  <StyledTableCell component="th" scope="row">
                    {row.No}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Category_Name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        color: "primary.main",
                        fontWeight: "bold",
                        width: 100,
                      }}
                      onClick={() => handleEdit(row.No)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpenDialog(row.No)} // Buka dialog saat klik Delete
                      sx={{
                        ml: 1,
                        color: "primary.main",
                        fontWeight: "bold",
                        width: 100,
                      }}
                    >
                      Delete
                    </Button>
                    </StyledTableCell>
                  </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* DraggableDialog terhubung ke state dialogOpen */}
        <DraggableDialog
          open={dialogOpen}
          handleClose={handleCloseDialog}
          handleConfirm={handleConfirmAction}
        />
      </Box>
    </Box>
  );
}
