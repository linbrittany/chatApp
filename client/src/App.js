import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { GlobalStyles } from "./GlobalStyles";
import Register from "./views/Register/index";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <GlobalStyles/>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
