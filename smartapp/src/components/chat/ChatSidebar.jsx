import React, { useState } from "react";

export default function ChatSidebar({
  onSelectContact,
  conversation,
  phoneNumbers = [],
  selectedPhoneNumberId,
  onChangePhoneNumber,
}) {
  const [search, setSearch] = useState("");

  // const filteredContacts = conversation.filter((c) =>
  //   c.contact_name.toLowerCase().includes(search.toLowerCase())
  // );
  return (
    <div className="card direct-chat direct-chat-primary h-100">
      <div className="card-header">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <i className="fab fa-whatsapp text-success mr-2" />
            <strong>WhatsApp</strong>
          </div>
          <div className="d-flex align-items-center">
            <select
              className="form-control form-control-sm"
              style={{ maxWidth: 220 }}
              value={selectedPhoneNumberId || ""}
              onChange={(e) =>
                onChangePhoneNumber && onChangePhoneNumber(e.target.value)
              }
            >
              {(phoneNumbers || []).map((n) => {
                const id = n.phone_number_id || n.id;
                const label = n.display_phone_number || n.phone_number || id;
                return (
                  <option key={id} value={id}>
                    {label}
                  </option>
                );
              })}
            </select>
            <button className="btn btn-sm btn-light ml-2" title="Change number">
              <i className="fas fa-exchange-alt"></i>
            </button>
          </div>
        </div>
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
            const displayName =
              (contact && (contact.contact_name || contact.phone)) || "Unknown";
            const firstChar = String(displayName).charAt(0).toUpperCase();
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
                    {displayName}
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
