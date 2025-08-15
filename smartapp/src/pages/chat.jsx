import React from "react";
import useChat from "../hooks/useChat";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatContent from "../components/chat/ChatContent";
import ChatInput from "../components/chat/ChatInput";

export default function ChatPage() {
  const {
    conversation,
    messages,
    selectedConv,
    newMessage,
    setNewMessage,
    handleSendMessage,
    handleSelectedConv,
  } = useChat();

  return (
    <div className="col-md-12">
      <div className="card card-primary card-outline">
        <div className="card-header d-flex  align-items-center">
          {/* Chat icon */}
          <h5
            className="card-title mb-0 d-flex text-bold text-secondary"
            style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.15)" }}
          >
            <i className="fas fa-comments mr-2" /> Chat
          </h5>
          <div className="card-tools ml-auto">
            <button
              className="btn btn-tool bg-pearl"
              data-card-widget="maximize"
            >
              <i className="fas fa-expand"></i>
            </button>
          </div>
        </div>
        <div className="card-body d-flex p-0">
          <div className="col-md-3 border-right p-0">
            <ChatSidebar
              onSelectContact={handleSelectedConv}
              conversation={conversation}
            />
          </div>
          <div className="col-md-9 d-flex flex-column p-0">
            {selectedConv ? (
              <>
                <ChatHeader contact={selectedConv} />
                <ChatContent messages={messages} />
                <ChatInput
                  onSend={handleSendMessage}
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                />
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100">
                <h4>Select a chat to start messaging</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
