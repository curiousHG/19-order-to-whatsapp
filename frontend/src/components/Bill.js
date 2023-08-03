import React, { useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import { DataGrid } from "@mui/x-data-grid";

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
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const Bill = () => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const [item, setItem] = useState({}); // {name: "", price: 0, quantity: 0, total: 0}
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState(0);

  // run once
  useEffect(() => {
    axios
      .get("/store/products")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const handleAdd = (e) => {
    e.preventDefault();
    if (item.id) {
      const bool = order.some((i) => i.id === item.id);
      if (!bool) {
        item["quantity"] = parseInt(quantity);
        setOrder([...order, item]);
        setTotal(total + item.price * quantity);
      } else {
        alert("Item already added");
      }
    }
    console.log(item);
  };


  // get prices

  return (
    <div
      style={{
        margin: "0px",
        padding: "5px",
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h2">Bill</Typography>
      </div>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          getOptionLabel={(option) => option.name || ""}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                <Typography noWrap>
                  {option.name}
                </Typography>
              </li>)
          }}
          options={data.map((option) => option)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              margin="normal"
              variant="outlined"
            />

          )}
          sx={{ width: 300 }}
          onChange={(e, value) => {
            if (value) {
              setItem(value);
            }
          }}
        />
        <TextField
          id="outlined-basic"
          label="Quantity"
          variant="outlined"
          type="number"
          InputProps={{ inputProps: { min: 1 } }}

          value={quantity}
          onChange={(e) => {
            if (e.target.value > 0) {
              setQuantity(e.target.value);
            }
          }}
          style={{
            position: "relative",
            top: "4px",
          }}
        />
        <Button variant="contained"
          sx={{ marginLeft: "10px" }} onClick={handleAdd}>
          Add
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{
            minWidth: 650,
            border: "1px solid #ddd",
          }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f9f9f9", border: "1px solid #ddd" }}>
                <TableCell align="center">ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.length > 0 && order.map((item, key) => {
                console.log(key);
                return (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
                  >
                    <TableCell padding="checkbox" align="center">
                      {key + 1}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="right">
                      {editMode && selected === key ? (
                        <TextField
                          id="standard-basic"
                          label=""
                          variant="standard"
                          type="number"
                          InputProps={{ inputProps: { min: 1 } }}
                          value = {item.price}
                          onChange={(e) => {
                            const newOrder = [...order];
                            newOrder[key].price = e.target.value;
                            setOrder(newOrder);
                              
                            }
                          }
                          // on out of focus change edit mode
                          onBlur={() => {
                            setEditMode(false);
                            setSelected(0);
                          }}
                        />
                      ) : (
                        item.price
                      )}

                            
                    </TableCell>
                    <TableCell align="right">
                    {editMode && selected === key ? (
                        <TextField
                          id="standard-basic"
                          label=""
                          variant="standard"
                          type="number"
                          InputProps={{ inputProps: { min: 1 } }}
                          value = {item.quantity}
                          onChange={(e) => {
                            const newOrder = [...order];
                            newOrder[key].quantity = e.target.value;
                            setOrder(newOrder);
                              
                            }
                          }
                          align="right"
                        />
                      ) : (
                        item.quantity
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {item.price * item.quantity}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          const newOrder = [...order];
                          newOrder.splice(key, 1);
                          setOrder(newOrder);
                        }}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          setEditMode(true);
                          setSelected(key);
                          setItem(item);
                          setQuantity(item.quantity);
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
              <TableRow>
                <TableCell colSpan={4} align="right">
                  Total
                </TableCell>
                <TableCell align="right">
                  {order.length > 0 && order.reduce((a, b) => a + b.price * b.quantity, 0)}
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* <Box sx={{border: '1px solid grey', marginTop: '10px' }}>
        <DataGrid
          rows={order}
          getRowId={(row) => row.id}
          columns={[
            { field: 'name', headerName: 'Product Name', width: 200 },
            { field: 'price', headerName: 'Price', width: 200 },
            { field: 'quantity', headerName: 'Quantity', width: 200 },
            { field: 'total', headerName: 'Total', width: 200 },
            {
              field: 'Actions',
              headerName: 'Delete',
              width: 200,
              renderCell: (params) => (
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    const newOrder = [...order];
                    newOrder.splice(params.rowIndex, 1);
                    setOrder(newOrder);
                  }}
                >
                  <Delete />
                </IconButton>
              )
            },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box> */}

    </div>
  );
};

export default Bill;
