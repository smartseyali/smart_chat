import React from "react";
import useChat from "../hooks/useChat";
import ChatSidebar from "../components/chat/ChatSidebar";
import "../components/chat/chat.css";
import ChatHeader from "../components/chat/ChatHeader";
import ChatContent from "../components/chat/ChatContent";
import ChatInput from "../components/chat/ChatInput";
import useTemplates from "../hooks/useTemplates";

export default function ChatPage() {
  const {
    conversation,
    messages,
    selectedConv,
    newMessage,
    setNewMessage,
    pendingFiles,
    setPendingFiles,
    handleSendMessage,
    createConversationForNumber,
    handleSelectedConv,
    handleSendTemplate,
  } = useChat();

  const { templates, fetchTemplates } = useTemplates();
  const [showTpl, setShowTpl] = React.useState(false);
  const [previewTpl, setPreviewTpl] = React.useState(null);
  const [tplParams, setTplParams] = React.useState({ header: [], body: [] });
  const [showNewChat, setShowNewChat] = React.useState(false);
  const [newChat, setNewChat] = React.useState({ phone: "", name: "" });

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
              className="btn btn-sm btn-primary mr-2"
              onClick={() => setShowNewChat(true)}
              title="Start a new chat"
            >
              <i className="fas fa-user-plus mr-1"></i>
              New Chat
            </button>
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
                  pendingFiles={pendingFiles}
                  setPendingFiles={setPendingFiles}
                  onOpenTemplate={() => {
                    if (!templates || templates.length === 0) fetchTemplates();
                    setShowTpl(true);
                  }}
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

      {/* Template picker modal */}
      {showTpl && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-lg" style={{ maxWidth: "95%" }}>
            <div className="modal-content" style={{ height: "80vh" }}>
              <div className="modal-header">
                <h5 className="modal-title">Templates</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowTpl(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div
                className="modal-body"
                style={{ height: "calc(80vh - 120px)", overflow: "hidden" }}
              >
                <div className="row h-100">
                  <div
                    className="col-md-4 border-right pr-3"
                    style={{ height: "100%", overflowY: "auto" }}
                  >
                    {templates && templates.length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {templates.map((tpl, i) => (
                          <li
                            key={tpl.meta_template_id || tpl.id || i}
                            className={`list-group-item d-flex align-items-center ${
                              previewTpl &&
                              (previewTpl.meta_template_id || previewTpl.id) ===
                                (tpl.meta_template_id || tpl.id)
                                ? "active-tab"
                                : ""
                            }`}
                            onClick={() => {
                              setPreviewTpl(tpl);
                              const bodyComp = (tpl.components || []).find(
                                (c) => c.type === "BODY"
                              );
                              const headerComp = (tpl.components || []).find(
                                (c) => c.type === "HEADER"
                              );
                              const bodyMatches = bodyComp?.text
                                ? bodyComp.text.match(/\{\{\d+\}\}/g)
                                : [];
                              const headerNeeds =
                                headerComp?.format === "TEXT" ? 1 : 0;
                              setTplParams({
                                header: Array.from(
                                  { length: headerNeeds },
                                  () => ""
                                ),
                                body: Array.from(
                                  {
                                    length: bodyMatches
                                      ? bodyMatches.length
                                      : 0,
                                  },
                                  () => ""
                                ),
                              });
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <i className="far fa-file-alt mr-2" />
                            <div className="d-flex flex-column">
                              <strong>{tpl.name}</strong>
                              <small className="text-muted">
                                {tpl.category} • {tpl.language}
                              </small>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-muted">No templates found.</div>
                    )}
                  </div>
                  <div
                    className="col-md-4 pl-3 pr-3 border-right"
                    style={{ height: "100%", overflowY: "auto" }}
                  >
                    {/* Parameters column */}
                    {previewTpl ? (
                      <div>
                        <div className="card mb-3">
                          <div className="card-header">
                            <strong>Header</strong>
                          </div>
                          <div className="card-body">
                            {(() => {
                              const headerComp = (
                                previewTpl.components || []
                              ).find((c) => c.type === "HEADER");
                              if (!headerComp)
                                return (
                                  <div className="text-muted">No header</div>
                                );
                              if (headerComp.format === "TEXT") {
                                return (
                                  <div className="form-group mb-0">
                                    <label className="mb-1">
                                      Header text parameter
                                    </label>
                                    {(tplParams.header || [""]).map(
                                      (val, i) => (
                                        <input
                                          key={i}
                                          type="text"
                                          className="form-control mb-2"
                                          placeholder={`Header parameter {{${
                                            i + 1
                                          }}}`}
                                          value={val}
                                          onChange={(e) =>
                                            setTplParams((prev) => ({
                                              ...prev,
                                              header: prev.header.map(
                                                (v, idx) =>
                                                  idx === i ? e.target.value : v
                                              ),
                                            }))
                                          }
                                        />
                                      )
                                    )}
                                  </div>
                                );
                              }
                              // Media header input
                              return (
                                <div className="form-group mb-0">
                                  <label className="mb-1">
                                    Header media ({headerComp.format})
                                  </label>
                                  <input
                                    type="file"
                                    className="form-control"
                                    accept={
                                      headerComp.format === "IMAGE"
                                        ? "image/*"
                                        : headerComp.format === "VIDEO"
                                        ? "video/*"
                                        : headerComp.format === "DOCUMENT"
                                        ? ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar,.7z,application/*"
                                        : "*/*"
                                    }
                                    onChange={(e) =>
                                      setTplParams((prev) => ({
                                        ...prev,
                                        headerMedia:
                                          e.target.files?.[0] || null,
                                        headerMediaKind:
                                          headerComp.format?.toLowerCase(),
                                      }))
                                    }
                                  />
                                </div>
                              );
                            })()}
                          </div>
                        </div>

                        <div className="card mb-3">
                          <div className="card-header">
                            <strong>Body</strong>
                          </div>
                          <div className="card-body">
                            {tplParams.body && tplParams.body.length > 0 ? (
                              <div className="form-group mb-0">
                                <label className="mb-1">Body parameters</label>
                                {tplParams.body.map((val, i) => (
                                  <input
                                    key={i}
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder={`Body parameter {{${i + 1}}}`}
                                    value={val}
                                    onChange={(e) =>
                                      setTplParams((prev) => ({
                                        ...prev,
                                        body: prev.body.map((v, idx) =>
                                          idx === i ? e.target.value : v
                                        ),
                                      }))
                                    }
                                  />
                                ))}
                              </div>
                            ) : (
                              <div className="text-muted">
                                No body parameters
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="card">
                          <div className="card-header">
                            <strong>Buttons</strong>
                          </div>
                          <div className="card-body">
                            {(() => {
                              const btnComponents = (
                                previewTpl.components || []
                              ).filter((c) => c.type === "BUTTONS");
                              const buttons = btnComponents.flatMap(
                                (c) => c.buttons || []
                              );
                              if (buttons.length === 0)
                                return (
                                  <div className="text-muted">No buttons</div>
                                );
                              return (
                                <>
                                  {buttons.map((btn, idx) => (
                                    <div
                                      key={idx}
                                      className="mb-2 p-2 border rounded"
                                    >
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                          <strong className="mr-2">
                                            {btn.text}
                                          </strong>
                                          <span className="badge badge-light">
                                            {btn.type}
                                          </span>
                                        </div>
                                      </div>
                                      {btn.type === "URL" &&
                                        typeof btn.url === "string" &&
                                        btn.url.includes("{{") && (
                                          <div className="mt-2">
                                            <label className="mb-1">
                                              URL parameters
                                            </label>
                                            {(
                                              tplParams.buttons?.[idx] || [""]
                                            ).map((val, j) => (
                                              <input
                                                key={j}
                                                type="text"
                                                className="form-control mb-2"
                                                placeholder={`Button parameter {{${
                                                  j + 1
                                                }}}`}
                                                value={val}
                                                onChange={(e) =>
                                                  setTplParams((prev) => {
                                                    const next = Array.isArray(
                                                      prev.buttons
                                                    )
                                                      ? [...prev.buttons]
                                                      : [];
                                                    next[idx] = Array.isArray(
                                                      next[idx]
                                                    )
                                                      ? [...next[idx]]
                                                      : [];
                                                    next[idx][j] =
                                                      e.target.value;
                                                    return {
                                                      ...prev,
                                                      buttons: next,
                                                    };
                                                  })
                                                }
                                              />
                                            ))}
                                          </div>
                                        )}
                                    </div>
                                  ))}
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-muted">
                        Select a template to configure parameters
                      </div>
                    )}
                  </div>
                  <div
                    className="col-md-4 pl-3"
                    style={{ height: "100%", overflowY: "auto" }}
                  >
                    {/* Live Preview */}
                    {previewTpl ? (
                      <div className="card">
                        <div className="card-header">
                          <strong>Preview</strong>
                        </div>
                        <div
                          className="card-body"
                          style={{ whiteSpace: "pre-wrap" }}
                        >
                          <h6 className="text-secondary mb-2">
                            {previewTpl.name}
                          </h6>

                          {/* Header Preview */}
                          {(() => {
                            const headerComp = (
                              previewTpl.components || []
                            ).find((c) => c.type === "HEADER");
                            if (!headerComp) return null;

                            if (headerComp.format === "TEXT") {
                              let headerText = headerComp.text || "";
                              if (
                                tplParams.header &&
                                tplParams.header.length > 0
                              ) {
                                let i = 0;
                                headerText = headerText.replace(
                                  /\{\{\d+\}\}/g,
                                  (match) => {
                                    const value = tplParams.header[i] || "";
                                    const paramNumber = match.match(/\d+/)[0];
                                    i++;
                                    return (
                                      value || (
                                        <span
                                          className="text-info"
                                          style={{
                                            backgroundColor: "#d1ecf1",
                                            padding: "2px 6px",
                                            borderRadius: "4px",
                                            border: "1px solid #bee5eb",
                                            fontSize: "0.9em",
                                            fontWeight: "500",
                                          }}
                                          title={`Header parameter ${paramNumber}`}
                                        >
                                          {match}
                                        </span>
                                      )
                                    );
                                  }
                                );
                              } else {
                                // Show original variables if no parameters set
                                headerText = headerText.replace(
                                  /\{\{\d+\}\}/g,
                                  (match) => {
                                    const paramNumber = match.match(/\d+/)[0];
                                    return (
                                      <span
                                        className="text-info"
                                        style={{
                                          backgroundColor: "#d1ecf1",
                                          padding: "2px 6px",
                                          borderRadius: "4px",
                                          border: "1px solid #bee5eb",
                                          fontSize: "0.9em",
                                          fontWeight: "500",
                                        }}
                                        title={`Header parameter ${paramNumber}`}
                                      >
                                        {match}
                                      </span>
                                    );
                                  }
                                );
                              }
                              return (
                                <div
                                  className="mb-3 p-2 border rounded"
                                  style={{ backgroundColor: "#f8f9fa" }}
                                >
                                  <small className="text-muted d-block mb-1">
                                    Header:
                                  </small>
                                  <div>{headerText}</div>
                                </div>
                              );
                            } else if (headerComp.format) {
                              // Media header
                              return (
                                <div
                                  className="mb-3 p-2 border rounded"
                                  style={{ backgroundColor: "#f8f9fa" }}
                                >
                                  <small className="text-muted d-block mb-1">
                                    Header ({headerComp.format}):
                                  </small>
                                  <div className="text-success">
                                    {tplParams.headerMedia ? (
                                      <i className="fas fa-check-circle mr-1"></i>
                                    ) : (
                                      <i className="fas fa-exclamation-triangle mr-1"></i>
                                    )}
                                    {tplParams.headerMedia
                                      ? "Media file selected"
                                      : "No media file selected"}
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          })()}

                          {/* Body Preview */}
                          {(() => {
                            const bodyComp = (previewTpl.components || []).find(
                              (c) => c.type === "BODY"
                            );
                            if (!bodyComp) return null;

                            let text = bodyComp.text || "";
                            if (tplParams.body && tplParams.body.length > 0) {
                              let i = 0;
                              text = text.replace(/\{\{\d+\}\}/g, (match) => {
                                const value = tplParams.body[i] || "";
                                const paramNumber = match.match(/\d+/)[0];
                                i++;
                                return (
                                  value || (
                                    <span
                                      className="text-info"
                                      style={{
                                        backgroundColor: "#d1ecf1",
                                        padding: "2px 6px",
                                        borderRadius: "4px",
                                        border: "1px solid #bee5eb",
                                        fontSize: "0.9em",
                                        fontWeight: "500",
                                      }}
                                      title={paramNumber}
                                    >
                                      {match}
                                    </span>
                                  )
                                );
                              });
                            } else {
                              // Show original variables if no parameters set
                              text = text.replace(/\{\{\d+\}\}/g, (match) => {
                                const paramNumber = match.match(/\d+/)[0];
                                return (
                                  <span
                                    className="text-info"
                                    style={{
                                      backgroundColor: "#d1ecf1",
                                      padding: "2px 6px",
                                      borderRadius: "4px",
                                      border: "1px solid #bee5eb",
                                      fontSize: "0.9em",
                                      fontWeight: "500",
                                    }}
                                    title={paramNumber}
                                  >
                                    {match}
                                  </span>
                                );
                              });
                            }
                            return (
                              <div
                                className="mb-3 p-2 border rounded"
                                style={{ backgroundColor: "#f8f9fa" }}
                              >
                                <small className="text-muted d-block mb-1">
                                  Body:
                                </small>
                                <div>{text}</div>
                              </div>
                            );
                          })()}

                          {/* Footer Preview */}
                          {(() => {
                            const footerComp = (
                              previewTpl.components || []
                            ).find((c) => c.type === "FOOTER");
                            return footerComp ? (
                              <div
                                className="mb-3 p-2 border rounded"
                                style={{ backgroundColor: "#f8f9fa" }}
                              >
                                <small className="text-muted d-block mb-1">
                                  Footer:
                                </small>
                                <div>{footerComp.text}</div>
                              </div>
                            ) : null;
                          })()}

                          {/* Buttons Preview */}
                          <div className="mt-2">
                            {(() => {
                              const btnComponents = (
                                previewTpl.components || []
                              ).filter((c) => c.type === "BUTTONS");
                              const buttons = btnComponents.flatMap(
                                (c) => c.buttons || []
                              );
                              if (buttons.length === 0) return null;

                              return (
                                <div
                                  className="p-2 border rounded"
                                  style={{ backgroundColor: "#f8f9fa" }}
                                >
                                  <small className="text-muted d-block mb-1">
                                    Buttons:
                                  </small>
                                  {buttons.map((btn, i) => {
                                    let url = btn.url;
                                    const p = tplParams.buttons?.[i] || [];
                                    if (
                                      typeof url === "string" &&
                                      url?.includes("{{") &&
                                      p.length > 0
                                    ) {
                                      let k = 0;
                                      url = url.replace(
                                        /\{\{\d+\}\}/g,
                                        (match) => {
                                          const value = p[k] || "";
                                          const paramNumber =
                                            match.match(/\d+/)[0];
                                          k++;
                                          return (
                                            value || (
                                              <span
                                                className="text-info"
                                                style={{
                                                  backgroundColor: "#d1ecf1",
                                                  padding: "2px 6px",
                                                  borderRadius: "4px",
                                                  border: "1px solid #bee5eb",
                                                  fontSize: "0.9em",
                                                  fontWeight: "500",
                                                }}
                                                title={`Button parameter ${paramNumber}`}
                                              >
                                                {match}
                                              </span>
                                            )
                                          );
                                        }
                                      );
                                    }
                                    return (
                                      <button
                                        key={i}
                                        type="button"
                                        className={`btn btn-sm ${
                                          btn.type === "URL"
                                            ? "btn-outline-primary"
                                            : btn.type === "PHONE_NUMBER"
                                            ? "btn-outline-success"
                                            : "btn-light"
                                        } mr-2 mt-2`}
                                        disabled
                                      >
                                        {btn.text}
                                      </button>
                                    );
                                  })}
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                        <div className="card-footer d-flex justify-content-end">
                          <button
                            className="btn btn-primary"
                            onClick={async () => {
                              await handleSendTemplate(previewTpl, tplParams);
                              setShowTpl(false);
                              setPreviewTpl(null);
                              setTplParams({
                                header: [],
                                body: [],
                                buttons: [],
                                headerMedia: null,
                                headerMediaKind: null,
                              });
                            }}
                          >
                            Send Template
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-muted">
                        Select a template to preview
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-light"
                  onClick={() => setShowTpl(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Chat modal */}
      {showNewChat && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog" style={{ maxWidth: 520 }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Start New Chat</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowNewChat(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="e.g. 15551234567"
                    value={newChat.phone}
                    onChange={(e) =>
                      setNewChat((p) => ({ ...p, phone: e.target.value }))
                    }
                  />
                  <small className="form-text text-muted">
                    Include country code, numbers only.
                  </small>
                </div>
                <div className="form-group">
                  <label>Contact Name (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={newChat.name}
                    onChange={(e) =>
                      setNewChat((p) => ({ ...p, name: e.target.value }))
                    }
                  />
                </div>
                {/* Message input removed: add-only flow */}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-light"
                  onClick={() => setShowNewChat(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    const phone = (newChat.phone || "").replace(/\D/g, "");
                    if (!phone) return;
                    await createConversationForNumber(
                      phone,
                      newChat.name || ""
                    );
                    setShowNewChat(false);
                    setNewChat({ phone: "", name: "" });
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
