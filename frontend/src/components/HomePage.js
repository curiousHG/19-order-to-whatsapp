import React, { lazy, Suspense } from "react";
import Test from "./test";
const OrderPage = lazy(() => import("./OrderPage"));
const FinalPage = lazy(() => import("./FinalPage"));
const Bill = lazy(() => import("./Bill"));
import { BrowserRouter as Router, Route, Link, Routes, Redirect } from "react-router-dom";

import MyLoader from "./Loading";
// import ResponsiveAppBar from "./OrderPage2";

// switch from class to function

export default function HomePage() {
    return (
        <Router>
            <Suspense fallback={<MyLoader />}>
                <Routes>
                    <Route path="/" element={<OrderPage />} />
                    <Route exact path="/final" element={<FinalPage />} />
                    {/* <Route exact path="/test" element={<MyLoader />} /> */}
                    <Route exact path="/price" element={<Bill />} />
                </Routes>
            </Suspense>
        </Router>
    )
}