import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  width: 500px;
  min-height: 100vh;
`;
export const Rect = styled.div.attrs((props) => ({
  style: {
    transition: props.isDragging ? "none" : "all 500ms",
    top: props.top + "px",
  },
}))`
  width: 300px;
  user-select: none;
  height: 180px;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  left: calc(25vw - 150px);
  font-size: 20px;
  color: #777;
`;
