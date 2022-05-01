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

export default class FinalPage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    order: {},
    pathname: "http://wa.me/917982743323?",
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
    var pathname = "http://wa.me/919811572962?text=Item%20Quantity%0A";
    for (let key in order) {
      // Chai%20Patti%2020Kg
      pathname += key + "%20" + order[key] + "%0A";
    }
    console.log(pathname);

    this.setState({
      order: order,
      pathname: pathname,
    });
  }

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
              <TableRow>
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
              </TableRow>
              {Object.keys(this.state.order).map((key) => {
                return (
                  <TableRow>
                    <TableCell align="center" style={{ top: 57 }}>
                      {key}
                    </TableCell>
                    <TableCell align="center" style={{ top: 57 }}>
                      {this.state.order[key]}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box textAlign="center" margin={2}>
          <Button variant="contained" color="green" href={this.state.pathname}>
            <WhatsAppIcon />
            <Typography variant="h6"> Send to Whatsapp</Typography>
          </Button>
        </Box>
        <Typography variant="h4" textAlign="center">Thank you for your order!</Typography>
      </div>
    );
  }
}
