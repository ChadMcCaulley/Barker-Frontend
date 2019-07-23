import React, {Component} from "react";
import {Link} from "react-router-dom";

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegexStrong = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=" +
        ".{6,})");

export default class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            profileImageUrl: "",
            password: "",
            formErrors: {
                email: "",
                username: "",
                password: ""
            }
        };
    }
    handleChange = e => {
        e.preventDefault();
        const name = e.target.name,
            value = e.target.value;
        let formErrors = {
            ...this.state.formErrors
        };
        switch (name) {
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "Invalid Email Address";
                break;
            case "password":
                formErrors.password = value.length >= 8 && value.length <= 32
                    ? ""
                    : "Password must be between 8 and 32 characters"
                break;
            case "username":
                formErrors.username = value.length > 3 && value.length <= 32
                    ? ""
                    : "Username must be 3-32 characters long"
                break;
        }
        this.setState({formErrors, [name]: value});
    };
    handleSubmit = event => {
        event.preventDefault();
        const authType = this.props.signUp
            ? "signup"
            : "signin";
        this
            .props
            .onAuth(authType, this.state)
            .then(() => {
                this
                    .props
                    .history
                    .push("/"); // render the homepage
            })
            .catch(() => {
                return;
            })
    };
    render() {
        const {formErrors, email, username, profileImageUrl} = this.state;
        const {
            heading,
            buttonText,
            signUp,
            errors,
            history,
            removeError
        } = this.props;
        history.listen(() => {
            removeError();
        });
        return (
            <div>
                <div className="row justify-content-md-center text-center auth-form">
                    <div className="col-md-8">
                        <form onSubmit={this.handleSubmit}>
                            <h2>
                                {heading}
                            </h2>
                            {errors.message && <div className="alert alert-danger">{errors.message}</div>}
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={email}
                                    type="text"/> 
                                {signUp && formErrors.email !== "" && <span className="form-error">{formErrors.email}</span>}
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    onChange={this.handleChange}
                                    type="password"/> 
                                {signUp && formErrors.password !== "" && <span className="form-error">{formErrors.password}</span>}
                            </div>
                            {signUp && ( 
                            <> 
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        onChange={this.handleChange}
                                        value={username}
                                        type="text"/>
                                    {formErrors.username !== "" && <span className="form-error">{formErrors.username}</span>}
                                </div> 
                                <div> 
                                    <label htmlFor="profileImg">Profile Image Url</label>
                                    <input
                                    className="form-control"
                                    id="profileImg"
                                    name="profileImageUrl"
                                    onChange={this.handleChange}
                                    value={profileImageUrl}
                                    type="text"/> 
                                </div> 
                            </>
                            )}
                            <button className="btn btn-primary btn-block btn-lg" type="submit">
                                {buttonText}
                            </button>
                            {!signUp && (
                                <Link to="/forgotPassword" id="forgot-password-link">
                                    Forgot Password
                                </Link>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}