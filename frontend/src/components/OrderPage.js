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

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Order Page
          </Typography>
          {this.state.details.map((item) => (
            <CategoryList key={item.id} item={item} />
          ))}
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/home"
            onClick={() => {
              this.props.history.push("/home");
            }}
            style={{ alignSelf: "center" }}
          >
            Make Order
          </Button>
        </Grid>
      </Grid>
    );
  }
}
