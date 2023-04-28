import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";



const Bill = () => {
    const SearchBar = ({ setSearchQuery }) => (
    <form>
        <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
                setSearchQuery(e.target.value);
            }}
            label="Enter a city name"
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={searchQuery}
        />
        <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
    </form>
);
    const data = [
        "Paris",
        "London",
        "New York",
        "Tokyo",
        "Berlin",
        "Buenos Aires",
        "Cairo",
        "Canberra",
        "Rio de Janeiro",
        "Dublin"
    ];
    const filterData = (query, data) => {
        e.preventDefault();
        if (!query) {
            return data;
        } else {
            return data.filter((d) => d.toLowerCase().includes(query));
        }
    };

    // get prices
    // const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const dataFiltered = filterData(searchQuery, data);

    // run once
    // useEffect(() => {
    //     axios.get("/store/category").then((res) => {
    //         setData(res.data);
    //         console.log(res.data);
    //     }).catch((err) => {
    //         console.log(err);

    //     });
    // }, []);

    return (
        <>
            <h1>Bill</h1>
            {/* <div
                style={{
                    display: "flex",
                    alignSelf: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: 20
                }}
            >
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <div style={{ padding: 3 }}>
                    {dataFiltered.map((d) => (
                        <div
                            className="text"
                            style={{
                                padding: 5,
                                justifyContent: "normal",
                                fontSize: 20,
                                color: "blue",
                                margin: 1,
                                width: "250px",
                                BorderColor: "green",
                                borderWidth: "10px"
                            }}
                            key={d.id}
                        >
                            {d}
                        </div>
                    ))}
                </div>
            </div> */}
            {/* {data.map((item) => (
                <div>
                    <h1>{item.name}</h1>
                    {item.products.map((p) => (
                        <h2>{p.name} <span>{p.price}</span>  </h2>
                    ))}
                </div>
            ))} */}
        </>
    )
};

export default Bill;
