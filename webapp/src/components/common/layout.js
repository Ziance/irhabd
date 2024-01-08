// Layout.js
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import { useTranslation } from 'react-i18next';

const Layout = (props) => {
  const {children} = props;
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const route = window.location.pathname;
  let title = '';
    switch (route) {
      case '/':
        title = t('mapView');
        break;
      case '/compatibilityPage':
        title = t('compatibilty');
        break;
      default:
        title = t('mapView');
    }
  return (
    <>
      {user ? (
        <>
          <Header user={user} currentScreenTitle={title} />
          <Sidebar />
          <main>{children}</main>
          <Footer />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Layout;
