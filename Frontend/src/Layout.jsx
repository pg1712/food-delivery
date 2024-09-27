import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function Layout() {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default Layout;
