// import "./css/sidebar.css";
import React, { Component } from "react";
import SidebarLink from "./SidebarLink";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="sidebar">
        {this.props.info.map((item) => {
          return <SidebarLink key = {item.id} text={item.name} />;
        })}
      </div>
    );
  }
}
