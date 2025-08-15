import React, { useState } from "react";

export default function ChatSidebar({ onSelectContact, conversation }) {
  const [search, setSearch] = useState("");

  // const filteredContacts = conversation.filter((c) =>
  //   c.contact_name.toLowerCase().includes(search.toLowerCase())
  // );
  return (
    <div className="card direct-chat direct-chat-primary h-100">
      <div className="card-header">
        <div className="input-group mt-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="input-group-append">
            <button type="button" className="btn btn-default">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <div
        className="card-body p-0 "
        style={{
          minHeight: "calc(80vh - 120px)",
          maxHeight: "calc(80vh - 120px)",
          overflowY: "auto",
        }}
      >
        <ul className="contacts-list list-unstyled ml-2 mr-2 ">
          {conversation.map((contact) => {
            const firstChar = contact.contact_name.charAt(0).toUpperCase();
            return (
              <li
                key={contact.id}
                className="d-flex align-items-center p-2 border-bottom"
                style={{ cursor: "pointer" }}
                onClick={() => onSelectContact(contact)}
              >
                <div
                  className={`rounded-circle text-primary d-flex align-items-center justify-content-center mr-2 `}
                  style={{
                    width: "40px",
                    height: "40px",
                    fontWeight: "bold",
                    backgroundColor: "#e9f3ff",
                    textShadow: "1px 1px 4px rgba(0,0,0,0.15)",
                    boxShadow: "0 4px 16px 0 rgba(0,0,0,0.10)",
                  }}
                >
                  {firstChar}
                </div>
                <div>
                  <span className="text-bold text-secondary">
                    {contact.contact_name}
                  </span>
                  <br />
                  <small className="text-muted">{contact.last_message}</small>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
