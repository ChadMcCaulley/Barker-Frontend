import React from "react";
import {Switch, Route, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import Homepage from "../pages/Homepage";
import UserPage from "../pages/UserPage";
import AccountPage from "../pages/AccountPage";
import AuthForm from "../pages/AuthForm";
import GuestLogin from "../pages/GuestLogin";
import ForgotPassword from "../pages/ForgotPassword";
import {authUser, forgotPassword} from "../store/actions/auth";
import {removeError} from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import MessageForm from "./MessageForm";
import Navbar from "./Navbar";
import Error from "../pages/Error";
import ResetPassword from "../pages/ResetPassword";

const Main = props => {
    const {
        authUser,
        errors,
        removeError,
        currentUser,
        pageOwner,
        history
    } = props;
    return (
        <div>
            <Navbar/>
            <div className="container">
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={props => <Homepage
                        currentUser={currentUser}
                        pageOwner={pageOwner}
                        history={history}
                        {...props}/>}/>
                    <Route
                        exact
                        path="/signin"
                        render={props => {
                        return (<AuthForm
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser}
                            buttonText="Log In"
                            heading="Welcome Back"
                            {...props}/>)
                    }}/>
                    <Route
                        exact
                        path="/signin/asguest"
                        render={props => {return (<GuestLogin history={history}/>)}}/>
                    <Route
                        exact
                        path="/signup"
                        render={props => {
                        return (<AuthForm
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser}
                            buttonText="Sign Me Up!"
                            heading="Welcome to Barker"
                            signUp
                            {...props}/>)
                    }}/>
                    <Route
                        exact
                        path="/forgotPassword"
                        render={props => {
                        return (<ForgotPassword
                            removeError={removeError}
                            errors={errors}
                            onAuth={forgotPassword}
                            {...props}/>)
                    }}/>
                    <Route
                        exact
                        path="/reset/:token"
                        render={props => {
                        return (<ResetPassword
                            removeError={removeError}
                            errors={errors}
                            onAuth={forgotPassword}
                            {...props}/>)
                    }}/>
                    <Route
                        exact
                        path="/users/:id/userpage"
                        render={props => <UserPage pageOwner={pageOwner} currentUser={currentUser} {...props}/>}/>
                    <Route
                        exact
                        path="/users/:id/userpage/edit"
                        render={props => <AccountPage {...props}/>}/>
                    <Route exact path="/users/:id/messages/new" component={withAuth(MessageForm)}/>
                    <Route component={Error}/>
                </Switch>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {currentUser: state.currentUser, errors: state.errors};
}

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main)); // gets props from router to component