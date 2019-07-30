import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class GuestLogin extends Component {
    handleClick = e => {
        
        this.props.history.push("/");
    }
    render() {
        return (
            <div>
                <h1> Guest Login </h1>
                <p> 
                    Press the button below to login in as a guest 
                    <br/>Creating messages and replies relies on having a user account
                    <br/>For the full experience feel free to signup with a fake email
                </p>
                <button className="btn btn-primary btn-block btn-lg" onClick={this.handleClick}>Log In As Guest</button>
            </div>
        )
    }
}
