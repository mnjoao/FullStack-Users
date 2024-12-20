import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../axiosConfig";

export default function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/user/${id}`);
      setUser(result.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Failed to load user details.");
    }
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="container py-4">
      
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header text-center bg-primary text-white">
              <h2>User Details</h2>
            </div>
            <div className="card-body">
              <h5 className="card-title text-center mb-4">{user.name}</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Username:</strong> {user.username}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {user.email}
                </li>
                <li className="list-group-item">
                  <strong>Role:</strong> {user.role}
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> {user.phone || "N/A"}
                </li>
                <li className="list-group-item">
                  <strong>Address:</strong> {user.address || "N/A"}
                </li>
              </ul>
            </div>
            <div className="card-footer text-center">
              <Link className="btn btn-outline-secondary mx-2" to="/">
                Back to List
              </Link>
              <Link className="btn btn-outline-primary mx-2" to={`/edituser/${id}`}>
                Edit User
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
