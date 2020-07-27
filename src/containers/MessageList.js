import React, {Component} from "react";
import {connect} from "react-redux";
import {removeMessage} from "../store/actions/messages";
import MessageItem from "../containers/MessageItem";

class MessageList extends Component {
    render(){
        const {messages, removeMessage, currentUser, pageOwner, history} = this.props;
        let messageList = messages.filter(m => m.isReply === false).map(m => (
            <MessageItem 
                key = {m._id}
                replies={m.replies}
                currentUser={currentUser}
                pageOwner={pageOwner}
                date={m.createAt} 
                text={m.text} 
                username={m.user.username} 
                profileImageUrl={m.user.profileImageUrl} 
                removeMessage={removeMessage.bind(this, m.user._id, m._id)}
                isCorrectUser={currentUser === m.user._id}
                messageId={m._id}
                messageUser={m.user}
                history={history}
            />
        ));
        return(
            <div className="row col-sm">
                <div className="offset-1 col-lg">
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

export default connect(mapStateToProps, {removeMessage})(MessageList);