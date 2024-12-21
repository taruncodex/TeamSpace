import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/userspage.css";

export default function UsersPage() {
  const [workspaces, setWorkspaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newMembers, setNewMembers] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  async function fetchWorkspaces() {
    try {
      const response = await axios.get(
        `https://teamspace.onrender.com/Workspaces/:userName`
      );
      setWorkspaces(response.data);
    } catch (err) {
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
          WorkspaceName: newWorkspaceName,
          members: newMembers.split(",").map((member) => member.trim()),
          createdBy: "", //Replace with authenticated user info
        }
      );
      setWorkspaces([...workspaces, response.data]);
      setNewWorkspaceName("");
      setNewMembers("");
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response.data?.message || "Failed to create Workspace.");
    }
  }

  return (
    <div className="users-page">
      <h2>WorkSpaces</h2>
      <div className="boxes">
        <div className="box dotted-box" onClick={() => setIsModalOpen(true)}>
          <span className="plus-sign">+</span> Add Workspace
        </div>

        {/* <div className="box">Workspace 1</div>
        <div className="box">Workspace 2</div> */}
        {workspaces.map((workspace) => (
          <div key={workspace.id} className="box">
            <h3>{workspace.name}</h3>
            <p>
              <strong>Members:</strong> {workspace.members.join(", ")}
            </p>
            <p>
              <strong>Created By:</strong> {workspace.createdBy}
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
                required
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
