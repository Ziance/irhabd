// Layout.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import { useTranslation } from "react-i18next";

const Layout = (props) => {
  const { children } = props;

  const [collapsed, setCollapsed] = useState(true);
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const route = window.location.pathname;
  let title = "";
  switch (route) {
    case "/":
      title = t("deviceReadings");
      break;
    case "/compatibilityPage":
      title = t("compatibilty");
      break;
    case "/contactUs":
      title = t("contactUs");
      break;
    case "/alertSettings":
      title = t("alertSettings");
      break;
    case "/deviceStatus":
      title = t("deviceStatus");
      break;
    case "/mapView":
      title = t("mapView");
      break;
    default:
      title = t("");
  }
  return (
    <>
      {user ? (
        <>
          <Sidebar collapsed={collapsed} />
          <main
            className={` ${
              !collapsed ? "mainContainer_collapsed" : "mainContainer"
            }`}
            style={{
              transition: "all .2s linear",
            }}
          >
            <Header
              user={user}
              currentScreenTitle={title}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
            />
            {children}
          </main>
          <Footer />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Layout;
