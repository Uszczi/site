import React from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import "./css/App.css";

function App() {
  return (
    <div className="MyBody">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
