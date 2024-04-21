// import "./css/sidebar.css";
import React, { Component } from "react";
import SidebarLink from "./SidebarLink";
import logo from "../assets/images/logo.jpg";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

export default class Sidebar extends Component {
  
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
