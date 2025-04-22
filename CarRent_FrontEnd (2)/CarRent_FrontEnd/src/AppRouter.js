import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import "./App.css";

const AppRouter = () => {
    const location = useLocation();

    
    const admintoken = localStorage.getItem("CarAdminToken");

    return (
        <>
            
            <Routes>
                <Route path="/" exact element={<LoginSignUp />} />
                <Route path="/admin/login" exact element={<LoginSignUp />} />
                <Route
                    path="/admin/dashboard"
                    exact
                    element={admintoken ? <Dashboard /> : <Navigate to="/admin/login" />}
                />
                
            </Routes>

        </>
    );
};

export default AppRouter;
