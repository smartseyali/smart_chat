import logoImg from "../../assets/logo.png";
import { useSelector } from "react-redux";
import useLogin from "../../hooks/useLogin";

const AppHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const { handleSignOut } = useLogin();
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
                style={{ fontSize: "1.1rem" }}
              >
                <i className="fas fa-user-circle mr-2 " />
                <strong>{user}</strong>
              </a>

              <div className="dropdown-divider" />
              <a className="dropdown-item" onClick={handleSignOut}>
                <i className="fas fa-sign-out-alt mr-2" />
                Sign Out
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default AppHeader;
