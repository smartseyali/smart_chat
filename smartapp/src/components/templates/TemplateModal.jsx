import React from "react";
import Select from "react-select";
import bgImage from "../../assets/background.png";

const mediaOptions = [
  {
    value: "Image",
    icon: "fas fa-image",
    label: (
      <span>
        <i className="fas fa-image mr-2" /> Image
      </span>
    ),
  },
  {
    value: "Video",
    icon: "fas fa-video",
    label: (
      <span>
        <i className="fas fa-video mr-2" /> Video
      </span>
    ),
  },
  {
    value: "Document",
    icon: "fas fa-file-alt",
    label: (
      <span>
        <i className="fas fa-file-alt mr-2" /> Document
      </span>
    ),
  },
  {
    value: "Location",
    icon: "fas fa-map-marker-alt",
    label: (
      <span>
        <i className="fas fa-map-marker-alt mr-2" /> Location
      </span>
    ),
  },
];

const buttonTypes = [
  {
    value: "custom",
    label: (
      <span>
        <i className="fas fa-reply mr-2" /> Custom
      </span>
    ),
    icon: "fas fa-reply",
  },
  {
    value: "visit_website",
    label: (
      <span>
        <i className="fas fa-external-link-alt mr-2" /> Visit Website
      </span>
    ),
    icon: "fas fa-external-link-alt",
  },
  {
    value: "call_whatsapp",
    label: (
      <span>
        <i className="fab fa-whatsapp mr-2" /> Call on WhatsApp
      </span>
    ),
    icon: "fab fa-whatsapp",
  },
  {
    value: "call_phone",
    label: (
      <span>
        <i className="fas fa-phone mr-2" /> Call Phone Number
      </span>
    ),
    icon: "fas fa-phone",
  },
  {
    value: "copy_code",
    label: (
      <span>
        <i className="fas fa-copy mr-2" /> Copy Offer Code
      </span>
    ),
    icon: "fas fa-copy",
  },
];

