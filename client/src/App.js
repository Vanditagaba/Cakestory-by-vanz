import React from "react";
import Nav from "./components/Nav/Nav";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoute from "./components/AnimatedRoute/AnimatedRoute";

const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <AnimatedRoute />
      </Router>
    </>
  );
};

export default App;
