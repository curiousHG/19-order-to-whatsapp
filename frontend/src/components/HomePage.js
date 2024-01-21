import React from "react";
import FinalPage from "./FinalPage";
import OrderPage from "./OrderPage";
import Bill from "./Bill";
import Test from "./test";
// import ResponsiveAppBar from "./OrderPage2";
import { BrowserRouter as Router, Route, Link, Routes, Redirect } from "react-router-dom";


// switch from class to function

export default function HomePage() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<OrderPage />} />
                <Route exact path="/final" element={<FinalPage />} />
                {/* <Route exact path="/home" element={<ResponsiveAppBar />} /> */}
                <Route exact path="/price" element={<Bill />} />
            </Routes>
        </Router>
    )
}