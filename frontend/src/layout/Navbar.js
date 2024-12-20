import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ toggleTheme, darkMode }) {
  const navigate = useNavigate();

  // Recupera o nome do usuário do localStorage (ou outro estado)
  const username = localStorage.getItem("username") || "Guest";

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token JWT
    localStorage.removeItem("username"); // Remove o nome do usuário
    navigate("/login"); // Redireciona para o login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
       
      <Link className="navbar-brand" to="/">
        Full Stack App JM
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/adduser">
              Add User
            </Link>
          </li>
        </ul>
        {/* Exibe o nome do usuário logado */}
        <div className="d-flex align-items-center">
               
          <span className="text-light me-3">Logged in user: {username}</span>
          <button
            className="btn btn-sm btn-outline-warning mx-1"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button className="btn btn-sm btn-outline-light mx-1" onClick={toggleTheme}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>  
        </div>
      </div>
    </nav>
  );
}
