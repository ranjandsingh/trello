import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";
import useAPI from "../Hooks/useAPI";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

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
  const { fetchBoardById, fetchAllBoards } = useAPI();
  const [loading, setLoading] = useState(true);
  useLayoutEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const boards = await fetchAllBoards();
    setGlobalState({ ...globalState, boards });
    setLoading(false);
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
                  <Item onClick={() => navigate(`/board/${board.id}`)}>
                    {board.name}
                  </Item>
                </Grid>
              );
            })}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default BoardScreen;
