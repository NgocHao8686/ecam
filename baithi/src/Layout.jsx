import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container pb-4">
      <Outlet />
    </div>
  );
};

export default Layout;
