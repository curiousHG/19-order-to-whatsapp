import React, { Component } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import { CardMedia } from "@mui/material";
// import { TextField, InputField, TextBox } from "@material-ui/core";

export default class Item extends Component {
  constructor(props) {
    super(props);
  }
  onChange = (e) => {
    this.props.data[this.props.item.name] = e.target.value;
  };
  render() {
    return (
      <ListItemButton sx={{ pl: 2 }}>
        <ListItemIcon sx={{ textAlign: "right" }}>
          <img src={this.props.item.image} width="150" height="100" />
        </ListItemIcon>
        <ListItemText
          primary={this.props.item.name}
          sx={{
            textAlign: "center",
            fontSize: "2rem",
          }}
        />
        <TextField
          value={this.props.data[this.props.item.name]}
          onChange={this.onChange}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          variant="outlined"
          sx={{
            width: "20%",
            height: "10%",
            margin: "0 auto",
          }}
        />
      </ListItemButton>
    );
  }
}
