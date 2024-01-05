// AppRouter.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "../pages/login";
import MapView from "../pages/mapView";
import CompatibilityPage from "../pages/compatibilityPage";
import Layout from "../components/common/layout";

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? (
    <Layout>{element}</Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

const AppRouter = () => {
  const isAuthenticated = !!localStorage.getItem("user");
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute
              element={<MapView />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/compatibilityPage"
          element={
            <PrivateRoute
              element={<CompatibilityPage />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
