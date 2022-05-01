import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Item from "./Item";
import { Box, Typography } from "@material-ui/core";

export default function CategoryList(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div id={props.item.name}>
      <Box
        justifyContent="center"
        alignItems="center"
        style={
          {
            backgroundColor: "darkred",
            borderRadius: "10px",
            margin: "10px",
            padding: "10px",
            color: "white",
          }
        }
      >
        <Typography align="center" variant = "h3">{props.item.name}</Typography>
      </Box>
      <List
        style={{
          width: "100%",
          backgroundColor: "#00a7ff",
          padding: "2px",
          // borderRadius: "1px",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {/* <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "white",
          }}
          primary={props.item.name}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton> */}

        {/* <Collapse in={open} timeout="auto" unmountOnExit> */}

        <List component="div" disablePadding>
          {/* <ListItemText
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "black",
            alignContent: "center",
            backgroundColor: "blue",
          }}
          primary={props.item.name}
        /> */}
          {props.item.products.map((item) => (
            <Item key={item.id} item={item} data={props.data} />
          ))}
        </List>
        {/* </Collapse> */}
      </List>
    </div>
  );
}
