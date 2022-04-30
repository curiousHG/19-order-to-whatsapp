import React, { Component } from "react";
import Item from "./Item";
import { Typography, Button, Box, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import CategoryList from "./CategoryList";
import axios from "axios";
import SearchAppBar from "./NavBar";
import Sidebar from "./Sidebar";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default class OrderPage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    details: [],
    filled_data: {},
    category_names: [],
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
    let data;
    axios
      .get("/store/category")
      .then((res) => {
        data = res.data;
        // console.log(data);
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
    this.useLocalStorage("order", this.state.filled_data);
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Sidebar info={this.state.details}/>
          <Box textAlign="center">
            <Link to={{ pathname: "/final", state: this.state.filled_data }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  this.sendData();
                }}
              >
                Order
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={8} maxwidth="200px">
          {/* <Typography variant="h4" component="h4" align="center" bgcolor="black">
          Order Page
        </Typography> */}
          {this.state.details.map((item) => (
            <CategoryList
              key={item.id}
              item={item}
              data={this.state.filled_data}
              padding={2}
              style={{ color: "blue" }}
            />
          ))}
          
        </Grid>
      </Grid>
    );
  }
}
