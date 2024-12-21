import React from "react";
import "../styles/workspacepage.css";
import Content from "../components/Content";
import Header from "../components/Header";
import Footer from "../components/Footer";
export const WorkspacePage = () => {
  return (
    <>
      <div className="workspacePage">
        <Header />
        <Content />
        <Footer/>
      </div>

    </>
  );

};
