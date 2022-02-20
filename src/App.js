import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { range, inRange } from "lodash";
import Draggable from "./Draggable";

const MAX = 5;
const HEIGHT = 80;

const ITEMS = [
  {
    id: 1,
    name: "text1",
  },
  {
    id: 2,
    name: "text2",
  },
  {
    id: 3,
    name: "text3",
  },
  {
    id: 4,
    name: "text4",
  },
];

const App = () => {
  const items = ITEMS;
  const [state, setState] = useState({
    order: items,
    dragOrder: items, // items order while dragging
    draggedIndex: null,
    draggedItem: null,
  });

  const handleDrag = useCallback(
    ({ translation, id }) => {
      const delta = Math.round(translation.y / HEIGHT);
      const index = state.order.map((item) => item.id).indexOf(id);
      const draggedItem = state.order[index];
      console.log("draggedItem", draggedItem);
      const dragOrder = state.order.filter((index) => index.id !== id);

      if (!inRange(index + delta, 0, items.length)) {
        return;
      }

      dragOrder.splice(index + delta, 0, draggedItem);

      setState((state) => ({
        ...state,
        draggedIndex: id,
        dragOrder,
      }));
    },
    [state.order, items.length]
  );

  const handleDragEnd = useCallback(() => {
    setState((state) => ({
      ...state,
      order: state.dragOrder,
      draggedIndex: null,
    }));
  }, []);

  return (
    <Container>
      {state.order.map((index) => {
        console.log(index);
        const isDragging = state.draggedIndex === index?.id;
        const top = state.dragOrder.indexOf(index) * (HEIGHT + 10);
        const draggedTop = state.order.indexOf(index) * (HEIGHT + 10);

        return (
          <Draggable
            key={index.name}
            id={index.id}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <Rect isDragging={isDragging} top={isDragging ? draggedTop : top}>
              {index.name}
            </Rect>
          </Draggable>
        );
      })}
    </Container>
  );
};

export default App;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const Rect = styled.div.attrs((props) => ({
  style: {
    transition: props.isDragging ? "none" : "all 500ms",
    top: props.top + "px",
  },
}))`
  width: 300px;
  user-select: none;
  height: ${HEIGHT}px;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: calc(50vw - 150px);
  font-size: 20px;
  color: #777;
`;
