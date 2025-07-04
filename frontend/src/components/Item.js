import React, { Component, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ListItem, ListItemText, TextField, Select, MenuItem, CardMedia, Grid } from "@mui/material";
import { Box, Typography } from "@material-ui/core";

// import { TextField, InputField, TextBox } from "@material-ui/core";

const Item = ({ item, data }) => {

    // define state
    // console.log(item);
    const productKey = item.name +" "+item.description;
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState(item.unit);

    const onChange = (e) => {
        setQuantity(e.target.value);
        data[productKey] = e.target.value + " " + unit;
    }
    const onBlur = (e) => {

        if(quantity==="" || quantity == 0){
            setQuantity("");
            delete data[productKey];
        }else if (quantity < 1 && unit != "Pc") {
            setQuantity(quantity * 1000);
            setUnit("gm");
            data[productKey] = quantity*1000 + " " + "gm";
        }else if(quantity > 99 && unit != "Pc"){
                setQuantity(quantity);
                setUnit("gm");
                data[productKey] = quantity + " " + "gm";
        }else if (quantity >= 1 && unit != "Pc") {
            setQuantity(quantity);
            setUnit("KG");
            data[productKey] = quantity + " " + "KG";
        }
    }
    return (
        <ListItem >
            <Grid container alignItems="center" justifyContent="space-between">
                {/* First Column */}
                <Grid item xs={7}>
                    <ListItemText
                        primary={productKey}
                        primaryTypographyProps={{ fontSize: "2.5rem" }}
                        style={{ textAlign: "left", color: "white" }}
                    />
                </Grid>

                {/* Second Column */}
                <Grid item xs={4}>
                    <TextField
                        value={quantity}
                        onChange={onChange}
                        onBlur={onBlur}
                        inputProps={{ style: { textAlign: "center", fontSize: "2.5rem" } }}
                        variant="outlined"
                        fullWidth
                        style={{ backgroundColor: "white" }}
                    />
                </Grid>

                {/* Third Column */}
                <Grid item xs={1}>
                    <ListItemText
                        primary={unit}
                        primaryTypographyProps={{ fontSize: "2.5rem", paddingLeft: "2px"}}
                        style={{ textAlign: "left", color: "white", width: "100px" }}
                    />
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default Item;