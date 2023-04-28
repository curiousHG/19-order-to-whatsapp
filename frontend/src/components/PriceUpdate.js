import React, {Component, useState, useEffect} from "react";
import axios from "axios";

const PriceUpdate = () => {

    // get prices
    const [data, setData] = useState([]);

    // run once
    useEffect(() => {
        axios.get("/store/category").then((res) => {
        setData(res.data);
        console.log(res.data);
    }).catch((err) => {
        console.log(err);

    });
    }, []);
    
    return (
        <>
        {data.map((item) => (
            <div>
                <h1>{item.name}</h1>
                {item.products.map((p) => (
                    <h2>{p.name} <span>{p.price}</span>  </h2>
                ))}
            </div>
        ))}
        </>
    )
};

export default PriceUpdate;
