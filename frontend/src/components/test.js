import React, { Component } from "react";
import { Grid } from "@material-ui/core";

export default class Test extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Grid container className="grid-container">
        <Grid
          item
          xs={6}
          className={"grid-column"}
          style={{ backgroundColor: "pink" }}
        >
          <h1>Column 1</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>scroll down again</h1>
          <h1>app bar is gone</h1>
        </Grid>
        <Grid
          item
          xs={6}
          className={"grid-column"}
          style={{ backgroundColor: "lightblue" }}
        >
          <h1>Column 2</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>new line</h1>
          <h1>end line</h1>
        </Grid>
      </Grid>
    );
  }
}
