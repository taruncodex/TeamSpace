import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/userspage.css";

export default function UsersPage() {
  const [workspaces, setWorkspaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newMembers, setNewMembers] = useState("");
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId"); // Retrieve the logged-in user ID

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  async function fetchWorkspaces() {
    try {
      console.log("Try to make get req.");
      console.log(userId);
      const response = await axios.get(
        `https://teamspace.onrender.com/workspaces/${userId}` // not :-  workspaces/:userId
      );

      // Using console For Debug Purpose
      console.log("Get req. completed.");
      console.log("response : ", response);
      console.log("response.data :  ", response.data);

      setWorkspaces(response.data);
    } catch (error) {
      setError("Failed to fetch workspaces");
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
      const response = await axios.post(
        `https://teamspace.onrender.com/createWorkspace`,
        {
          workSpaceName: newWorkspaceName,
          members: newMembers.split(",").map((member) => member.trim()),
          createdBy: userId, //Replace with authenticated user info
        },
        {
          headers: {
            "Content-Type": "application/json",
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
              {workspace.members.length > 0
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
