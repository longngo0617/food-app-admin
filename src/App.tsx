import React from "react";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <>
      <Router>
        <Route path="/">
          <Home />
        </Route>
      </Router>
    </>
  );
}

export default App;
