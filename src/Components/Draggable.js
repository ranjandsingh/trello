import React, { useState, useEffect, useMemo, useCallback } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import AlertDialog from "./AlertDialog";
import CardContent from "@mui/material/CardContent";

import DeleteIcon from "@mui/icons-material/Delete";

const POSITION = { x: 0, y: 0 };

const Drraggable = ({
  children,
  onDrag,
  onDragEnd,
  id,
  item,
  mouseDown,
  onDelete,
}) => {
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
  });
  const [openDialog, setOpenDialog] = useState(false);

  const styles = useMemo(
    () => ({
      cursor: state.isDragging ? "-webkit-grabbing" : "-webkit-grab",
      // transform: `translate(${state.translation.x}px,${state.translation.y}px)`,
      transition: state.isDragging ? "none" : "transform 500ms",
      zIndex: state.isDragging ? 2 : 1,
      // position: state.isDragging ? "absolute" : "relative",
    }),
    [state.isDragging, state.translation]
  );

  const handleMouseDown = useCallback(
    ({ clientX, clientY }) => {
      setState((state) => ({
        ...state,
        isDragging: true,
        origin: { x: clientX, y: clientY },
      }));
      mouseDown(item);
    },
    [item, id]
  );

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      //   const translation = {
      //     x: clientX - state.origin.x,
      //     y: clientY - state.origin.y,
      //   };
      //   setState((state) => ({
      //     ...state,
      //     translation,
      //   }));
      //   onDrag({ translation, id });
    },
    [state.origin, onDrag, id]
  );

  const handleMouseUp = useCallback(() => {
    setState((state) => ({
      ...state,
      isDragging: false,
    }));
  }, []);

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      setState((state) => ({ ...state, translation: { x: 0, y: 0 } }));
    }
  }, [state.isDragging, handleMouseMove, handleMouseUp]);

  const handleClickOpen = () => {
    // console.log("handleClickOpen");
    onDelete(item.id);
    setOpenDialog(false);
  };

  return (
    <div style={styles} onMouseDown={handleMouseDown} draggable>
      <AlertDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleSubmit={handleClickOpen}
        name="Task"
      />
      <Card
        style={{
          height: "100px",
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
      </Card>
      {children}
    </div>
  );
};

export default Drraggable;
