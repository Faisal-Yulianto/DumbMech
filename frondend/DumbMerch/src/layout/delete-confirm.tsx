import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";

interface DraggableDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({
  open,
  handleClose,
  handleConfirm,
}: DraggableDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      fullWidth 
    >
      <DialogTitle
        style={{ cursor: "move" }}
        id="draggable-dialog-title"
      >
        Delete data?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this data?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleConfirm} sx={{bgcolor:'error.main',width:'110px'}}>
          Yes
        </Button>
        <Button onClick={handleClose} sx={{bgcolor:'secondary.main',width:'110px'}}>No</Button>
      </DialogActions>
    </Dialog>
  );
}
