import React from "react";
import styled from "styled-components";
import Drraggable from "./Drraggable";

function App() {
  return (
    <Container>
      <Drraggable>
        <Rect />
      </Drraggable>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const Rect = styled.div`
  width: 200px;
  height: 200px;
  background: red;
`;
