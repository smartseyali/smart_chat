import logoImg from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const AppSidebar = ({
  menuItems,
  expandedMenus = false,
  toggleMenu = false,
}) => {
  const renderMenuItems = (items) => {
    return items.map((route, index) => {
      if (route.children) {
        return (
          <li
            className={`nav-item ${expandedMenus[index] ? "menu-open" : ""}`}
            key={index}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id={`tooltip-${index}`}>{route.title}</Tooltip>}
            >
              <a className="nav-link" onClick={() => toggleMenu(index)}>
                <i className={`nav-icon ${route.icon}`} />
              </a>
            </OverlayTrigger>
          </li>
        );
      }

      return (
        <li className="nav-item" key={index}>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id={`tooltip-${index}`}>{route.title}</Tooltip>}
          >
            <NavLink to={route.path} className="nav-link">
              <i className={`nav-icon ${route.icon}`} />
              {/* <p>
                {route.title}
                {route.badge && (
                  <span className={route.badge.className}>
                    {route.badge.text}
                  </span>
                )}
              </p> */}
            </NavLink>
          </OverlayTrigger>
        </li>
      );
    });
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4 sidebar-no-expand">
      {/* Brand Logo */}
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="tooltip-brand">SmartChat</Tooltip>}
      >
        <a href="/" className="brand-link">
          <img
            src={logoImg}
            alt="SmartChat Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-bold">SmartChat</span>
        </a>
      </OverlayTrigger>

      <div className="sidebar">
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column nav-legacy"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {renderMenuItems(menuItems || [])}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
