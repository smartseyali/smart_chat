import React, { Component } from "react";
import useTemplates from "../hooks/useTemplates";
import "../styles/table.css"; // Assuming you have a CSS file for styles
import TemplateModal from "../components/templates/TemplateModal";

const Templates = () => {
  const {
    showModal,
    templates,
    fetchTemplates,
    handleOpenModal,
    handleCloseModal,
    buttonList,
    selectedMedia,
    handleSaveTemplate,
    handleChange,
    handleButtonTypeChange,
    handleRemoveButton,
    handleButtonFieldChange,
    form,
    handleSelectChange,
  } = useTemplates();

  return (
    <div className="col-md-12">
      <div className="card card-primary card-outline">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5
            className="card-title mb-0 d-flex text-bold text-secondary"
            style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.15)" }}
          >
            <i className="fas fa-file-alt mr-2" /> Templates
          </h5>
          <div className="card-tools ml-auto">
            <button className="btn btn-sm bg-teal" onClick={fetchTemplates}>
              <i className="fas fa-sync" />
            </button>
            <button className="btn btn-sm bg-primary ml-2">
              <i className="fas fa-comment-medical" onClick={handleOpenModal} />
            </button>
            <button
              className="btn btn-tool bg-pearl"
              data-card-widget="maximize"
            >
              <i className="fas fa-expand"></i>
            </button>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-custom ">
            <thead>
              <tr>
                <th style={{ width: 10 }}>#</th>
                <th>Name</th>
                <th>Category</th>
                <th style={{ width: 40 }}>Language</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {templates && templates.length > 0 ? (
                templates.map((tpl, idx) => (
                  <tr key={tpl.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{tpl.name}</td>
                    <td>{tpl.category}</td>
                    <td>{tpl.language}</td>
                    <td>
                      <span
                        className={`badge ${
                          tpl.status === "APPROVED"
                            ? "bg-success"
                            : tpl.status === "PENDING"
                            ? "bg-warning"
                            : "bg-danger"
                        }`}
                      >
                        {tpl.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn  btn-outline text-info ">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn  btn-outline text-danger  ml-2">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-muted">
                    No templates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* <div className="card-footer clearfix"> */}
        {/* <ul className="pagination pagination-sm m-0 float-right">
            <li className="page-item">
              <a className="page-link" href="#">
                «
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                »
              </a>
            </li>
          </ul> */}
        {/* </div> */}
      </div>
      <TemplateModal
        buttonList={buttonList}
        selectedMedia={selectedMedia}
        handleChange={handleChange}
        handleButtonTypeChange={handleButtonTypeChange}
        handleRemoveButton={handleRemoveButton}
        handleButtonFieldChange={handleButtonFieldChange}
        form={form}
        handleSelectChange={handleSelectChange}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleSaveTemplate={handleSaveTemplate}
      />
    </div>
  );
};
export default Templates;
