import React, { useState, useContext, useEffect } from "react";

import Draggable from "../Components/Draggable";
import ListComponent from "../Components/ListComponent";
import Context from "../Context";

import { useParams } from "react-router-dom";

import useAPI from "../Hooks/useAPI";

const HEIGHT = 180;

const SingleBoardScreen = () => {
  const { globalState, setGlobalState } = useContext(Context);
  const { fetchBoardById, addBoardTask, deleteBoardTask, updateBoardTask } =
    useAPI();
  const { id } = useParams();
  const [LocalBoard, setLocalBoard] = useState({
    id: 0,
    name: "",
    list: ["TODO", "DOING", "DONE"],
    tasks: [],
  });
  const [loaded, setLoaded] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [allTasks, SetAllTasks] = useState({
    TODO: [],
    DOING: [],
    DONE: [],
  });

  const fetchData = async () => {
    console.log("fetchData");
    const board = await fetchBoardById(id);
    setLocalBoard(board);
  };

  const handleMouseDown = (item) => {
    setCurrentItem(item);
    return;
  };

  const updateTask = async (item, currentList) => {
    const { tasks } = LocalBoard;
    tasks.map((i) => {
      if (i.id === item.id) {
        i.currentList = currentList;
      }
    });
    const updatedBoard = await updateBoardTask(LocalBoard.id, tasks);
    setLocalBoard(updatedBoard);

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

  const handleAddTask = async ({ name, currentList, description }) => {
    const newtask = {
      name,
      description,
      currentList,
    };
    const updatedBoard = await addBoardTask(LocalBoard.id, newtask);
    setLocalBoard(updatedBoard);
  };
  const handleDeleteTask = async (id) => {
    console.log(id);
    const updatedBoard = await deleteBoardTask(LocalBoard.id, id);
    setLocalBoard(updatedBoard);
  };

  // useLayoutEffect(() => {
  //   fetchData();
  // });
  useEffect(() => {
    fetchData();
  }, [id]);
  useEffect(() => {
    if (LocalBoard.list.length > 0 && LocalBoard.tasks.length > 0) {
      const TempState = [];
      LocalBoard.list.map((item) => {
        TempState[item] = LocalBoard.tasks.filter(
          (i) => i.currentList === item
        );
      });
      SetAllTasks(TempState);
      setLoaded(true);
    } else {
      SetAllTasks({
        TODO: [],
        DOING: [],
        DONE: [],
      });
      setLoaded(true);
    }
  }, [LocalBoard]);

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
        LocalBoard &&
        LocalBoard.list.map((item) => (
          <ListComponent
            onDrop={HandleDrop}
            // handleMouse={handleMouse}
            // HandleDrop={HandleDrop}
            name={item}
            key={item}
            addTask={handleAddTask}
          >
            {allTasks[item] &&
              allTasks[item].map((task) => {
                return (
                  <Draggable
                    key={task.name}
                    id={task.id}
                    item={task}
                    mouseDown={handleMouseDown}
                    onDelete={handleDeleteTask}
                  />
                );
              })}
          </ListComponent>
        ))}
    </div>
  );
};

export default SingleBoardScreen;
