import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./scripts/sketch";

function App() {
  return (
    <div>
      <P5Wrapper sketch={sketch}></P5Wrapper>
    </div>
  );
}

export default App;
