import React from "react";

export default function ChatHeader({ contact }) {
  return (
    <div className="card-header d-flex align-items-center bg-white ">
      <div
        className="rounded-circle  text-primary d-flex align-items-center justify-content-center mr-2"
        style={{
          width: "40px",
          height: "40px",
          fontWeight: "bold",
          backgroundColor: "#e9f3ff",
          textShadow: "1px 1px 4px rgba(0,0,0,0.15)",
          boxShadow: "0 4px 16px 0 rgba(0,0,0,0.10)", // elevation effect
        }}
      >
        {contact.contact_name.charAt(0)}
      </div>
      <h3 className="card-title text-bold text-secondary mb-0">
        {contact.contact_name}
      </h3>
    </div>
  );
}
