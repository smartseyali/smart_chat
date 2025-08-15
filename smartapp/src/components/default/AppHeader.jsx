import logoImg from "../../assets/logo.png";

const AppHeader = () => {
  return (
    <div>
      <nav className="main-header navbar navbar-expand  navbar-light">
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
                src={logoImg}
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
                <i className="fas fa-lock mr-2" /> Change Password
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default AppHeader;
