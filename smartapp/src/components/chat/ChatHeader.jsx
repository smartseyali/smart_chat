import React from "react";

export default function ChatHeader({ contact }) {
  const displayName =
    (contact && (contact.contact_name || contact.phone)) || "Unknown";
  const avatarChar = String(displayName).charAt(0).toUpperCase();
  return (
    <div className="card-header d-flex align-items-center bg-white ">
      <div className="chat-avatar mr-2">{avatarChar}</div>
      <h3 className="card-title text-bold text-secondary mb-0">
        {displayName}
      </h3>
    </div>
  );
}
