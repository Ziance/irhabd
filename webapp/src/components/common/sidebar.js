// Sidebar.js
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <aside>
      <nav
        id="sidenav-main"
        className="navbar-vertical fixed-left navbar-light bg-white navbar navbar-expand-md"
      >
        <div className="container-fluid">
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="pt-0 navbar-brand" href="/">
            <img
              alt="..."
              className="navbar-brand-img"
              src="https://png.pngtree.com/element_our/png/20180918/simple-v-logo-design-png_100141.jpg"
              style={{ width: "100%" }}
            />
          </a>
          <ul className="align-items-center d-md-none nav">
            <li className="dropdown nav-item">
              <a
                aria-haspopup="true"
                href="#"
                className="nav-link-icon nav-link"
                aria-expanded="false"
              >
                <i className="ni ni-bell-55"></i>
              </a>
              <div
                tabindex="-1"
                role="menu"
                aria-labelledby="navbar-default_dropdown_1"
                aria-hidden="true"
                className="dropdown-menu-arrow dropdown-menu dropdown-menu-right"
              >
                <button
                  type="button"
                  tabindex="0"
                  role="menuitem"
                  className="dropdown-item"
                >
                  Action
                </button>
                <button
                  type="button"
                  tabindex="0"
                  role="menuitem"
                  className="dropdown-item"
                >
                  Another action
                </button>
                <div tabindex="-1" className="dropdown-divider"></div>
                <button
                  type="button"
                  tabindex="0"
                  role="menuitem"
                  className="dropdown-item"
                >
                  Something else here
                </button>
              </div>
            </li>
            <li className="dropdown nav-item">
              <a
                aria-haspopup="true"
                href="#"
                className="nav-link"
                aria-expanded="false"
              >
                <div className="align-items-center media">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src="/argon-dashboard-react/static/media/team-1-800x800.fa5a7ac2c81a43925586.jpg"
                    />
                  </span>
                </div>
              </a>
              <div
                tabindex="-1"
                role="menu"
                aria-hidden="true"
                className="dropdown-menu-arrow dropdown-menu dropdown-menu-right"
              >
                <div tabindex="-1" className="noti-title dropdown-header">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </div>
                <a
                  tabindex="0"
                  role="menuitem"
                  className="dropdown-item"
                  href="/admin/user-profile"
                >
                  <i className="ni ni-single-02"></i>
                  <span>My profile</span>
                </a>
                <a
                  tabindex="0"
                  role="menuitem"
                  className="dropdown-item"
                  href="/admin/user-profile"
                >
                  <i className="ni ni-settings-gear-65"></i>
                  <span>Settings</span>
                </a>
                <a
                  tabindex="0"
                  role="menuitem"
                  className="dropdown-item"
                  href="/admin/user-profile"
                >
                  <i className="ni ni-calendar-grid-58"></i>
                  <span>Activity</span>
                </a>
                <a
                  tabindex="0"
                  role="menuitem"
                  className="dropdown-item"
                  href="/admin/user-profile"
                >
                  <i className="ni ni-support-16"></i>
                  <span>Support</span>
                </a>
                <div tabindex="-1" className="dropdown-divider"></div>
                <a
                  href="#pablo"
                  tabindex="0"
                  role="menuitem"
                  className="dropdown-item"
                >
                  <i className="ni ni-user-run"></i>
                  <span>Logout</span>
                </a>
              </div>
            </li>
          </ul>
          <div className="collapse navbar-collapse">
            <div className="navbar-collapse-header d-md-none">
              <div className="row">
                <div className="collapse-brand col-6">
                  <a href="/admin/index">
                    <img
                      alt="..."
                      src="/argon-dashboard-react/static/media/argon-react.128d71d316a8e92aff4a.png"
                    />
                  </a>
                </div>
                <div className="collapse-close col-6">
                  <button className="navbar-toggler" type="button"></button>
                </div>
              </div>
            </div>
            <form className="mt-4 mb-3 d-md-none">
              <div className="input-group-rounded input-group-merge input-group">
                <input
                  aria-label="Search"
                  placeholder="Search"
                  type="search"
                  className="form-control-rounded form-control-prepended form-control"
                />
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <span className="fa fa-search"></span>
                  </span>
                </div>
              </div>
            </form>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a aria-current="page" className="nav-link active" href="/">
                  <i className="ni ni-pin-3 text-orange"></i>Map View
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/compatibilityPage">
                  <i className="ni ni-tv-2 text-primary"></i>Compatibility
                  Screen
                </a>
              </li>
            </ul>

            <ul className="mb-md-3 navbar-nav">
              <li className="active-pro active nav-item">
                <a className="nav-link" onClick={() => handleLogout()}>
                  <i className="ni ni-user-run"></i>Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
