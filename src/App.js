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
const ITEMS2 = [
  {
    id: 5,
    name: "text5",
  },
  {
    id: 6,
    name: "text6",
  },
  {
    id: 7,
    name: "text7",
  },
  {
    id: 8,
    name: "text8",
  },
];

const App = () => {
  const items = ITEMS;
  const [state, setState] = useState({
    order: items,
    order2: ITEMS2,
    dragOrder: items,
    dragOrder2: ITEMS2, // items order while dragging
    draggedIndex: null,
    draggedItem: null,
  });

  const calculateDeltaXY = async ({ x, y }) => {
    const translationy = Math.round(y / HEIGHT);
    const translationx = Math.round(x / 500);
    return { x: translationx, y: translationy };
  };

  const handleDrag = useCallback(
    async ({ translation, id }) => {
      const { x, y } = await calculateDeltaXY(translation);
      const delta = Math.round(translation.y / HEIGHT);
      let index = state.order.map((item) => item.id).indexOf(id);
      let { dragOrder, dragOrder2 } = state;
      let draggedItem = {};
      let ColumnIndex = 1;
      draggedItem = state.order[index];
      dragOrder = state.order.filter((index) => index.id !== id);
      dragOrder2 = state.order2.filter((index) => index.id !== id);
      if (index === -1) {
        index = state.order2.map((item) => item.id).indexOf(id);
        ColumnIndex = 2;
        draggedItem = state.order2[index];
      }

      if (!inRange(index + delta, 0, items.length)) {
        return;
      }

      //Test temp
      if (x > 0) {
        ColumnIndex = 2;
        dragOrder2.splice(0 + delta, 0, draggedItem);
      } else {
        dragOrder.splice(index + delta, 0, draggedItem);
      }

      setState((state) => ({
        ...state,
        draggedIndex: id,
        dragCollumnIndex: ColumnIndex,
        dragOrder,
        dragOrder2,
      }));
    },
    [state.order, state.order2, items.length]
  );

  const handleDragEnd = useCallback(() => {
    setState((state) => ({
      ...state,
      order: state.dragOrder,
      order2: state.dragOrder2,
      draggedIndex: null,
    }));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
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
      <Container>
        {state.order2.map((index) => {
          console.log(index);
          const isDragging =
            state.draggedIndex === index?.id && state.dragCollumnIndex === 2;
          const top = state.dragOrder.indexOf(index) * (HEIGHT + 10);
          const draggedTop = state.order2.indexOf(index) * (HEIGHT + 10);

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
    </div>
  );
};

export default App;

const Container = styled.div`
  width: 500px;
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
  left: calc(25vw - 150px);
  font-size: 20px;
  color: #777;
`;
