import React, { useContext } from "react";
import Context from "../Context";

const HomeScreen = () => {
  const { globalState, currrentBorad } = useContext(Context);
  return <div>{currrentBorad.name} </div>;
};

export default HomeScreen;
