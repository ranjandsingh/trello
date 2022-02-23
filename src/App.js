import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BoardScreen from "./Screens/BoardScreen";
import HomeScreen from "./Screens/HomeScreen";
import Context from "./Context";
import Layout from "./Components/Layout";

const currrentBorad = {
  name: "New Board",
  list: ["TODO", "DOING", "DONE"],
  tasks: [
    {
      name: "task1",
      id: 1,
      description: "task1 description",
      currentList: "TODO",
    },
    {
      name: "task2",
      id: 2,
      description: "task2 description",
      currentList: "DOING",
    },
    {
      name: "task3",
      id: 3,
      description: "task3 description",
      currentList: "DONE",
    },
    {
      name: "task4",
      id: 4,
      description: "task4 description",
      currentList: "TODO",
    },
    {
      name: "task5",
      id: 5,
      description: "task5 description",
      currentList: "DOING",
    },
    {
      name: "task6",
      id: 6,
      description: "task6 description",
      currentList: "DONE",
    },
    {
      name: "task7",
      id: 7,
      description: "task7 description",
      currentList: "TODO",
    },
  ],
};

const App = () => {
  const [globalState, setGlobalState] = useState({
    BoardList: [
      {
        id: "1",
        name: "New Board",
      },
    ],
  });
  return (
    <Context.Provider value={{ globalState, setGlobalState, currrentBorad }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route element={<Layout />}>
            <Route path="/board/:id" element={<BoardScreen />} />
          </Route>
        </Routes>
      </Router>
    </Context.Provider>
  );
};

export default App;
