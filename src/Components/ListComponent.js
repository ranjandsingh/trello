import React, { useState, useEffect, useRef } from "react";

import Draggable from "./Draggable";
import { Container, Rect } from "./Wrappers";
import useDrop from "../Hooks/useDrop";
import { Card } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const ListComponent = ({ name, children, onDrop, handleMouse }) => {
  const ListRef = useRef();
  // const { dropState } = useDrop({
  //   ref: ListRef,
  //   name,
  //   onDrop,
  // });
  return (
    <div
      style={{ margin: "10px" }}
      onMouseEnter={() => handleMouse(name)}
      onMouseLeave={() => handleMouse(null)}
      ref={ListRef}
    >
      <Card>
        <CardContent>
          <h3>{name}</h3>
          <div className="body">{children}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListComponent;
