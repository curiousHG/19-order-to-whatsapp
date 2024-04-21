import React, { lazy, Suspense } from "react";
import Test from "../components/test";
const OrderPage = lazy(() => import("./OrderPage"));
const FinalPage = lazy(() => import("./FinalPage"));
const PricePage = lazy(() => import("./PricePage"));
const BillPage = lazy(() => import("./BillPage"));
import { BrowserRouter as Router, Route, Link, Routes, Redirect } from "react-router-dom";
import MyLoader from "../components/Loading";
import MyDocument from "../components/Document";
// import ResponsiveAppBar from "./OrderPage2";

// switch from class to function

export default function HomePage() {
    return (
        <Router>
            <Suspense fallback={<MyLoader />}>
                <Routes>
                    <Route path="/" element={<OrderPage />} />
                    <Route exact path="/final" element={<FinalPage />} />
                    <Route exact path="/bill" element={<BillPage />} />
                    <Route exact path="/price" element={<PricePage />} />
                    {/* <Route exact path="/test" element={<MyDocument />} /> */}
                </Routes>
            </Suspense>
        </Router>
    )
}