import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BoardScreen from "./Screens/BoardScreen";
import HomeScreen from "./Screens/HomeScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/board/:id" element={<BoardScreen />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
