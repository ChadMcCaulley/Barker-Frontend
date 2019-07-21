import React, {Component} from "react";

export default class ResetPassword extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form >
                            <h2> Forgot Password </h2>
                            <input 
                                className="form-control" 
                                id="email" 
                                name="email" 
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