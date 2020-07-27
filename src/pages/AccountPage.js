import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import MessageList from "../containers/MessageList";

class AccountPage extends Component {
    render() {
        const {messages, pageOwner, history, currentUser} = this.props;
        return (
            <div>
                <h1> UNDER DEVELOPMENT </h1>
                <Link to="/">Return to Home Page </Link>
                <MessageList
                    currentUser={currentUser}
                    messages={messages}
                    pageOwner={pageOwner}
                    history={history}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {pageOwner: state.pageOwner}
}

export default connect(mapStateToProps)(AccountPage);
