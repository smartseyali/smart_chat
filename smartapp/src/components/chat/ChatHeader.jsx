import React from "react";

export default function ChatHeader({ contact }) {
  return (
    <div className="card-header d-flex align-items-center bg-white ">
      <div className="chat-avatar mr-2">{contact.contact_name.charAt(0)}</div>
      <h3 className="card-title text-bold text-secondary mb-0">
        {contact.contact_name}
      </h3>
    </div>
  );
}
