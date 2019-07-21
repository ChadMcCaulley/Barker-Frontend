import React, {Component} from "react";
import {connect} from "react-redux";
import {postNewMessage} from "../store/actions/messages";

class NewMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            isActive: false
        };
        this.handleClick = this
            .handleClick
            .bind(this);
        this.handleNewMessage = this
            .handleNewMessage
            .bind(this);
    }
    handleNewMessage = event => {
        event.preventDefault();
        this
            .props
            .postNewMessage(this.state.message, false, null); //post new message to database
        this.setState({message: ""}); // reset message
    }
    handleClick = event => {
        event.preventDefault();
        this.setState({
            isActive: !this.state.isActive
        });
    }
    render() {
        return (
            <div>
                <button className="navbar-li" onClick={this.handleClick}>New Message</button>
                {this.state.isActive && <div className="popup">
                    <div className="popupInner">
                            <button onClick={this.handleClick}>
                                X
                            </button>
                            <form onSubmit={this.handleNewMessage} id="message-form">
                                <textarea
                                    rows="8"
                                    cols="50"
                                    type="text"
                                    className="form-control"
                                    value={this.state.message}
                                    onChange={e => this.setState({message: e.target.value})}/>
                                <button type="submit" className="btn btn-success">
                                    Add New Message!
                                </button>
                            </form>
                    </div>
                </div>
            }
            </div>

        )
    }
}
function mapStateToProps(state) {
    return {errors: state.errors};
}

export default connect(mapStateToProps, {postNewMessage})(NewMessage);