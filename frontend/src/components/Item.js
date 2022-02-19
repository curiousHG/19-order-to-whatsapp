import React, { Component } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { TextField } from "@mui/material";

export default class Item extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                    <img src = {this.props.item.image}/>
                </ListItemIcon>
                <ListItemText primary={this.props.item.name} />
                <InputField onChange={this.props.onChange} item={this.props.item} />
            </ListItemButton>
        );
    }
}