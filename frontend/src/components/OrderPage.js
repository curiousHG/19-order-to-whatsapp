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
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

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
        this.props.history.push("/final");

        
      })
      .catch((err) => {
        // console.log(err);
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
          <Link to={{ pathname: "/final", state: this.state.filled_data }}>
            <Button

              variant="contained"
              color="primary"
              onClick={() => this.sendData()}
            >
              Make Order
            </Button>
          </Link>
          {/* <Button
            variant="contained"
            color="primary"
            component={Link}
            to={{ pathname: '/final', state: { order: this.state.filled_data } }}
            onClick={() => this.sendData()}

          >
            Final Page
          </Button> */}
        </Box>
      </Grid>
    );
  }
}