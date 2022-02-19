import React, { Component } from "react";
import Item from "./Item";
import {
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Box,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import CategoryList from "./CategoryList";
import axios from "axios";

export default class OrderPage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    details: [],
    filled_data: {},
  };
  componentDidMount() {
    let data;
    axios
      .get("http://localhost:8000/store/category")
      .then((res) => {
        data = res.data;
        this.setState({
          details: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Post the data to the server
  sendData() {
    axios
      .post("http://localhost:8000/store/order/", this.state.filled_data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Grid item xs={12} maxwidth="200px">
        <Typography variant="h4" component="h4" align="center" bgcolor="black">
          Order Page
        </Typography>
        {this.state.details.map((item) => (
          <CategoryList
            key={item.id}
            item={item}
            data={this.state.filled_data}
            padding={2}
            style={{ color: "blue" }}
          />
        ))}
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/final"
            onClick={() => {
              // console.log(this.state.filled_data);
              this.sendData();
            }}
          >
            Make Order
          </Button>
        </Box>
      </Grid>
    );
  }
}
