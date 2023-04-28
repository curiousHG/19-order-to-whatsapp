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
  }
  // Post the data to the server
  sendData() {
    this.useLocalStorage("order", this.state.filled_data);
  }

  render() {
    return (
      <div style={{ width: "100%", overflowX: "hidden" }}>
       {/* Hello */}
        <Grid container spacing={1} style = {{width:"100%"}}>
          <Grid item xs={4}>
            <Card>
              <CardMedia
                component="img"
                image={logo}
                title="Logo"
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  margin: "0 auto",
                  borderRadius: "10px",
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
