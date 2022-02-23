import { useEffect, useContext } from "react";
import Context from "../Context";
import { Boards } from "../MockData/Data";

const useAPI = () => {
  const { globalState, setGlobalState } = useContext(Context);

  const fetchBoardById = async (id) => {
    let item = {};
    if (globalState.boards.length > 0) {
      item = globalState.boards.find((board) => board.id == id);
      return item;
    }
    item = Boards.find((board) => board.id == id);
    return item;
  };

  const updateBoardTask = async (id, tasks) => {
    let item = globalState.boards.find((board) => board.id === id);
    const updatetedBoard = { ...item, tasks };
    const boards = globalState.boards.filter((board) => board.id !== id);
    setGlobalState({
      ...globalState,
      boards: [...boards, updatetedBoard],
    });
    return updatetedBoard;
  };

  const addBoardTask = async (boardId, task) => {
    const board = await fetchBoardById(boardId);
    const { tasks } = board;
    tasks.push({
      ...task,
      id: tasks.length + 1,
    });
    return updateBoardTask(boardId, tasks);
  };
  const deleteBoardTask = async (boardId, taskId) => {
    const board = await fetchBoardById(boardId);
    const { tasks } = board;
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    return updateBoardTask(boardId, updatedTasks);
  };

  const fetchAllBoards = async () => {
    if (globalState.boards.length === 0) return Boards; // testing only
    return globalState.boards;
  };
  const addNewBoard = async (name) => {
    const boards = globalState.boards;
    const newBoard = {
      id: boards.length + 1,
      name,
      list: ["TODO", "DOING", "DONE"],
      tasks: [],
    };
    setGlobalState({
      ...globalState,
      boards: [...boards, newBoard],
    });
  };

  const deleteBoard = async (id) => {
    const boards = globalState.boards;
    const updatedBoards = boards.filter((board) => board.id !== id);
    setGlobalState({
      ...globalState,
      boards: updatedBoards,
    });
  };

  useEffect(() => {
    if (globalState.boards.length === 0)
      setGlobalState({
        ...globalState,
        boards: Boards,
      }); // testing only
  }, [globalState]);
  return {
    fetchBoardById,
    fetchAllBoards,
    addBoardTask,
    deleteBoardTask,
    updateBoardTask,
    addNewBoard,
    deleteBoard,
  };
};

export default useAPI;
