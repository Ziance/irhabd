// Sidebar.js
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../../redux/slices/userSlice";
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside>
      <nav
        id="sidenav-main"
        className="navbar-vertical fixed-left navbar-light bg-white navbar navbar-expand-md"
      >
        <div className="container-fluid">
          <a className="pt-0 navbar-brand" href="/">
            <img
              alt="..."
              className="navbar-brand-img"
              src="https://png.pngtree.com/element_our/png/20180918/simple-v-logo-design-png_100141.jpg"
              style={{ width: "100%" }}
            />
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className={`nav-item ${isLinkActive("/") && "active"}`}>
                <a aria-current="page" className="nav-link" href="/">
                  <i className="ni ni-pin-3 text-orange"></i>{t('mapView')}
                </a>
              </li>
              
              <li className={`nav-item ${isLinkActive("/compatibilityPage") && "active"}`}>
                <a className="nav-link" href="/compatibilityPage">
                  <i className="ni ni-tv-2 text-primary"></i>{t('compatibilty')}
                </a>
              </li>

              <li className={`nav-item ${isLinkActive("/contactUs") && "active"}`}>
                <a className="nav-link" href="/contactUs">
                  <i className="ni ni-mobile-button text-primary"></i>{t('contactUs')}
                </a>
              </li>
              {/* <li className={`nav-item ${isLinkActive("/alertSettings") && "active"}`}>
                <a className="nav-link" href="/alertSettings">
                  <i className="ni ni-settings-gear-65 text-primary"></i>{t('alertSettings')}
                </a>
              </li> */}
              {/* <li className={`nav-item ${isLinkActive("/deviceStatus") && "active"}`}>
                <a className="nav-link" href="/deviceStatus">
                  <i className="ni ni-app text-primary"></i>{t('deviceStatus')}
                </a>
              </li> */}
              <li className={`nav-item ${isLinkActive("/deviceReadings") && "active"}`}>
                <a className="nav-link" href="/deviceReadings">
                  <i className="ni ni-app text-primary"></i>{t('deviceReadings')}
                </a>
              </li>
            </ul>

            <ul className="mb-md-3 navbar-nav">
              <li className="active-pro active nav-item">
                <a className="nav-link" onClick={() => handleLogout()}>
                  <i className="ni ni-user-run"></i>{t('logout')}
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
