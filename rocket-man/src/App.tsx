import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Scene from "./screens/Scene";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import { useRef } from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/scene"
            element={<Scene />}
          />
        </Routes>
      </BrowserRouter>
      {/*<Scene />*/}
    </div>
  );
}

export default App;
