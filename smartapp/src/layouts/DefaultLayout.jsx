import React from "react";
import { AppContent, AppFooter, AppHeader } from "../components/default/index";
import AppSidebar from "../components/default/AppSidebar";
import AppNav from "../components/default/AppNav"; // Assuming nav is exported from this file

const DefaultLayout = () => {
  const menuItems = AppNav;

  return (
    <div>
      <AppSidebar menuItems={menuItems} />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="content-wrapper">
            <AppContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
