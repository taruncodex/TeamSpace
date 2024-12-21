import React from 'react'
import "../styles/Content.css"
import Sidebar from './Sidebar'
import Chatbox from "./Chatbox"
const Content = () => {
  return (
    <>
      <div className="content">
        <div className="contentSidebar">
          <Sidebar />
        </div>
        <div className="contentChatbox">
          <Chatbox />
        </div>
      </div>
    </>
  )
}

export default Content