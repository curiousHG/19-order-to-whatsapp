import React, { Component } from "react";
import { Typography, Button, Box, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import CategoryList from "./CategoryList";
import axios from "axios";
import Sidebar from "./Sidebar";
import logo from "./images/logo.jpg";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
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
    // let preDataLoad = true;
    // if (localStorage.getItem("time")) {
      // console.log(localStorage.getItem("time"));
      // const time = new Date(localStorage.getItem("time"));
      // console.log(time);
      // const now = new Date();
      // const diff = now - time;
      // console.log(time, now, diff);
      // if (diff > 1000 * 60 * 60 * 2) {
      //   preDataLoad = false;
      // }
    // }
    // if (localStorage.getItem("order") && preDataLoad) {
    //   this.setState({
    //     filled_data: this.useLocalStorage("order"),
    //   });
    // }
  }
  removeEmptyItems = () => {
    let data = this.state.filled_data;
    for (let key in data) {
      // if first character of value is not a number delete
      if( data[key][0] < '0' || data[key][0] > '9'){
        delete data[key];
      }
    }
    this.setState({
      filled_data: data,
    });
  }
  // Post the data to the server
  sendData() {
    // const now = new Date();
    this.removeEmptyItems();
    console.log(this.state.filled_data);
    this.useLocalStorage("order", this.state.filled_data);
    // this.useLocalStorage("time", now);
  }

  render() {
    return (
      <div style={{overflowX: "hidden", padding:"5px" }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Card>
              <CardMedia
                component="img"
                image={logo}
                title="Logo"
                sx={{
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  margin: "0 auto",
                  borderRadius: "2px",
                  shadow: "2px 2px 5px #000000",
                }}
              />
            </Card>

            <Sidebar info={this.state.details} />

            <Box textAlign="center">
              <Link
                to={{ pathname: "/final", state: this.state.filled_data }}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.sendData();
                  }}
                >
                  <Typography variant="h3">Confirm Order</Typography>
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <div style={{ maxHeight: "100vh", overflowX: "hidden" }}>
              {this.state.details.map((item) => (
                <CategoryList
                  key={item.id}
                  item={item}
                  data={this.state.filled_data}
                  padding={2}
                  style={{ color: "blue" }}
                />
              ))}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
