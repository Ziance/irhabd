// AppRouter.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import Login from "../pages/login";
import MapView from "../pages/mapView";
import Layout from "../components/common/layout";
const PrivateRoute = ({ path, element }) => {
  const user = useSelector(selectUser);
  const isAuthenticated = !!user;
  return isAuthenticated ? (
    <Layout>{element}</Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<PrivateRoute path="/" element={<MapView />} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
