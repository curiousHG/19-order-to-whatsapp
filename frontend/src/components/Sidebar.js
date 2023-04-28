// import "./css/sidebar.css";
import React, { Component } from "react";
import SidebarLink from "./SidebarLink";
import logo from "./images/logo.jpg";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="sidebar" >
          {this.props.info.map((item) => {
            return <SidebarLink key={item.id} text={item.name} />;
          })}
        </div>
      </div>
    );
  }
}
