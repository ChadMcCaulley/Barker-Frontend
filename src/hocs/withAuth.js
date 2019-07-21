// Handles validation to ensure user is logged in
import React, {Component} from "react";
import {connect} from "react-redux";

export default function withAuth(ComponentToBeRendered){
    class Authenticate extends Component{
        componentWillMount(){
            if(!this.props.isAuthenticated){    //if user is not authenticated go to signin page
                this.props.history.push("/signin");
            }
        }
        componentWillUpdate(nextProps){                 //if the component changes, check again
            if(nextProps.isAuthenticated === false){    //if user is not authenticated go to signin page
                this.props.history.push("/signin");
            }
        }
        render(){
            return <ComponentToBeRendered {...this.props}/>
        }
    }
    function mapStateToProps(state){
        return{
            isAuthenticated: state.currentUser.isAuthenticated
        };
    }
    
    return connect(mapStateToProps)(Authenticate);
}