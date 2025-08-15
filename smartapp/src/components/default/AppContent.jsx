import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "../../Routes";

export default class AppContent extends Component {
  render() {
    return (
      <div className="p-2">
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            );
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </div>
    );
  }
}
