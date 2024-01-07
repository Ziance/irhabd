// Layout.js
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";

const Layout = (props) => {
  const {children} = props;
  const user = useSelector(selectUser);
  const route = window.location.pathname;
  let title = '';
    switch (route) {
      case '/':
        title = 'Map View';
        break;
      case '/compatibilityPage':
        title = 'Compatibilty Page';
        break;
      default:
        title = 'Map View';
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
