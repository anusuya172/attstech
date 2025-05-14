import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./navbar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main style={{ marginTop: "50px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
