import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
import { Button, Box } from "@material-ui/core";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { withStyles } from "@material-ui/styles";
import {TextField} from "@mui/material";

export default class FinalPage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    order: {},
    pathname: "http://wa.me/919811572962?",
  };
  useLocalStorage(key, value) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      let data = localStorage.getItem(key);
      return JSON.parse(data);
    }
  }
  componentDidMount() {
    const order = JSON.parse(localStorage.getItem("order"));
    // var pathname = "http://wa.me/919811572962?text=Item%20Quantity%0A";
    // for (let key in order) {
    //   // Chai%20Patti%2020Kg
    //   pathname += key + "%20" + order[key] + "%0A";
    // }
    // console.log(pathname);

    this.setState({
      order: order,
      // pathname: pathname,
    });
  }
  // redirec to whatsapp
  redirect() {
    var pathname = "http://wa.me/919811572962?text=Hello!%0AI%20want%20to%20order%20the%20following%20items%20from%20your%20store%0A%0A";
    var name = this.state.name;
    var address = this.state.address;
    var heading = "Item%20Quantity%0A";
    pathname += "Name:%20" + name + "%0A";
    pathname += "Address:%20" + address + "%0A%0A";
    // pathname += heading;
    for (let key in this.state.order) {
      // Chai%20Patti%2020Kg
      pathname += key + "%20" + this.state.order[key] + "%0A";
    }
    pathname += "%0A%0AThank%20you!";
    // console.log(pathname);
    this.setState({
      pathname: pathname,
    });
    window.location.href = pathname;
  }
  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  onChangeAddress = (e) => {
    this.setState({
      address: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <Box textAlign="center" boxShadow={3} margin={2}>
          <Typography variant="h2" color={"black"}>
            Order Summary
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead style={{ backgroundColor: "lightgreen" }}>
              <TableRow>
                <TableCell
                  align="center"
                  style={{ width: "50%", fontSize: "3rem" }}
                >
                  Item
                </TableCell>
                <TableCell
                  align="center"
                  style={{ width: "50%", fontSize: "3rem" }}
                >
                  Quantity
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <TableRow>
                <TableCell
                  align="center"
                  style={{fontSize: "1.5rem" }}
                >
                  Bedmi Puri Atta
                </TableCell>
                <TableCell
                  align="center"
                  style={{fontSize: "1.5rem" }}
                >
                  400 gm
                </TableCell>
              </TableRow> */}
              {Object.keys(this.state.order).map((key) => {
                return (
                  <TableRow>
                    <TableCell align="center" style={{ fontSize: "1.5rem" }}>
                      {key}
                    </TableCell>
                    <TableCell align="center" style={{ fontSize: "1.5rem" }}>
                      {this.state.order[key]}
                    </TableCell>
                  </TableRow>
                
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box textAlign="center" margin={2}>
        <TextField
          id="outlined-required"
          label="Name"
          // increase label font size
          InputLabelProps={{ style: { fontSize: "1.2rem", textAlign: "center" } }}
          // increase border thickness
          sx={{ width: "50%", fontSize: "1.5rem", margin: "1rem"}}
          inputProps={{ style: { fontSize: "1.5rem" } }}
          onChange={this.onChangeName}
        />
        {/* put button to next line */}
        <br />
        <TextField
          id="outlined-required"
          label="Address"
          // increase label font size
          InputLabelProps={{ style: { fontSize: "1.2rem", textAlign: "center" } }}
          sx={{ width: "50%", fontSize: "1.5rem", margin: "1rem" }}
          inputProps={{ style: { fontSize: "1.5rem" } }}
          onChange={this.onChangeAddress}
        />
        <br />
          <Button variant="contained" color="green" onClick={this.redirect.bind(this)}>
            <WhatsAppIcon />
            <Typography variant="h6"> Send to Whatsapp</Typography>
          </Button>
        </Box>
        
        <Typography variant="h4" textAlign="center">
          Thank you for your order!
        </Typography>
      </div>
    );
  }
}
