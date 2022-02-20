import React, {Component} from "react";
import { Table } from "@mui/material";

export default class FinalPage extends Component {

    
    componentDidMount(){
        console.log(this.props.location.state);
    }
    render(){
        return <div>
            <p>Order Summary</p>
            {/* <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Product</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.order.map((item, index) => {
                        return <Table.Row key={index}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.quantity}</Table.Cell>
                        </Table.Row>

                    })}
                </Table.Body>
            </Table> */}
        </div>
    }
}