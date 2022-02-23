import { useState, useEffect, useContext } from "react";
import Context from "../Context";
import { Boards } from "../MockData/Data";

const useAPI = () => {
  const { globalState, currrentBorad, setGlobalState } = useContext(Context);

  const fetchBoardById = async (id) => {
    if (globalState.boards.length > 0)
      return globalState.boards.find((board) => board.id === id);
    return Boards.find((board) => board.id === id);
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
      ID: tasks.length + 1,
    });
    return updateBoardTask(boardId, tasks);
  };
  const deleteBoardTask = async (boardId, taskId) => {
    const board = await fetchBoardById(boardId);
    const { tasks } = board;
    const updatedTasks = tasks.filter((task) => task.ID !== taskId);
    return updateBoardTask(boardId, updatedTasks);
  };

  const fetchAllBoards = async () => {
    if (globalState.boards.length === 0) return Boards; // testing only
    return globalState.boards;
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
  };
};

export default useAPI;
