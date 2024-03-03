import React, { useState } from "react";
import List from "@mui/material/List";
const Item = React.lazy(() => import("./Item"));
import { Box, Typography } from "@material-ui/core";

export default function CategoryList(props) {
  const [open, setOpen] = useState(false);

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
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            // margin: "10px",
            padding: "10px",
            color: "white",
          }
        }
      >
        <Typography align="center" variant="h3">{props.item.name}</Typography>
      </Box>

      <List
        style={{
          width: "100%",
          backgroundColor: "#5587fa",
          padding: "2px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          marginBottom: "10px",

        }}
      >
        {props.item.products.map((item) => (
          <Item key={item.id} item={item} data={props.data} />
        ))}
      </List>
    </div>
  );
}
