import React, { Component } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ListItem, ListItemText, TextField, Select, MenuItem, CardMedia } from "@mui/material";
import { Box, Typography } from "@material-ui/core";

// import { TextField, InputField, TextBox } from "@material-ui/core";

export default class Item extends Component {

  // define state
  state = {
    quantity: "",
    unit: "KG",
  };


  onChange = (e) => {

    this.setState({
      quantity: e.target.value,
    });
    this.props.data[this.props.item.name] = e.target.value + " " + this.state.unit;
  };
  changeUnit = (e) => {
    this.setState({
      unit: e.target.value,
    });
    // trim the unit from the string
    this.props.data[this.props.item.name] = this.state.quantity + " " + e.target.value;
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
          value={this.state.quantity}
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
          {/* {this.props.item.unit} */}

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.unit}
            label="Unit"
            onChange={this.changeUnit}
            sx={{
              margin: "0 auto",
              backgroundColor: "transparent",
              color: "white",
              
            }}
          >
            <MenuItem value={"KG"}>Kg</MenuItem>
            <MenuItem value={"GM"}>GM</MenuItem>
            <MenuItem value={"PACKET"}>Pc</MenuItem>
          </Select>
      </ListItem>
    );
  }
}
