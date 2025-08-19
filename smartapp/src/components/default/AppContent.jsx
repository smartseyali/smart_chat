import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "../../routes";

export default class AppContent extends Component {
  render() {
    return (
      <div className="p-2">
        <React.Suspense fallback={<div className="p-3">Loading...</div>}>
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
        </React.Suspense>
      </div>
    );
  }
}
