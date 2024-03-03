import React, { Component, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
    Box,
    Button,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import postCustomer from "../api/postCustomer";
import postOrder from "../api/postOrder";



export default function FinalPage() {
    const [order, setOrder] = useState({});
    const [pathname, setPathname] = useState("http://wa.me/919811572962?");
    const [submit, setSubmit] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        const order = JSON.parse(localStorage.getItem("order"));
        setOrder(order);
        // var pathname = "http://wa.me/919811572962?text=Item%20Quantity%0A";
        // for (let key in order) {
        //   // Chai%20Patti%2020Kg
        //   pathname += key + "%20" + order[key] + "%0A";
        // }
        // console.log(pathname);
    }, []);

    // redirect to whatsapp
    async function redirect() {
        let pathname = "http://wa.me/919811572962?text=Hello!%0AI%20want%20to%20order%20the%20following%20items%20from%20your%20store%0A%0A";
        pathname += "Name:%20" + name + "%0A";
        pathname += "Address:%20" + address + "%0A%0A";
        for (let key in order) {
            // Chai%20Patti%2020Kg
            if (order[key] !== null) pathname += key + "%20" + order[key] + "%0A";
        }
        pathname += "%0A%0AThank%20you!";
        setPathname(pathname);
        // const resp_cust = await postCustomer({ name: name, address: address});
        // const resp_order = await postOrder(order);

        const restructered_order = [];
        for (let key in order) {
            if (order[key] !== null) restructered_order.push({ product: key, quantity: order[key] });
        }
        // console.log(restructered_order);

        const resp_order = await postOrder({ customer: {name: name, address: address}, products: restructered_order})
            .then(status => {
                if (status === 201) {
                    setSubmit(true);
                    window.location.href = pathname;
                }
            })
            .catch(err => {
                console.log(err);
            });


    }

    function onChangeName(e) {
        setName(e.target.value);
    }

    function onChangeAddress(e) {
        setAddress(e.target.value);
    }
    return (
        <div>
            <Box textAlign="center">
                <Typography variant="h2" color={"black"} fontWeight="bold">
                    Order Summary
                </Typography>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead style={{ backgroundColor: "lightgreen" }}>
                        <TableRow>
                            <TableCell
                                align="center"
                                style={{ width: "50%", fontSize: "3rem" }}
                            >
                                Item
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{ width: "50%", fontSize: "3rem" }}
                            >
                                Quantity
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(order).map((key) => {
                            return (
                                <TableRow key={key}>
                                    <TableCell align="center" style={{ fontSize: "1.5rem" }}>
                                        {key}
                                    </TableCell>
                                    <TableCell align="center" style={{ fontSize: "1.5rem" }}>
                                        {order[key]}
                                    </TableCell>
                                </TableRow>

                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box textAlign="center" margin={2}>
                <TextField
                    id="outlined-required"
                    label="Name"
                    // increase label font size
                    InputLabelProps={{ style: { fontSize: "1.2rem", textAlign: "center" } }}
                    // increase border thickness
                    sx={{ width: "50%", fontSize: "1.5rem", margin: "1rem" }}
                    inputProps={{ style: { fontSize: "1.5rem" } }}
                    onChange={onChangeName}
                />
                {/* put button to next line */}
                <br />
                <TextField
                    id="outlined-required"
                    label="Address"
                    // increase label font size
                    InputLabelProps={{ style: { fontSize: "1.2rem", textAlign: "center" } }}
                    sx={{ width: "50%", fontSize: "1.5rem", margin: "1rem" }}
                    inputProps={{ style: { fontSize: "1.5rem" } }}
                    onChange={onChangeAddress}
                />
                <br />
                <Button variant="contained" onClick={redirect} color="primary" >
                    <WhatsAppIcon style={{ fontSize: 30, paddingRight: "0.5rem" }} />
                    <Typography variant="h5">
                        Send to Whatsapp
                    </Typography>
                </Button>
            </Box>
        </div>


    )
}

