import { useState, useEffect, useContext } from "react";
import Context from "../Context";
import { Boards } from "../MockData/Data";

const useAPI = () => {
  const { globalState, currrentBorad, setGlobalState } = useContext(Context);
  const [dropState, updateDropState] = useState("droppable");
  const fetchBoardById = async (id) => {
    const item = globalState.boards.find((board) => board.id === id);
    return item;
  };
  const fetchAllBoards = async () => {
    if (globalState.boards.length === 0) return Boards; // testing only
    return globalState.boards;
  };

  return {
    fetchBoardById,
    fetchAllBoards,
  };
};

export default useAPI;
