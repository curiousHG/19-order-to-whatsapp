import React, { Component, useEffect, useState, Suspense } from "react";
import { Typography, Button, Box, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import CategoryList from "./CategoryList";
import axios from "axios";
import Sidebar from "./Sidebar";
import logo from "./images/logo.jpg";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { render } from "react-dom";
import getProducts from "../api/getProducts";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";


// rewrite OrderPage with function and latest react methods

const OrderPage = () => {
  const [details, setDetails] = useState([]);
  const [filledData, setFilledData] = useState({});
  const [categoryNames, setCategoryNames] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        setDetails(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const useLocalStorage = (key, value) => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      let data = localStorage.getItem(key);
      return JSON.parse(data);
    }
  }

  const removeEmptyItems = () => {
    let data = filledData;
    for (let key in data) {
      // if first character of value is not a number delete
      if (data[key][0] < '0' || data[key][0] > '9') {
        delete data[key];
      }
    }
    setFilledData(data);
  }

  const sendData = () => {
    removeEmptyItems();
    console.log(filledData);
    useLocalStorage("order", filledData);
  }


  return (
    <div style={{ overflowX: "hidden", padding: "5px" }}>
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

          <Sidebar info={details} />

          <Box textAlign="center">
            <Link
              to={{ pathname: "/final", state: filledData }}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={sendData}
              >
                <Typography variant="h3">Confirm Order</Typography>
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <div style={{ maxHeight: "100vh", overflowX: "hidden" }}>
            {details.map((item) => (

              <CategoryList
                key={item.id}
                item={item}
                data={filledData}
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

export default OrderPage;