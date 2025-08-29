import React, { useEffect, useRef } from "react";
import { formatDateLabel, formatTimeLabel } from "../../utility/datetimeFormat";

export default function ChatContent({ messages }) {
  const bottomRef = useRef(null);
  useEffect(() => {
    // Scroll to bottom whenever messages change
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);
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
    <div className="card-body overflow-auto p-3 chat-container">
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
                className={`chat-bubble ${
                  msg.status != "received" ? "me" : "other"
                } p-2`}
              >
                {/* Content by type */}
                {(!msg.type ||
                  msg.type === "text" ||
                  msg.type === "button") && (
                  <div className="text-sm" style={{ whiteSpace: "pre-wrap" }}>
                    {msg.body}
                  </div>
                )}
                {msg.type === "template" && (
                  <div>
                    <div className="text-sm" style={{ whiteSpace: "pre-wrap" }}>
                      {msg.payload?.template_preview?.bodyText || msg.body}
                    </div>
                    {msg.payload?.template_preview?.footerText && (
                      <small className="text-muted d-block mt-1">
                        {msg.payload.template_preview.footerText}
                      </small>
                    )}
                    {Array.isArray(msg.payload?.template_preview?.buttons) &&
                      msg.payload.template_preview.buttons.length > 0 && (
                        <div className="mt-2">
                          {msg.payload.template_preview.buttons.map(
                            (btn, i) => (
                              <button
                                key={i}
                                type="button"
                                className={`btn btn-xs ${
                                  btn.type === "URL"
                                    ? "btn-outline-primary"
                                    : btn.type === "PHONE_NUMBER"
                                    ? "btn-outline-success"
                                    : "btn-light"
                                } mr-2`}
                                disabled
                              >
                                {btn.text}
                              </button>
                            )
                          )}
                        </div>
                      )}
                  </div>
                )}
                {msg.type === "image" && (
                  <div>
                    {msg.media_url ? (
                      <img
                        src={msg.media_url}
                        alt={msg.file_name || "image"}
                        className="img-fluid rounded mb-1"
                      />
                    ) : (
                      <div className="text-muted">Image</div>
                    )}
                    {msg.body && (
                      <div
                        className="text-sm mt-1"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {msg.body}
                      </div>
                    )}
                  </div>
                )}
                {msg.type === "video" && (
                  <div>
                    {msg.media_url ? (
                      <video
                        controls
                        className="img-fluid rounded mb-1"
                        src={msg.media_url}
                      />
                    ) : (
                      <div className="text-muted">Video</div>
                    )}
                    {msg.body && (
                      <div
                        className="text-sm mt-1"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {msg.body}
                      </div>
                    )}
                  </div>
                )}
                {msg.type === "audio" && (
                  <div>
                    {msg.media_url ? (
                      <audio controls src={msg.media_url} />
                    ) : (
                      <div className="text-muted">Audio</div>
                    )}
                    {msg.body && (
                      <div
                        className="text-sm mt-1"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {msg.body}
                      </div>
                    )}
                  </div>
                )}
                {msg.type === "document" && (
                  <div className="d-flex align-items-center">
                    <i className="far fa-file mr-2" />
                    {msg.media_url ? (
                      <a href={msg.media_url} target="_blank" rel="noreferrer">
                        {msg.file_name || "Document"}
                      </a>
                    ) : (
                      <span>{msg.file_name || "Document"}</span>
                    )}
                  </div>
                )}
                <div className="chat-meta">
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
          {/* Bottom anchor to auto-scroll */}
          <div ref={bottomRef} />
        </div>
      ))}
    </div>
  );
}
