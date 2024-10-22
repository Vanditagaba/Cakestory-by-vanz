import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes/AnimatedRoutes";

const App = () => {
  return (
    <>
      <Router>
        <AnimatedRoutes />
      </Router>
    </>
  );
};

export default App;
