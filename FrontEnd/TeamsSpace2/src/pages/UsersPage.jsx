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
      const response = await axios.get(
        `https://teamspace.onrender.com/workspaces/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        }
      );

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
          createdBy: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Server Response:", response.data);

      // Refetch workspaces to ensure consistency
      fetchWorkspaces();

      // Clear form and close modal
      setNewWorkspaceName("");
      setNewMembers("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding workspace:", error.response?.data || error);
      setError("Failed to create workspace. Please try again.");
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

        {workspaces.map((workspace, index) => (
          <div key={workspace._id || index} className="box">
            <h3>{workspace.workSpaceName}</h3>
            <p>
              <strong>Members:</strong>{" "}
              {workspace.members && workspace.members.length > 0
                ? workspace.members.map((member, memberIndex) => (
                    <span key={member.userId || memberIndex}>
                      {member.email}
                    </span>
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
