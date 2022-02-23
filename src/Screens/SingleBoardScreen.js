import React, { useState, useLayoutEffect, useEffect, useContext } from "react";

import { range, inRange } from "lodash";
import Draggable from "../Components/Draggable";
import ListComponent from "../Components/ListComponent";
import { Container, Rect } from "../Components/Wrappers";
import { useParams } from "react-router-dom";
import Context from "../Context";
import useAPI from "../Hooks/useAPI";

const MAX = 5;
const HEIGHT = 180;

const SingleBoardScreen = () => {
  const { globalState, setGlobalState, currrentBorad } = useContext(Context);
  const { id } = useParams();
  const [LocalBoard, setLocalBoard] = useState({
    id: "",
    name: "",
    list: [],
    tasks: [],
  });
  const [loaded, setLoaded] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [allTasks, SetAllTasks] = useState(null);
  const { fetchBoardById } = useAPI();
  useLayoutEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [id]);
  useEffect(() => {
    if (LocalBoard.list.length > 0) {
      const TempState = [];
      LocalBoard.list.map((item) => {
        TempState[item] = LocalBoard.tasks.filter(
          (i) => i.currentList === item
        );
      });
      SetAllTasks(TempState);
      setLoaded(true);
    }
  }, [LocalBoard]);

  const fetchData = async () => {
    const board = await fetchBoardById(id);
    setLocalBoard(board);
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
      return;
    }
    updateTask(currentItem, name);
  };

  const handleAddTask = ({ name, currentList, description }) => {
    const { tasks } = LocalBoard;
    tasks.push({
      name,
      id: tasks.length + 1,
      description,
      currentList,
    });
    setLocalBoard({ ...LocalBoard, tasks });
  };

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
          <ListComponent
            onDrop={HandleDrop}
            // handleMouse={handleMouse}
            // HandleDrop={HandleDrop}
            name={item}
            key={item}
            addTask={handleAddTask}
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
          </ListComponent>
        ))}
    </div>
  );
};

export default SingleBoardScreen;
