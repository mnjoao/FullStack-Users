import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";
import React, { useState,useEffect  } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);

  const location = useLocation(); // Obtém a rota atual
  useEffect(() => {
    document.body.className = darkMode ? "dark-theme" : "light-theme";
  }, [darkMode]);
  return (
    <div className="APP">
      {/* Exibe a Navbar apenas se a rota atual não for "/login" */}
      {location.pathname !== "/login" && <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />}
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/adduser"
          element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/edituser/:id"
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/viewuser/:id"
          element={
            <PrivateRoute>
              <ViewUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
