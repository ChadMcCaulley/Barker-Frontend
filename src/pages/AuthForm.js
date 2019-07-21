import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class AuthForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            username: "",
            profileImageUrl: "",
            password: "",
            showPasswordCriteria: false,
            goodLen: false,
            goodChars: false,
            goodNums: false
        };
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handlePassword = e => {
        e.preventDefault();
        this.setState({
            showPasswordCriteria: !this.state.showPasswordCriteria
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        const authType = this.props.signUp ? "signup" : "signin";
        this.props.onAuth(authType, this.state)
            .then(() => {
                this.props.history.push("/");   // render the homepage
            })
            .catch(() => {
                return;
            })
    };
    render() {
        const{email, username, profileImageUrl, showPasswordCriteria} = this.state;
        const{goodLen, goodChars, goodNums} = this.state;
        const {heading, buttonText, signUp, errors, history, removeError} = this.props;
        history.listen(() => {
            removeError();  
        });
        return(
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-8">
                        <form onSubmit={this.handleSubmit}>
                            <h2> {heading} </h2>
                            {errors.message && <div className="alert alert-danger">{errors.message}</div>}
                            <label htmlFor="email">Email</label>
                            <input 
                                className="form-control" 
                                id="email" 
                                name="email" 
                                onChange={this.handleChange} 
                                value={email} 
                                type="text"
                            />
                            <label htmlFor="password">Password</label>
                            <input 
                                className="form-control"
                                id="password" 
                                name="password" 
                                onClick={this.handlePassword}
                                onChange={this.handleChange} 
                                type="password"
                            />
                            {showPasswordCriteria && signUp &&  (
                                <div id="password-criteria-list">
                                    <form>
                                        <ul>
                                            <li className={goodLen ? "password-good" : "password-bad"}>
                                                Password must be at least 8 characters long
                                            </li>
                                            <li className={goodChars ? "password-good" : "password-bad"}>
                                                Password must contain both upper and lower case letters
                                            </li>
                                            <li className={goodNums ? "password-good" : "password-bad"}>
                                                Password must contain at least one number
                                            </li>
                                        </ul>
                                    </form>       
                                </div>
                                                               
                            )}
                            {signUp && (
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input 
                                        className="form-control" 
                                        id="username" 
                                        name="username" 
                                        onChange={this.handleChange} 
                                        value={username} 
                                        type="text"
                                    />   
                                    <label htmlFor="profileImg">Profile Image Url</label>
                                    <input 
                                        className="form-control" 
                                        id="profileImg" 
                                        name="profileImageUrl" 
                                        onChange={this.handleChange} 
                                        value={profileImageUrl} 
                                        type="text"
                                    />   
                                </div>
                            )}
                            <button className="btn btn-primary btn-block btn-lg" type="submit"> {buttonText} </button>
                            {!signUp && (
                                <Link to="/forgotPassword" id="forgot-password-link"> Forgot Password </Link>    
                            )}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}