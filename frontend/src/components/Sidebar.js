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
        {/* <Card>
          <CardMedia
            component="img"
            image={logo}
            title="Logo"
            sx={{
              width: "100%",
              height: "100%",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              margin: "0 auto",
              borderRadius: "10px",
              shadow: "2px 2px 5px #000000",
            }}
          />
        </Card> */}
        <div className="sidebar" >
          {this.props.info.map((item) => {
            return <SidebarLink key={item.id} text={item.name} />;
          })}
        </div>
      </div>
    );
  }
}
