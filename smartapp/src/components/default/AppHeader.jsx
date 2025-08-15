import React from "react";
// import { useAuth } from "../../auth/useAuth";
// import { useNavigate } from "react-router-dom";
// import $ from "jquery";

const AppHeader = () => {
  // const { logout } = useAuth();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   $("#overlay").show(); // Show loader
  //   setTimeout(() => {
  //     logout();
  //     $("#overlay").hide();
  //     navigate("/login", { replace: true });
  //   }, 1000); // Redirect to login page
  // };
  return (
    <div>
      <nav className="main-header navbar navbar-expand  navbar-light">
        {/* Left navbar links */}
        {/* <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
        </ul> */}

        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown mr-4">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-bell "></i>
              <span className="badge badge-warning navbar-badge">15</span>
            </a>
          </li>
          <li className="nav-item">
            <a data-toggle="dropdown" href="#">
              <img
                src="/src/assets/logo.png"
                alt="Profile"
                className="brand-image img-circle elevation-1"
                style={{ opacity: "1", width: "40px", height: "40px" }}
              />
            </a>
            <div className="dropdown-menu dropdown-menu-md dropdown-menu-right">
              <a
                className="dropdown-header text-center"
                style={{ fontSize: "1.4rem" }}
              >
                <i className="fas fa-user-circle mr-2" />
                <strong>Admin</strong>
              </a>

              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-key mr-2" /> Change Password
              </a>

              {/* <div className="dropdown-divider" />
              <a href="#" className="dropdown-item" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt mr-2" /> Log Out
              </a> */}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default AppHeader;
