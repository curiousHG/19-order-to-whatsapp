// import "../css/sidebarLink.css";
import React, { Component } from "react";

export default class SidebarLink extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="link" >
            {/* <h2>{this.props.text}</h2> */}

            <a href={this.props.text}> {this.props.text} </a>
            </div>
        );
    }
}
