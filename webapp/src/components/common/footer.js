// Footer.js
import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="main-contentview">
        <div className="container-fluid">
          <footer className="footer bg-danger">
            <div className="align-items-center justify-content-xl-between row ">
              <div className="col-xl-6">
                <div className="copyright text-center text-xl-left text-muted">
                  © 2024{" "}
                  <a
                    className="font-weight-bold ml-1"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {t("IRHBD")}
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
