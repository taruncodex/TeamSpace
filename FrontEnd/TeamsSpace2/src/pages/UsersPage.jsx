import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/userspage.css";

export default function UsersPage() {
  const [workspaces, setWorkspaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newMembers, setNewMembers] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");

  // const userId = localStorage.getItem("userId");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found. Please log in.");
      return;
    }

    const savedUserId = localStorage.getItem("userId");
    if (!savedUserId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    setUserId(savedUserId);
  }, []);

  useEffect(() => {
    // Fetch workspaces if userId is available
    if (userId) fetchWorkspaces();
  }, [userId]);

  async function fetchWorkspaces() {
    try {
      const token = localStorage.getItem("token");
      // console.log(userId);
      const response = await axios.get(
        ` http://localhost:3000/workspaces/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        }
      );

      // Using console For Debug Purpose
      console.log("Get req. completed.");
      console.log("response : ", response);

      setWorkspaces(response.data);
    } catch (error) {
      setError("Failed to fetch workspaces");
      console.error(
        "Error fetching workspaces:",
        error.response?.data || error
      );
    }
  }

  async function handleAddWorkspace(e) {
    e.preventDefault();
    setError("");

    if (!newWorkspaceName.trim()) {
      setError("Workspace name is required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://teamspace.onrender.com/createWorkspace`,
        {
          workSpaceName: newWorkspaceName,
          members: newMembers.split(",").map((member) => member.trim()),
          createdBy: userId, // Using decoded userId
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Server Response:", response.data);

      setWorkspaces([...workspaces, response.data]);
      setNewWorkspaceName("");
      setNewMembers("");
      setIsModalOpen(false);
    } catch (error) {
      // setError(error.response.data?.message || "Failed to create Workspace.");
      console.log(error.response.data);
    }
  }

  return (
    <div className="users-page">
      <h2>WorkSpaces</h2>
      <div className="boxes">
        <div className="box dotted-box" onClick={() => setIsModalOpen(true)}>
          <span className="plus-sign">+</span>
          <p className="add-workspace-text">Add Workspace</p>
        </div>

        {/* <div className="box">Workspace 1</div>
        <div className="box">Workspace 2</div> */}
        {workspaces.map((workspace) => (
          <div key={workspace._id} className="box">
            <h3>{workspace.workSpaceName}</h3>
            <p>
              <strong>Members:</strong>{" "}
              {workspace.members && workspace.members.length > 0
                ? workspace.members.map((member, index) => (
                    <span key={index}>{member.email}</span>
                  ))
                : "No members"}
            </p>
            <p>
              <strong>Created By:</strong>{" "}
              {workspace.createdBy?.email || "Unknown"}
            </p>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Workspace</h3>
            <form onSubmit={handleAddWorkspace}>
              <input
                type="text"
                placeholder="Workspace Name"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Members"
                value={newMembers}
                onChange={(e) => setNewMembers(e.target.value)}
              />
              <div className="modal-actions">
                <button type="submit">Add</button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setNewWorkspaceName("");
                    setNewMembers("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
