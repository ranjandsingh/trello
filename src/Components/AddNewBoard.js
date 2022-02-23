import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

import DeleteIcon from "@mui/icons-material/Delete";
import { CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const AddNewBoard = ({ item, onCreate }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [BoardName, setBoardName] = useState("");

  const Submit = () => {
    if (BoardName.length > 0) {
      onCreate(BoardName);
      setOpenDialog(false);
    }
  };
  return (
    <div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Board</DialogTitle>
        <DialogContent>
          <DialogContentText>Board Name</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setBoardName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={Submit}>Add</Button>
        </DialogActions>
      </Dialog>
      <Card
        onClick={() => setOpenDialog(true)}
        style={{
          height: "200px",
          minWidth: "150px",
          marginTop: "10px",
        }}
      >
        <CardHeader
          // action={
          //   <IconButton
          //     aria-label="settings"
          //     onClick={() => setOpenDialog(true)}
          //   >
          //     <DeleteIcon />
          //   </IconButton>
          // }
          title={"Create New Board"}
        />
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DashboardCustomizeIcon fontSize="large" />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewBoard;
