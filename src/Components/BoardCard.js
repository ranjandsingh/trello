import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import AlertDialog from "./AlertDialog";
import DashboardIcon from "@mui/icons-material/Dashboard";

import DeleteIcon from "@mui/icons-material/Delete";
import { CardContent } from "@mui/material";

const BoardCard = ({ item, onDelete, onClick }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteTask = () => {
    onDelete(item.id);
    setOpenDialog(false);
  };
  return (
    <div>
      <AlertDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleSubmit={handleDeleteTask}
        name="Board"
      />
      <Card
        onClick={() => onClick(item.id)}
        style={{
          height: "200px",
          minWidth: "150px",
          marginTop: "10px",
        }}
      >
        <CardHeader
          action={
            <IconButton
              aria-label="settings"
              onClick={() => setOpenDialog(true)}
            >
              <DeleteIcon />
            </IconButton>
          }
          title={item.name}
        />
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DashboardIcon fontSize="large" />
        </CardContent>
      </Card>
    </div>
  );
};

export default BoardCard;
