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
import { Box, Button, Stack, Typography } from "@mui/material";
import DraggableDialog from "../layout/delete-confirm";
import TransitionModal from "../layout/addCategory";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchCategories, deleteCategory } from "../store/categorySlice";
import { useEffect } from "react";

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

export default function Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector((state: RootState) => state.Category.categories);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleEdit = (id: number) => {
    navigate(`/category/edit/${id}`);
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
      dispatch(deleteCategory(selectedRow))
        .unwrap()
        .then(() => {
        })
        .catch((error) => {
          console.error("Failed to delete category:", error);
        });
    }
    setDialogOpen(false);
  };

  return (
    <Box>
      <Navbar role={"admin"} />
      <Box sx={{ width: "90%", height: "max-content", pt: 20, margin: "auto" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h5"
            sx={{ color: "primary.main", pb: 3, fontWeight: "bold" }}
          >
            List Category
          </Typography>
          <TransitionModal />
        </Stack>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ fontWeight: "bold" }}>No</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: "bold" }}>
                  Category Name
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: "bold" }}>
                  Action
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories
                .slice() // Create a shallow copy of the array
                .sort((a, b) => a.id - b.id) // Sort by ID
                .map((category, index) => (
                  <StyledTableRow key={category.id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">{category.categoryName}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        sx={{
                          color: "primary.main",
                          fontWeight: "bold",
                          width: 100,
                        }}
                        onClick={() => handleEdit(category.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleOpenDialog(category.id)}
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
        <DraggableDialog
          open={dialogOpen}
          handleClose={handleCloseDialog}
          handleConfirm={handleConfirmAction}
        />
      </Box>
    </Box>
  );
}
