import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Estados para paginação
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(6); // Número de usuários por página
  const [totalUsers, setTotalUsers] = useState(0); 
  const { id } = useParams();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    
  };
  
  // Filtra os usuários antes da renderização
  const filteredUsers = users.filter(
    (user) => user.name && user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Aplica paginação
  const paginatedUsers = filteredUsers.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  // Carrega os usuários ao montar o componente ou mudar de página
  useEffect(() => {
    loadUsers(page);
  }, [page]);

  const loadUsers = async (currentPage = 0) => {
    setLoading(true);
    try {
      const result = await axios.get(
        `http://localhost:8080/users?page=${currentPage}&size=${pageSize}`
      );
      setUsers(result.data.content); // Usuários paginados
      setTotalPages(result.data.totalPages); // Total de páginas
      setTotalUsers(result.data.totalElements); // Total de usuários no backend
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/user/${id}`);
        loadUsers(page); // Recarrega a página atual
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <div className="container">
  {/* Barra de Pesquisa */}
  <div className="input-group my-4">
    <span className="input-group-text bg-primary text-white">
      <i className="bi bi-search"></i>
    </span>
    <input
      type="text"
      placeholder="Search by name"
      value={search}
      onChange={handleSearch}
      className="form-control"
    />
  </div>

  {/* Tabela */}
  <div className="py-4">
  <div className="d-flex justify-content-between align-items-center mb-2">
    <h3 className="mb-0">User List</h3>
    <Link className="btn btn-success" to="/adduser">
      Add User
    </Link>
  </div>
    <table className="table table-hover border shadow rounded">
      <thead className="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Action</th>

        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user, index) => (
          <tr key={index}>
            <th scope="row">{index + 1 + page * pageSize}</th>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <Link
                className="btn btn-sm btn-primary mx-1"
                to={`/viewuser/${user.id}`}
              >
                View
              </Link>
              <Link
                className="btn btn-sm btn-outline-primary mx-1"
                to={`/edituser/${user.id}`}
              >
                Edit
              </Link>
              <button
                className="btn btn-sm btn-danger mx-1"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Paginação e Total Users */}
  <div className="d-flex justify-content-between align-items-center mt-4">
    <div className="pagination pagination-sm">
      <button
        className="btn btn-primary mx-1"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 0}
      >
        Previous
      </button>
      {[...Array(totalPages).keys()].map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`btn ${
            page === pageNumber ? "btn-primary" : "btn-secondary"
          } mx-1`}
        >
          {pageNumber + 1}
        </button>
      ))}
      <button
        className="btn btn-primary mx-1"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages - 1}
      >
        Next
      </button>
    </div>
    <span className="badge bg-secondary fs-5 ms-auto">
          Total Users: {totalUsers}
        </span>
  </div>
</div>

  );
}
