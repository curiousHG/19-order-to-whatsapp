import React, { useEffect, useState, lazy } from "react";
import { Typography, Button, Box, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
const LazyCategoryList = lazy(() => import("../components/CategoryList"));
import axios from "axios";
import Sidebar from "../components/Sidebar";
import logo from "../assets/images/logo.jpg";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import getAllProducts from "../api/getCategory";
import MyLoader from "../components/Loading";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";


// rewrite OrderPage with function and latest react methods

const OrderPage = () => {
  const [details, setDetails] = useState([]);
  const [filledData, setFilledData] = useState({});
  const [categoryNames, setCategoryNames] = useState([]);

  // how to get component render time

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setDetails(data);
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
    // console.log(filledData);
    useLocalStorage("order", filledData);
  }

  if (details.length === 0) {
    return <MyLoader />;
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
              <LazyCategoryList
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