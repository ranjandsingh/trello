import React, { useContext } from "react";
import Context from "../Context";
import Navlink from "./Navlink";

const Sidebar = () => {
  const { globalState } = useContext(Context);
  return (
    <div
      style={{
        width: "200px",
        height: "100%",
        backgroundColor: "lightgray",
      }}
    >
      <nav>
        {globalState.BoardList.map((board) => {
          return (
            <Navlink key={board.id} to={`/board/${board.id}`}>
              {board.name}
            </Navlink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
