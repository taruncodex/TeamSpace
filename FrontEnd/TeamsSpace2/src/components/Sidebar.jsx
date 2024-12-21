import React from 'react'
import "../styles/Sidebar.css"
import { NavLink } from "react-router-dom";

const contacts = [
  {
      room: 1234,
      image: "/nextjs.ico",
      name: "Next Js",
      tagline: "WhatsApp, From Node Js Community?",
  },
  {
      room: 4321,
      image: "/node.jpg",
      name: "Node js",
      tagline: "WhatsApp, From Node Js Community?",
  },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="search-contacts">

        <div className="left">
          <input type="text" placeholder="Search" />
        </div>

        <div className="Chat-box">
          <div className="left-contacts">
            {contacts.map((contact) => {
              return (
                <NavLink
                  to={`/${contact.room}/Neel`}
                  style={{ textDecoration: "none" }}
                  key={contact.room}
                >
                  <div className='SidebarCards'>
                    <div className="Contact">
                      <div className='contactLogo'>
                        
                      </div>
                      <div className='contact-content'>
                        <h3>{contact.name}</h3>
                        <p>{contact.tagline}</p>
                      </div>
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Sidebar