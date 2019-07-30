import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchMessages, removeMessage} from "../store/actions/messages";
import MessageItem from "../containers/MessageItem";

class MessageListPageOwner extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderPage: false,
            showError: false
        }
    }
    componentDidMount(){
        this.props.fetchMessages()     // load all messages before component mounts
            .then(() => this.setState({renderPage: true, showError: false}))
            .catch(() => {
                this.setState({renderPage: false, showError: true});
            });
    }
    render(){
        const {messages, removeMessage, currentUser, pageOwner, history} = this.props;
        let messageList = messages.map(m => {
            if(m.user._id === pageOwner.user._id){
                return(
                    <MessageItem 
                        pageOwner={pageOwner}
                        key={m._id} 
                        date={m.createAt} 
                        text={m.text} 
                        username={m.user.username} 
                        profileImageUrl={m.user.profileImageUrl} 
                        removeMessage={removeMessage.bind(this, m.user._id, m._id)}
                        isCorrectUser={currentUser === m.user._id}
                        messageUser={m.user}
                        history={history}
                        replies={m.replies}
                    />
                )
            }
        });
        return(
            <div className="row col-sm">
                <div className="offset-1 col-sm-10">
                    <ul className="list-group" id="messages">
                        {messageList}
                    </ul>
                </div>
            </div>
        );
   } 
}

function mapStateToProps(state) {
    return{
        messages: state.messages,
        currentUser: state.currentUser.user.id
    };
}

export default connect(mapStateToProps, {fetchMessages, removeMessage})(MessageListPageOwner);