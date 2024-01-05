/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";


import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

const PrivateRoute = ({ element }) => {
  const user = localStorage.getItem("user");
  return user && JSON.parse(user).id ? (
    element
  ) : (
    <Navigate to="/auth" replace />
  );
};

const App = () => {
  return (
    <Routes>
      <Route
          path="/admin/*"
          element={
            <PrivateRoute
              element={<AdminLayout />}
            />
          }
      />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="*" element={<Navigate to="/admin/index" replace />} />
    </Routes>
  )
}

export default App;
