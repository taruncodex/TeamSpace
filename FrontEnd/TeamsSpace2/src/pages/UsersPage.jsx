import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/userspage.css";

export default function UsersPage() {
  const [workspaces, setWorkspaces] = useState([]);

  return (
    <div>
      <h2>WorkSpaces</h2>
      <div className="boxes">
        <div className="box dotted-box">
          <span className="plus-sign">+</span> Add Workspace
        </div>
        <div className="box">Workspace 1</div>
        <div className="box">Workspace 2</div>
      </div>
    </div>
  );
}
