import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Logo from "../images/barker-logo.png";
import {logout} from "../store/actions/auth";
import NewMessage from "./NewMessage";

class Navbar extends Component {
    logout = e => {
        this.props.logout();
    }
    render() {
        return (
            <nav className="navbar navbar-expand">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" id="navbar-home" className="navbar-brand">
                            <img src={Logo} alt="BarkerHome"/>
                        </Link>
                    </div>
                    {this.props.currentUser.isAuthenticated
                        ? (
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <Link to={`/users/${this.props.currentUser.user.id}/messages/new`} className="navbar-li">
                                        New Message
                                    </Link>
                                </li>
                                {/* <li>
                                    <NewMessage userId={this.props.currentUser.user.id}/>
                                </li>  */}
                                <li>
                                    <a href="https://yelp-camp-cm.herokuapp.com/" className="navbar-li">YelpCamp</a>
                                </li>
                                <li>
                                    <Link to="/" className="navbar-li" onClick={this.logout}>
                                        Log Out
                                    </Link>
                                </li>
                            </ul>

                        )
                        : (
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <a href="https://yelp-camp-cm.herokuapp.com/" className="navbar-li">YelpCamp</a>
                                </li>
                                <li>
                                    <Link to="/signup" className="navbar-li">
                                        Sign Up
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signin" className="navbar-li">
                                        Log In
                                    </Link>
                                </li>
                            </ul>
                        )}
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {currentUser: state.currentUser};
}

export default connect(mapStateToProps, {logout})(Navbar);