import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/login/Login";
import Home from "./Components/Home/Home";
import ForgotPassword from "./Components/Forgot-password/ForgotPassword";
import Adminhome from "./Components/AdminHome/AdminHome";
import BusManagement from "./Components/BusManagement/BusManagement";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/adminhome" element={<Adminhome />} />
        <Route path="/admin/bus" element={<BusManagement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
