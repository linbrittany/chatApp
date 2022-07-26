import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./GlobalStyles";
import Register from "./views/Register/index";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles/>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
