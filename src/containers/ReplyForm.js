import React, {Component} from "react";
import {connect} from "react-redux";
import {postNewMessage} from "../store/actions/messages";

class ReplyForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: "",
            showError: false
        };
    }
    handleNewReply = event => {
        event.preventDefault();
        if(this.state.message !== ""){
            this.props.postNewMessage(this.state.message, true, this.props.messageRepliedTo);  //post new message to database
            this.setState({message: "", showError: false}); // reset message and remove replyForm
        } else {
            this.setState({showError: true});
        }
    }
    render(){
        return(
            <form onSubmit={this.handleNewReply} id="reply-form">
                {this.state.showError && (
                    <div id="blank-reply-error">Reply cannot be left blank </div>
                )}
                <textarea 
                    rows="4"
                    cols="10" 
                    type="text"
                    className="form-control"
                    value={this.state.message}
                    onChange={e => this.setState({message: e.target.value})}
                />
                <button type="submit" className="btn btn-success btn-sm pull-right">
                    REPLY
                </button>
            </form>
        )
    }
}
function mapStateToProps(state){
    return{
        errors: state.errors
    };
}

export default connect(mapStateToProps, {postNewMessage})(ReplyForm);