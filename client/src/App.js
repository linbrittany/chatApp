import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { GlobalStyles } from "./GlobalStyles";
import Error404 from "./views/404";
import Error from "./views/Error";
import Register from "./views/Register/index";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <GlobalStyles/>
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/error" element={<Error/>}/>
          <Route path="/*" element={<Error404/>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
