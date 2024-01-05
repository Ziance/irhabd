// Layout.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, selectUser } from "../../redux/slices/userSlice";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
    navigate("/login");
  };

  return (
    <>
      {user ? (
        <>
          <header>
            <h1>Welcome, {user ? user.username : "Guest"}!</h1>
          </header>
          <Sidebar />
          <main>{children}</main>
          <footer>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </footer>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Layout;
