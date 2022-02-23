import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";
import useAPI from "../Hooks/useAPI";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import BoardCard from "../Components/BoardCard";
import AddNewBoard from "../Components/AddNewBoard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BoardScreen = () => {
  let navigate = useNavigate();
  const { globalState, setGlobalState, currrentBorad } = useContext(Context);
  const { fetchAllBoards, addNewBoard, deleteBoard } = useAPI();
  const [loading, setLoading] = useState(true);
  useLayoutEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const boards = await fetchAllBoards();
    setGlobalState({ ...globalState, boards });
    setLoading(false);
  };

  const handleDelete = (id) => {
    const boards = globalState.boards.filter((board) => board.id !== id);
    setGlobalState({ ...globalState, boards });
  };
  const handleClick = (id) => {
    navigate(`/board/${id}`);
  };
  const onCreate = (name) => {
    addNewBoard(name);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container style={{ width: "80vw" }} spacing={2}>
        <Grid item xs={12} md={12}>
          <Item>
            <h3>All Boards</h3>
          </Item>
        </Grid>
        {loading ? (
          <Grid item xs={12}>
            <Item>Loading...</Item>
          </Grid>
        ) : (
          <>
            {globalState.boards.map((board) => {
              return (
                <Grid key={board.id} item xs={4}>
                  <BoardCard
                    item={board}
                    onDelete={handleDelete}
                    onClick={handleClick}
                  />
                </Grid>
              );
            })}
          </>
        )}
        <Grid item xs={4}>
          <AddNewBoard onCreate={onCreate} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BoardScreen;
