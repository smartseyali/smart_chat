import React from "react";
import { formatDateLabel, formatTimeLabel } from "../../utility/datetimeFormat";

export default function ChatContent({ messages }) {
  // Group messages by date
  const groupedMessages = messages
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .reduce((acc, msg) => {
      const date = formatDateLabel(msg.created_at);

      if (!acc[date]) acc[date] = [];
      acc[date].push(msg);
      return acc;
    }, {});

  const getStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <i className="fas fa-check text-muted"></i>;
      case "delivered":
        return (
          <>
            <i className="fas fa-check-double text-muted"></i>
          </>
        );
      case "read":
        return (
          <>
            <i className="fas fas fa-check-double text-primary"></i>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="card-body  overflow-auto p-3"
      style={{ height: "calc(100vh - 250px)" }}
    >
      {Object.keys(groupedMessages).map((date, idx) => (
        <div key={idx}>
          {/* Date Separator */}
          <div className="text-center my-2">
            <span
              style={{
                background: "#d4d4d4",
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: "12px",
              }}
            >
              {date}
            </span>
          </div>

          {/* Messages */}
          {groupedMessages[date].map((msg, i) => (
            <div
              key={i}
              className={`d-flex mb-2 ${
                msg.status != "received"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <div
                style={{
                  background:
                    msg.status != "received" ? "#dcf8c6" : "#d5effcff",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  maxWidth: "60%",
                  boxShadow: "0px 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                <div className="text-sm">{msg.body}</div>
                <div
                  className="d-flex align-items-center justify-content-end"
                  style={{ fontSize: "10px", marginTop: "4px", color: "#999" }}
                >
                  {msg.created_at && (
                    <span className="mr-2">
                      {formatTimeLabel(msg.created_at)}
                    </span>
                  )}
                  {msg.status != "received" && getStatusIcon(msg.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
