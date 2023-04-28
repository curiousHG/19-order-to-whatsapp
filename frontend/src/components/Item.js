import React, { Component } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { CardMedia } from "@mui/material";
import { Box, Typography } from "@material-ui/core";

// import { TextField, InputField, TextBox } from "@material-ui/core";

export default class Item extends Component {
  constructor(props) {
    super(props);
  }
  onChange = (e) => {
    this.props.data[this.props.item.name] = e.target.value;
    this.props.data[this.props.item.name] += this.props.item.unit;
  };
  render() {
    return (
      <ListItem sx={{ pl: 2 }}>
        {/* <ListItemIcon sx={{ textAlign: "right" }}>
          <img src={this.props.item.image} width="100" height="60" />
        </ListItemIcon> */}
        <ListItemText
          primary={this.props.item.name}
          primaryTypographyProps={{ fontSize: "2.5rem" }}
          style={{ textAlign: "left", color: "white" }}
        />
        <TextField
          value={this.props.data[this.props.item.name]}
          onChange={this.onChange}
          inputProps={{ style: { textAlign: "center", fontSize: "2.5rem" } }}
          variant="outlined"
          sx={{
            width: "20%",
            height: "10%",
            margin: "0 auto",
            backgroundColor: "white",
            minWidth: "40px",
            
          }}
        />
        <Typography variant="h4" style={{ color: "white", padding: "0 2px", marginLeft:"1px" }}>
          {this.props.item.unit}
        </Typography>
      </ListItem>
    );
  }
}
