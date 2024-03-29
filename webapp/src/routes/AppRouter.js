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
import ContactUs from "../pages/contactUs";
import CompatibilityPage from "../pages/compatibilityPage";
import Layout from "../components/common/layout";
import AlertSettings from "../pages/alertSettings";
import DeviceStatus from "../pages/deviceStatus";
import DeviceReadings from "../pages/deviceReadings";

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
              element={<DeviceReadings />}
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
        <Route
          path="/contactUs"
          element={
            <PrivateRoute
              element={<ContactUs />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/alertSettings"
          element={
            <PrivateRoute
              element={<AlertSettings />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
         <Route
          path="/mapView"
          element={
            <PrivateRoute
              element={<MapView />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/deviceStatus"
          element={
            <PrivateRoute
              element={<DeviceStatus />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
