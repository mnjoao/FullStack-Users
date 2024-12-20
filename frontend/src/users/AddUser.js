import axios from "../axiosConfig";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    role: "USER", // Role padrão
    password: "",
  });

  const [authenticatedRole, setAuthenticatedRole] = useState(""); // Role do usuário autenticado
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const { name, username, email, role, password } = user;

  // Define os roles permitidos com base no authenticatedRole
  const allowedRoles = authenticatedRole == "ADMIN" ? ["USER", "ADMIN"] : ["USER"];

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Validação dos campos
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!username.trim()) newErrors.username = "Username is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is not valid.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Carrega informações do usuário autenticado ao montar o componente
  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/me");
        setAuthenticatedRole(response.data.role); // Define a role do usuário autenticado
        console.log("Authenticated Role do Backend:", response.data.role);
      } catch (error) {
        console.error("Erro ao buscar informações do usuário autenticado:", error);
      }
    };
    fetchAuthenticatedUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Impede o envio se houver erros

    // Verifica se o usuário autenticado é `USER` tentando criar um `ADMIN`
    if (authenticatedRole === "USER" && role === "ADMIN") {
      alert("Usuários com role USER não podem criar usuários com role ADMIN.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/user", user);
      setMessage("User added successfully!");
      setTimeout(() => navigate("/"), 2000); // Redireciona após 2 segundos
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    }
  };

  return (
    <div className="container">
      {message && <div className="alert alert-success">{message}</div>}
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow card-stable-theme">
          <h2 className="text-center m-4">Register User</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={onInputChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={onInputChange}
              />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type="text"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={onInputChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="Role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                name="role"
                value={role}
                onChange={onInputChange}
              >
                {allowedRoles.map((roleOption) => (
                  <option key={roleOption} value={roleOption}>
                    {roleOption}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={onInputChange}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            
            <br></br>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
