import React, { useState, useCallback, useEffect, useContext } from "react";

import { range, inRange } from "lodash";
import Draggable from "../Components/Draggable";
import ListComponent from "../Components/ListComponent";
import { Container, Rect } from "../Components/Wrappers";
import Sidebar from "../Components/Sidebar";
import Button from "@mui/material/Button";
import Context from "../Context";

const MAX = 5;
const HEIGHT = 180;

const BoardScreen = () => {
  const { globalState, setGlobalState, currrentBorad } = useContext(Context);

  // const [state, setState] = useState({
  //   // order: items,
  //   // order2: ITEMS2,
  //   // dragOrder: items,
  //   // dragOrder2: ITEMS2, // items order while dragging
  //   draggedIndex: null,
  //   draggedItem: null,
  //   currentCountainer: null,
  //   currentList: null,
  // });
  const [LocalBoard, setLocalBoard] = useState(currrentBorad);
  const [loaded, setLoaded] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [allTasks, SetAllTasks] = useState(null);
  useEffect(() => {
    const TempState = [];
    LocalBoard.list.map((item) => {
      TempState[item] = LocalBoard.tasks.filter((i) => i.currentList === item);
    });
    SetAllTasks(TempState);
    setLoaded(true);
  }, [LocalBoard]);

  const calculateDeltaXY = async ({ x, y }) => {
    const translationy = Math.round(y / HEIGHT);
    const translationx = Math.round(x / 500);
    return { x: translationx, y: translationy };
  };

  const handleMouseDown = (item) => {
    setCurrentItem(item);
    return;
  };

  const updateTask = (item, currentList) => {
    const TempState = [];
    const { tasks } = LocalBoard;
    tasks.map((i) => {
      if (i.id === item.id) {
        i.currentList = currentList;
        return;
      }
    });
    setLocalBoard({ ...LocalBoard, tasks });
    return;
  };
  const HandleDrop = (name) => {
    console.log(currentItem);
    console.log(name);
    if (currentItem.currentList === name || name === null) {
      // SetAllTasks((allTasks) => ({
      //   ...allTasks,
      //   [item.currentList]: state.dragOrder,
      // }));
      return;
    }
    updateTask(currentItem, name);

    // SetAllTasks((allTasks) => ({
    //   ...allTasks,
    //   [currentItem.currentList]: allTasks[currentItem.currentList].filter(
    //     (i) => i.id !== currentItem.id
    //   ),
    //   [name]: [...allTasks[name], currentItem],
    // }));
    // console.log("drop" + item);
  };
  // const handleDrag = useCallback(
  //   async ({ translation, id }) => {
  //   const { x, y } = await calculateDeltaXY(translation);
  //   const delta = Math.round(translation.y / HEIGHT);
  //   let index = state.order.map((item) => item.id).indexOf(id);
  //   // const dragOrder =
  //   let { dragOrder, dragOrder2 } = state;
  //   let draggedItem = {};
  //   let ColumnIndex = 1;
  //   draggedItem = state.order[index];
  //   dragOrder = state.order.filter((index) => index.id !== id);
  //   dragOrder2 = state.order2.filter((index) => index.id !== id);
  //   if (index === -1) {
  //     index = state.order2.map((item) => item.id).indexOf(id);
  //     ColumnIndex = 2;
  //     draggedItem = state.order2[index];
  //   }
  //   if (!inRange(index + delta, 0, items.length)) {
  //     return;
  //   }
  //   //Test temp
  //   if (x > 0) {
  //     ColumnIndex = 2;
  //     dragOrder2.splice(0 + delta, 0, draggedItem);
  //   } else {
  //     dragOrder.splice(index + delta, 0, draggedItem);
  //   }
  //   setState((state) => ({
  //     ...state,
  //     draggedIndex: id,
  //     dragCollumnIndex: ColumnIndex,
  //     dragOrder,
  //     dragOrder2,
  //   }));
  //   },
  //   [state]
  // );

  // const handleDragEnd = useCallback((item) => {
  //   setState((state) => ({
  //     ...state,
  //     order: state.dragOrder,
  //     order2: state.dragOrder2,
  //     draggedIndex: null,
  //   }));
  // }, []);
  // const handleMouse = useCallback((name) => {
  //   setState((state) => ({
  //     ...state,
  //     currentList: name,
  //   }));
  //   console.log("name" + name);
  // }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* <Button
        onClick={() => {
          setGlobalState((state) => ({
            ...state,
            currentBoard: currrentBorad,
          }));
        }}
      >
        Test
      </Button> */}
      {loaded &&
        LocalBoard.list.map((item) => (
          <div
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => HandleDrop(item)}
            // handleMouse={handleMouse}
            // HandleDrop={HandleDrop}
            name={item}
            key={item}
          >
            {allTasks[item].map((task) => {
              const isDragging = false;
              const top =
                allTasks[item].map((i) => i.id).indexOf(task.id) *
                (HEIGHT + 10);
              const draggedTop =
                allTasks[item].map((i) => i.id).indexOf(task.id) *
                (HEIGHT + 10);
              return (
                <Draggable
                  key={task.name}
                  id={task.id}
                  item={task}
                  mouseDown={handleMouseDown}
                >
                  <Rect
                    isDragging={isDragging}
                    top={isDragging ? top : draggedTop}
                  >
                    {task.name}
                  </Rect>
                </Draggable>
              );
            })}
          </div>
        ))}
    </div>
  );
};

export default BoardScreen;
