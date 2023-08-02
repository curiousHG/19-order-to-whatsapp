import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import {
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";

const Bill = () => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState({});
  const [selected, setSelected] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // run once
  useEffect(() => {
    axios
      .get("/store/products")
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    //   console.log(order);
  }, [order.length]);

  const handleAdd = (e) => {
    // e.preventDefault();
    // const newOrder = { ...order };
    // if (newOrder[selected]) {
    //   newOrder[selected] += 1;
    // } else {
    //   newOrder[selected] = 1;
    // }
    // setOrder(newOrder);
  };

  // get prices

  return (
    <div
      style={{
        margin: "5px",
        padding: "5px",
      }}
    >
      <h1>Bill</h1>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={data.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              margin="normal"
              variant="outlined"
            />
          )}
          sx={{ width: 300 }}
        />
        <TextField
          id="outlined-basic"
          label="Quantity"
          variant="outlined"
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
        />
        <Button variant="contained" sx={{ marginLeft: "10px" }} onClick={handleAdd}>
          Add
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.length > 0 && Object.keys(order).map((item, key) => {
                console.log(item);
                return (
                    <></>
                // <TableRow
                //   key={key}
                //   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                // >
                //   <TableCell component="th" scope="row">
                //     {key}
                //   </TableCell>
                //   <TableCell align="right">
                //     {data.find((item) => item.name === key).price}
                //   </TableCell>
                //   <TableCell align="right">{order[key]}</TableCell>
                //   <TableCell align="right">
                //     {data.find((item) => item.name === key).price * order[key]}
                //   </TableCell>
                //   <TableCell align="right">
                //     <IconButton
                //       aria-label="delete"
                //       onClick={() => {
                //         const newOrder = { ...order };
                //         delete newOrder[key];
                //         setOrder(newOrder);
                //       }}
                //     >
                //       <Delete />
                //     </IconButton>
                //   </TableCell>
                // </TableRow>
              )})}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default Bill;
