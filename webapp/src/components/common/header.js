// Header.js
import React from "react";
import { Container } from "reactstrap";
import { useTranslation } from "react-i18next";

const Header = (props) => {
  const { user, currentScreenTitle } = props;
  const { t } = useTranslation();

  return (
    <div className="main-contentview">
      <nav
        id="navbar-main"
        className="navbar-top navbar-dark navbar bg-gradient-info"
        expand="md"
      >
        <Container fluid>
          <a
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            href={window.location.pathname}
          >
            {currentScreenTitle ?? ""}
          </a>
          <ul className="align-items-center d-none d-md-flex navbar-nav">
            <li className="dropdown nav-item">
              <a
                aria-haspopup="true"
                href="#"
                className="pr-0 nav-link"
                aria-expanded="false"
              >
                <div className="align-items-center media">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src="https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
                    />
                  </span>
                  <div className="ml-2 d-none d-lg-block media text-white">
                    <span className="mb-0 text-sm font-weight-bold">
                      {user?.name || user?.email || t("guest")}
                    </span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </Container>
      </nav>
    </div>
  );
};

export default Header;
