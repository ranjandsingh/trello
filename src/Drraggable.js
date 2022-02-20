import React, { useState, useEffect, useMemo, useCallback } from "react";

const POSITION = { x: 0, y: 0 };

const Drraggable = ({ children }) => {
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
  });

  const styles = useMemo(
    () => ({
      cursor: state.isDragging ? "-webkit-grabbing" : "-webkit-grab",
      transform: `translate(${state.translation.x}px,${state.translation.y})`,
      transition: state.isDragging ? "none" : "transform 500ms",
      zIndex: state.isDragging ? 2 : 1,
      position: state.isDragging ? "absolute" : "relative",
    }),
    [state.isDragging, state.translation]
  );
  const handleMouseDown = useCallback(({ clientX, ClientY }) => {
    setState((state) => ({
      ...state,
      isDragging: true,
      origin: { x: clientX, y: ClientY },
    }));
  }, []);

  const handleMouseMove = useCallback(
    ({ clientX, ClientY }) => {
      setState((state) => ({
        ...state,
        translation: {
          x: clientX - state.origin.x,
          y: ClientY - state.origin.y,
        },
      }));
    },
    [state.origin]
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
      setState((state) => ({ ...state, translation: POSITION }));
    }
  }, [state.isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div style={styles} onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};

export default Drraggable;
