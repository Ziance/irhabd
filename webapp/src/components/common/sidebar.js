// Sidebar.js
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../../redux/slices/userSlice";
import { useTranslation } from "react-i18next";
import LogoImage from "../../assets/images/autolite_logo.jpg";

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
              alt="logo"
              src={LogoImage}
              className="navbar-brand-img img-fluid"
              style={{ height: "100%", width: "100%" }}
            />
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li
                className={`nav-item ${isLinkActive("/") && "active bg-info"}`}
              >
                <a
                  className={`nav-link font-weight-bold ${
                    isLinkActive("/") && "text-white"
                  }`}
                  href="/"
                >
                  <i
                    className={`ni ni-app text-primary ${
                      isLinkActive("/") && "text-white"
                    }`}
                  ></i>
                  {t("deviceReadings")}
                </a>
              </li>

              <li
                className={`nav-item ${
                  isLinkActive("/mapView") && "active bg-info"
                }`}
              >
                <a
                  aria-current="page"
                  className={`nav-link font-weight-bold ${
                    isLinkActive("/mapView") && "text-white"
                  }`}
                  href="/mapView"
                >
                  <i
                    className={`ni ni-pin-3 text-primary ${
                      isLinkActive("/mapView") && "text-white"
                    }`}
                  ></i>
                  {t("mapView")}
                </a>
              </li>

              <li
                className={`nav-item ${
                  isLinkActive("/compatibilityPage") && "active bg-info"
                }`}
              >
                <a
                  className={`nav-link font-weight-bold ${
                    isLinkActive("/compatibilityPage") && "text-white"
                  }`}
                  href="/compatibilityPage"
                >
                  <i
                    className={`ni ni-tv-2 text-primary ${
                      isLinkActive("/compatibilityPage") && "text-white"
                    }`}
                  ></i>
                  {t("compatibilty")}
                </a>
              </li>

              <li
                className={`nav-item ${
                  isLinkActive("/contactUs") && "active bg-info"
                }`}
              >
                <a
                  className={`nav-link font-weight-bold ${
                    isLinkActive("/contactUs") && "text-white"
                  }`}
                  href="/contactUs"
                >
                  <i className={`ni ni-mobile-button text-primary ${
                      isLinkActive("/contactUs") && "text-white"
                    }`}></i>
                  {t("contactUs")}
                </a>
              </li>
            </ul>

            <ul className="mb-md-3 navbar-nav">
              <li className="active-pro active nav-item bg-white">
                <a
                  className="nav-link font-weight-bold"
                  onClick={() => handleLogout()}
                >
                  <i className="ni ni-user-run text-primary"></i>
                  {t("logout")}
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
