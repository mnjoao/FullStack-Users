import React, { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/username", {
        username: credentials.username,
        password: credentials.password,
      });

      localStorage.setItem("token", response.data.token); // Salva o token JWT
      localStorage.setItem("username", credentials.username); // Salva o nome de usuário
      navigate("/"); // Redireciona para a página inicial
    } catch (error) {
      alert("Login failed! Check your username or password.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="col-md-4 border rounded p-5 shadow-lg bg-white">
        <h1 className="text-center mb-4 text-dark">Full Stack App JM</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="Username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              name="username"
              onChange={onInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              name="password"
              onChange={onInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
