import React, {Component} from "react";
import FinalPage from "./FinalPage";
import OrderPage from "./OrderPage";
import Test from "./test";
import {BrowserRouter as Router, Route, Link, Routes, Redirect} from "react-router-dom";


export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        return <Router>
            <Routes>
                <Route path = "/" element = {<OrderPage/>} />
                <Route exact path = "/final" element = {<FinalPage />} />
                <Route exact path = "/home" element = {<Test/>}/>
            </Routes>
        </Router>
    }
}