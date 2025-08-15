import React, { Component } from "react";

export default class AppFooter extends Component {
  render() {
    return (
      <div>
        <footer className="main-footer ">
          {/* To the right */}
          <div className="float-right d-none d-sm-inline">Version 1.0.0</div>
          {/* Default to the left */}
          <strong>
            <a href="https://ramrajcotton.in"> Ramraj</a> ©{" "}
            {new Date().getFullYear()}
            {"  "}
            IT Team{" "}
          </strong>{" "}
        </footer>
      </div>
    );
  }
}
