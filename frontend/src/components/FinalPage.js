import React, {Component} from "react";

export default class FinalPage extends Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        console.log(this.props.state);
        return <div>
            <h1>Thank you for your order!</h1>
            <h2>Your order details are:</h2>
        </div>
    }
}