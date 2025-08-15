import React, { Component } from "react";

const Admin = () => {
  return (
    <div className="col-md-12">
      <div className="card card-solid card-light ">
        <div className="card-header  d-flex justify-content-end">
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search users..."
              //   value={searchQuery}
              //   onChange={handleSearchChange}
            />
          </div>

          <div className="card-tools ml-2">
            <button className="btn btn-sm bg-teal">
              <i className="fas fa-building" />
            </button>
            <button className="btn btn-sm bg-primary ml-2">
              <i className="fas fa-user-tag" />
            </button>
            <button
              className="btn btn-tool bg-pearl"
              data-card-widget="maximize"
            >
              <i className="fas fa-expand"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Admin;
