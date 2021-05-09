import React from "react";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./utils/Provider";
function App() {


  return (
    <>
      <UserProvider>
        <Router>
          <Route path="/">
            <Home />
          </Route>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
