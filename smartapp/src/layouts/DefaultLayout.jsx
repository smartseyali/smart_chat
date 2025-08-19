import React from "react";
import { AppContent, AppFooter, AppHeader } from "../components/default/index";
import AppSidebar from "../components/default/AppSidebar";
import AppNav from "../components/default/AppNav"; // Assuming nav is exported from this file
//import useAutoReply from "../hooks/useAutoReply";

const DefaultLayout = () => {
  const menuItems = AppNav;
  // Start auto-reply background listener once layout mounts for authenticated session
  // useAutoReply();

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
