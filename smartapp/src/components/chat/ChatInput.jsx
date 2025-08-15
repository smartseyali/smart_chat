import React from "react";

export default function ChatInput({ onSend, newMessage, setNewMessage }) {
  return (
    <div className="card-footer bg-white">
      <div className="input-group">
        {/* Prefix buttons (attachment + emoji) */}
        <div className="input-group-prepend">
          <button type="button" className="btn btn-default">
            <i className="fas fa-paperclip"></i>
          </button>
          <button type="button" className="btn btn-default">
            <i className="fas fa-smile"></i>
          </button>
        </div>

        {/* Text input */}
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="form-control rounded-0"
        />

        {/* Suffix button (send) */}
        <div className="input-group-append">
          <button type="button" className="btn btn-primary" onClick={onSend}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
