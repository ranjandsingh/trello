import React, { useState, useEffect, useMemo, useCallback } from "react";

const POSITION = { x: 0, y: 0 };

const Drraggable = ({ children, onDrag, onDragEnd, id, item, mouseDown }) => {
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
  });

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
    onDragEnd(item);
  }, [onDragEnd]);

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

  return (
    <div style={styles} onMouseDown={handleMouseDown} draggable>
      {children}
    </div>
  );
};

export default Drraggable;
