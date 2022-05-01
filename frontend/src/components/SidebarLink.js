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
        {/* <h2>{this.props.text}</h2> */}
        <Button
          // variant="contained"
          // color="primary"
          onClick={() => {
            document.getElementById(this.props.text).scrollIntoView({
              behavior: "smooth",
            });
          }}
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "3rem",
          }}
        >
          {this.props.text}
        </Button>
      </div>
    );
  }
}
