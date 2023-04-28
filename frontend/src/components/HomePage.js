import React, { Component } from "react";
import FinalPage from "./FinalPage";
import OrderPage from "./OrderPage";
import PriceUpdate from "./PriceUpdate";
import Test from "./test";
import ResponsiveAppBar from "./OrderPage2";
import { BrowserRouter as Router, Route, Link, Routes, Redirect } from "react-router-dom";


export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<>
            <Router>
                <Routes>
                    <Route path="/" element={<OrderPage />} />
                    <Route exact path="/final" element={<FinalPage />} />
                    <Route exact path="/home" element={<ResponsiveAppBar />} />
                    <Route exact path="/price" element={<PriceUpdate />} />
                </Routes>
            </Router>
        </>)
    }
}