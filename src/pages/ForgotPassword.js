import React, {Component} from "react";

export default class ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: ""
        };
    }
    handleChange = e => {
        this.setState({
            email: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.onAuth(this.state);
    }
    render(){
        const {email, errorMessage, successful} = this.state;
        const {history, removeError} = this.props;
        history.listen(() => {
            removeError();  
        });
        return(
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2> Forgot Password </h2>
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            {successful  && <div className="alert alert-succes">{errorMessage}</div>}
                            <input 
                                className="form-control" 
                                id="email" 
                                name="email" 
                                onChange={this.handleChange} 
                                value={email} 
                                type="text"
                            />
                            <button className="btn btn-primary btn-block btn-lg" type="submit"> Reset Password </button>
                        </form>
                    </div>
                </div>
            </div>            
        )
    }
}