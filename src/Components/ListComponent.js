import React, { useState, useEffect, useRef } from "react";

import Draggable from "./Draggable";
import { Container, Rect } from "./Wrappers";
import useDrop from "../Hooks/useDrop";

const ListComponent = ({ name, children, onDrop, handleMouse }) => {
  const ListRef = useRef();
  // const { dropState } = useDrop({
  //   ref: ListRef,
  //   name,
  //   onDrop,
  // });
  return (
    <div
      onMouseEnter={() => handleMouse(name)}
      onMouseLeave={() => handleMouse(null)}
      ref={ListRef}
    >
      <h3>{name}</h3>
      <div className="body">{children}</div>
    </div>
  );
};

export default ListComponent;
