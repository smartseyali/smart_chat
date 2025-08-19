import React, { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";

export default function ChatInput({
  onSend,
  newMessage,
  setNewMessage,
  pendingFiles = [],
  setPendingFiles,
  onOpenTemplate,
}) {
  const fileInputRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const handleAttachClick = () => setShowAttachMenu((v) => !v);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setPendingFiles([...(pendingFiles || []), ...files]);
    // reset input to allow re-selecting the same file
    e.target.value = "";
  };

  const handleEmojiClick = (emojiData) => {
    setNewMessage((prev) => (prev || "") + (emojiData?.emoji || ""));
  };

  const removePendingFile = (idx) => {
    const next = [...(pendingFiles || [])];
    next.splice(idx, 1);
    setPendingFiles(next);
  };

  return (
    <div
      className="card-footer bg-white chat-input-toolbar"
      style={{ position: "relative" }}
    >
      {/* Pending attachments preview */}
      {pendingFiles && pendingFiles.length > 0 && (
        <div className="mb-2 d-flex flex-wrap">
          {pendingFiles.map((f, i) => (
            <div
              key={i}
              className="badge badge-light border mr-2 mb-2 p-2 d-flex align-items-center"
            >
              <i className="fas fa-file mr-1" />
              <span
                className="mr-2"
                style={{
                  maxWidth: 180,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {f.name}
              </span>
              <button
                type="button"
                className="btn btn-xs btn-outline-danger"
                onClick={() => removePendingFile(i)}
              >
                <i className="fas fa-times" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="input-group">
        {/* Prefix buttons (attachment + emoji) */}
        <div className="input-group-prepend">
          <button
            type="button"
            className="btn btn-default"
            onClick={handleAttachClick}
          >
            <i className="fas fa-paperclip"></i>
          </button>
          <button
            type="button"
            className="btn btn-default ml-1"
            title="Templates"
            onClick={onOpenTemplate}
          >
            <i className="fas fa-file-alt"></i>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            multiple
            onChange={handleFileChange}
            accept="*/*"
          />
          <button
            type="button"
            className="btn btn-default"
            onClick={() => setShowEmoji((s) => !s)}
          >
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
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend(e);
            }
          }}
        />

        {/* Suffix button (send) */}
        <div className="input-group-append">
          <button type="button" className="btn btn-primary" onClick={onSend}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
      {showAttachMenu && (
        <div
          className="bg-white border rounded shadow-sm"
          style={{
            position: "absolute",
            left: 0,
            bottom: 60,
            zIndex: 1050,
            width: 260,
          }}
        >
          <div className="list-group list-group-flush">
            <button
              type="button"
              className="list-group-item list-group-item-action d-flex align-items-center"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.setAttribute("accept", "image/*");
                  fileInputRef.current.click();
                }
                setShowAttachMenu(false);
              }}
            >
              <i className="far fa-image mr-2" /> Image
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action d-flex align-items-center"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.setAttribute(
                    "accept",
                    ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar,.7z,application/*"
                  );
                  fileInputRef.current.click();
                }
                setShowAttachMenu(false);
              }}
            >
              <i className="far fa-file mr-2" /> Document
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action d-flex align-items-center"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.setAttribute("accept", "video/*");
                  fileInputRef.current.click();
                }
                setShowAttachMenu(false);
              }}
            >
              <i className="far fa-file-video mr-2" /> Video
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action d-flex align-items-center"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.setAttribute("accept", "audio/*");
                  fileInputRef.current.click();
                }
                setShowAttachMenu(false);
              }}
            >
              <i className="far fa-file-audio mr-2" /> Audio
            </button>
          </div>
        </div>
      )}
      {showEmoji && (
        <div
          style={{ position: "absolute", right: 0, bottom: 60, zIndex: 1050 }}
        >
          <EmojiPicker
            onEmojiClick={(emojiData) => handleEmojiClick(emojiData)}
            searchDisabled
            skinTonesDisabled
          />
        </div>
      )}
    </div>
  );
}