const TemplateModal = ({
  showModal,
  handleCloseModal,
  buttonList,
  selectedMedia,
  handleChange,
  handleButtonTypeChange,
  handleRemoveButton,
  handleButtonFieldChange,
  form,
  handleSaveTemplate,
  handleSelectChange,
}) => {
  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      id="modal-lg"
      style={{ display: showModal ? "block" : "none" }}
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="card-title mb-0 d-flex text-bold text-secondary"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.15)" }}
            >
              <i className="fas fa-file-alt mr-2" />
              Message Template
            </h5>
            <button
              type="button"
              className="close"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form>
            <div className="modal-body">
              {/* First row: Form (left) and Preview (right) */}
              <div className="row">
                {/* Left: Form */}
                <div className="col-md-7">
                  {/* Template Name */}
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fas fa-file-alt"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="templateName"
                        placeholder="Enter template name"
                        required
                        value={form.templateName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Category */}
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fas fa-tags"></i>
                        </span>
                      </div>
                      <select
                        className="form-control"
                        name="category"
                        required
                        value={form.category}
                        onChange={handleChange}
                      >
                        <option value="MARKETING">Marketing</option>
                        <option value="UTILITY">Utility</option>
                        <option value="AUTHENTICATION">Authentication</option>
                      </select>
                    </div>
                  </div>
                  {/* Language */}
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fas fa-language"></i>
                        </span>
                      </div>
                      <select
                        className="form-control"
                        name="language"
                        required
                        value={form.language}
                        onChange={handleChange}
                      >
                        <option value="en">English</option>
                        <option value="ta">Tamil</option>
                        <option value="hi">Hindi</option>
                        <option value="es">Spanish</option>
                      </select>
                    </div>
                  </div>
                  {/* Media */}
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fas fa-image"></i>
                        </span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <Select
                          options={mediaOptions}
                          value={selectedMedia}
                          onChange={handleSelectChange}
                          placeholder="Select MediaSample"
                          isClearable
                        />
                      </div>
                    </div>
                  </div>
                  {/* Message Body */}
                  <div className="form-group">
                    <div className="input-group">
                      <textarea
                        className="form-control"
                        name="body"
                        rows={4}
                        placeholder="Enter message body"
                        required
                        value={form.body}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  {/* Footer (optional) */}
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fas fa-minus"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="footer"
                        placeholder="Enter footer text"
                        value={form.footer}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {/* Right: Preview */}
                <div className="col-md-5">
                  <div
                    className="card"
                    style={{
                      background: "#f8f9fa",
                      border: "1px solid #e3e3e3",
                      minHeight: 350,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div className="card-header">
                      <h5
                        className="card-title mb-0 d-flex text-bold text-secondary"
                        style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.15)" }}
                      >
                        <i className="fas fa-eye mr-1" />
                        Preview
                      </h5>
                    </div>
                    <div
                      className="card-body"
                      style={{
                        background: `url(${bgImage}) center center / cover no-repeat`,
                      }}
                    >
                      {/* Template Preview */}
                      <div
                        className="mb-2"
                        style={{
                          background: "#ffff",
                          padding: "8px 12px",
                          borderRadius: "10px",
                          maxWidth: "100%",
                          boxShadow: "0px 1px 2px rgba(0,0,0,0.1)",
                          position: "relative",
                          fontSize: 14,
                          color: "#333",
                        }}
                      >
                        {selectedMedia && (
                          <div
                            className="mb-2"
                            style={{
                              width: "100%",
                              height: 120,
                              background: "#f0f0f0",
                              borderRadius: 8,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "0 auto 12px auto",
                              border: "1px solid #e0e0e0",
                              position: "relative",
                            }}
                          >
                            <i
                              className={`fas fa-${selectedMedia.value.toLowerCase()}`}
                              style={{ fontSize: 36 }}
                            />
                          </div>
                        )}
                        {form.body || (
                          <span className="text-muted">Message body...</span>
                        )}
                        {/* Time aligned to right */}
                        <div
                          className="text-muted small"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: 4,
                          }}
                        >
                          12:00 PM
                        </div>
                        {form.footer && (
                          <div className="text-muted small mb-2">
                            {form.footer}
                          </div>
                        )}
                        {/* Render preview buttons */}
                        {buttonList.length > 0 && (
                          <>
                            <hr style={{ margin: "8px 0" }} />
                            <div>
                              {buttonList.map((btn, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  className="btn btn-outline-primary btn-sm mr-2 mb-1 w-100"
                                  disabled
                                >
                                  <i
                                    className={`${
                                      buttonTypes.find(
                                        (b) => b.value === btn.type
                                      )?.icon
                                    } mr-1`}
                                  />
                                  {btn.type === "custom" && btn.label}
                                  {btn.type === "visit_website" &&
                                    (btn.label || "Visit Website")}
                                  {btn.type === "call_whatsapp" &&
                                    (btn.phone
                                      ? `WhatsApp: ${btn.phone}`
                                      : "Call on WhatsApp")}
                                  {btn.type === "call_phone" &&
                                    (btn.phone
                                      ? `Call: ${btn.phone}`
                                      : "Call Phone")}
                                  {btn.type === "copy_code" &&
                                    (btn.code
                                      ? `Code: ${btn.code}`
                                      : "Copy Offer Code")}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Preview */}
              </div>
              {/* Second row: Add Button Card full width */}
              <div className="row">
                <div className="col-12">
                  <div className="input-group mb-2">
                    <div style={{ width: "350px", maxWidth: "100%" }}>
                      <Select
                        options={buttonTypes}
                        onChange={handleButtonTypeChange}
                        placeholder="Add Button"
                        isClearable
                        value={null}
                      />
                    </div>
                  </div>
                  {/* Render added buttons */}
                  {buttonList.map((btn, idx) => (
                    <div
                      key={idx}
                      className="border rounded p-2 mb-2"
                      style={{
                        background: "#f9f9fa",
                        position: "relative",
                      }}
                    >
                      <span className="mr-2">
                        <i
                          className={`${
                            buttonTypes.find((b) => b.value === btn.type)?.icon
                          } text-secondary`}
                        />
                      </span>
                      <strong className="text-capitalize">
                        {btn.type.replace(/_/g, " ")}
                      </strong>
                      <button
                        type="button"
                        className="close"
                        style={{ position: "absolute", right: 8, top: 8 }}
                        onClick={() => handleRemoveButton(idx)}
                      >
                        <span>&times;</span>
                      </button>
                      {/* Render fields based on button type */}
                      {btn.type === "custom" && (
                        <input
                          type="text"
                          className="form-control mt-2"
                          placeholder="Button Text"
                          value={btn.label}
                          onChange={(e) =>
                            handleButtonFieldChange(
                              idx,
                              "label",
                              e.target.value
                            )
                          }
                        />
                      )}
                      {btn.type === "visit_website" && (
                        <>
                          <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Button Text"
                            value={btn.label}
                            onChange={(e) =>
                              handleButtonFieldChange(
                                idx,
                                "label",
                                e.target.value
                              )
                            }
                          />
                          <input
                            type="url"
                            className="form-control mt-2"
                            placeholder="Website URL"
                            value={btn.url}
                            onChange={(e) =>
                              handleButtonFieldChange(
                                idx,
                                "url",
                                e.target.value
                              )
                            }
                          />
                        </>
                      )}
                      {btn.type === "call_whatsapp" && (
                        <input
                          type="text"
                          className="form-control mt-2"
                          placeholder="WhatsApp Number"
                          value={btn.phone}
                          onChange={(e) =>
                            handleButtonFieldChange(
                              idx,
                              "phone",
                              e.target.value
                            )
                          }
                        />
                      )}
                      {btn.type === "call_phone" && (
                        <input
                          type="text"
                          className="form-control mt-2"
                          placeholder="Phone Number"
                          value={btn.phone}
                          onChange={(e) =>
                            handleButtonFieldChange(
                              idx,
                              "phone",
                              e.target.value
                            )
                          }
                        />
                      )}
                      {btn.type === "copy_code" && (
                        <input
                          type="text"
                          className="form-control mt-2"
                          placeholder="Offer Code"
                          value={btn.code}
                          onChange={(e) =>
                            handleButtonFieldChange(idx, "code", e.target.value)
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-between">
              <button
                type="button"
                className="btn btn-default"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveTemplate}
              >
                Save Template
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;
