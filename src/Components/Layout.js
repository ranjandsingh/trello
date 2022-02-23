import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
