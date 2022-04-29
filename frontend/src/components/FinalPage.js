import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Button,
  Box,
} from "@material-ui/core";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

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
    var pathname="http://wa.me/919811572962?text=Item%20Quantity%0A";
    for(let key in order) {
      // Chai%20Patti%2020Kg
      pathname+=key+"%20"+order[key]+"%0A";
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
        <p>Order Summary</p>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(this.state.order).map((key) => {
                return (
                  <TableRow>
                    <TableCell>{key}</TableCell>
                    <TableCell>{this.state.order[key]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box textAlign="center">
            <Button
              variant="contained"
              color="green"
              href={this.state.pathname}
            >
              <WhatsAppIcon />
            </Button>
        </Box>
      </div>
    );
  }
}
