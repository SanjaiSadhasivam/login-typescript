import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/Register";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./components/mainPage";

function App() {
  return (
    <div className="App flex align-center justify-center mt-10">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
