// import "../css/sidebarLink.css";
import React, { Component } from "react";
import { Button } from "@mui/material";
export default class SidebarLink extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="link"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => {
            document.getElementById(this.props.text).scrollIntoView({
              behavior: "smooth"
            });
          }}
          style={{
            textDecoration: "none",
            // color: "#F7F6BB",
            color: "white",
            fontSize: "2rem",
            fontStyle: "italic",
          }}
        >
          {this.props.text}
        </Button>
      </div>
    );
  }
}
