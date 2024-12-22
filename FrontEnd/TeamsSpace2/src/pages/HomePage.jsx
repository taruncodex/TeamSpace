import React from "react";
import Navbar from "../components/Navbar";
import "../styles/homepage.css";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="homepage-content">
        <header className="homepage-header">
          <h1>Welcome to TeamSpace</h1>
          <p>Your journey starts here. Explore everything we have to offer!</p>
        </header>

        <section className="homepage-section">
          <h2>A Collaborative Workspace Platform</h2>
          <p>
            TeamSpace is a web-based platform designed to enhance teamwork and
            productivity by providing a virtual environment for document
            sharing, real-time editing, and effective team communication. It
            aims to replace traditional office settings with a digital workspace
            that fosters collaboration among remote teams.
          </p>
        </section>

        <div className="homepage-cards">
          <div className="card">
            <h3>Secure Data</h3>
            <p>
              Protect your information with robust user authentication and
              top-notch security protocols.
            </p>
          </div>
          <div className="card">
            <h3>Workspaces Management</h3>
            <p>
              Create unlimited workspaces, manage projects, and seamlessly add
              team members to collaborate effectively.
            </p>
          </div>
          <div className="card">
            <h3>Real-Time Chatting</h3>
            <p>
              Communicate with your team instantly using our integrated
              real-time chat feature within workspaces.
            </p>
          </div>
        </div>

        <footer className="homepage-footer">
          <p>&copy; 2024 Teamspace. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
