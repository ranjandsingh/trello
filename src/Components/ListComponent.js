import React, { useState } from "react";

import { Card } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

const ListComponent = ({ name, children, onDrop, addTask }) => {
  const [taskNamem, setTaskName] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Submit = () => {
    if (taskNamem.length > 0) {
      addTask({
        name: taskNamem,
        currentList: name,
        description: "",
      });
      setOpen(false);
    }
  };

  return (
    <div
      style={{ margin: "10px" }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        onDrop(name);
      }}
    >
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add A New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Please Addd Task name Below</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTaskName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={Submit}>Add</Button>
        </DialogActions>
      </Dialog>
      <Card
        style={{
          height: "100vh",
          minWidth: "300px",
        }}
      >
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
          }
          title={<h3>{name}</h3>}
        />
        <CardContent>
          <div className="body">{children}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListComponent;
