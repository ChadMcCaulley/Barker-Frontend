import React, {Component} from "react";
import {connect} from "react-redux";
import Moment from "react-moment"; // for timestamp
import {getPageOwner, addFollower} from "../store/actions/user";
import {updateMessage} from "../store/actions/messages";
import {Link} from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.png";
import ReplyForm from "../containers/ReplyForm";

class MessageItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            showReplies: false,
            editComment: false,
            text: this.props.text,
            prevText: this.props.text
        };
    }
    showReplies = event => {
        event.preventDefault();
        this.setState({showReplies: !this.state.showReplies});
    }
    showMessageEdit = event => {
        event.preventDefault();
        this.setState({editComment: !this.state.editComment, text: this.state.prevText});
    }
    submitMessageChange = event => {
        event.preventDefault();
        this.props.updateMessage(this.props.currentUser, this.props.messageId, this.state.text);
        let updatedText = this.state.text;
        this.setState({editComment: false, prevText: updatedText});
    }
    getPageOwner = event => {
        event.preventDefault();
        this.props.getPageOwner(this.props.messageUser)
            .then(() => {
                this.props.history.push(`/users/${this.props.messageUser._id}/userpage`);
            })
            .catch(err => {
                return;
            });
    }
    addFollower = event => {
        event.preventDefault();
        this.props.addFollower(this.props.messageUser, this.props.currentUser);
    }
    render(){
        const   profileImageUrl = this.props.profileImageUrl,
                username        = this.props.username,
                messageRepliedTo = this.props.messageId,
                date            = this.props.date,
                isCorrectUser   = this.props.isCorrectUser,
                currentUser     = this.props.currentUser,
                history         = this.props.history,
                replyIds        = this.props.replies,
                removeMessage   = this.props.removeMessage;
        let idsToReplies = [];
        for(let i = 0; i < replyIds.length; i++){
            let nextReply = this.props.messages.find(m => m._id === replyIds[i]);
            idsToReplies.push(nextReply);
        }
        let replies = idsToReplies.map(m => (
            <MessageItem 
                replies={m.replies}
                currentUser={currentUser}
                pageOwner={this.props.pageOwner}
                key={m.id} 
                date={m.createAt} 
                text={m.text} 
                username={m.user.username} 
                profileImageUrl={m.user.profileImageUrl} 
                removeMessage={removeMessage.bind(this, m.user._id, m._id)}
                isCorrectUser={currentUser === m.user._id}
                messageId={m._id}
                history={history}
            />
        ));
        return(
            <div>
                <li className="list-group-item">
                    <img 
                        src={profileImageUrl || DefaultProfileImg} 
                        alt={username}
                        width="30%"
                        height="30%"
                        className="timeline-image"
                    />
                    <div className="message-area">
                        <Link onClick={this.getPageOwner} id="message-username">@{username} &nbsp;</Link>
                        <span className="text-muted">
                            <Moment className="text-muted" format="Do MMM YYYY">
                                {date}
                            </Moment>
                        </span>
                        <a className="btn btn-primary btn-xs" id="follow-button" onClick={this.addFollower}> 
                            FOLLOW
                        </a>
                        {this.state.editComment  && isCorrectUser ? (
                            <form onSubmit={this.submitMessageChange}>
                                <textarea 
                                    rows="4"
                                    cols="10" 
                                    type="text"
                                    className="form-control"
                                    value={this.state.text}
                                    onChange={e => this.setState({text: e.target.value})}
                                /> 
                                <button type="submit" className="btn btn-success btn-sm"> UPDATE </button>
                            </form>
                        ) : (
                            <p> {this.state.prevText} </p>
                        )}
                        
                        <a className="btn btn-info btn-xs" id="reply-button" onClick={this.showReplies}> 
                            REPLIES: {replyIds.length}
                        </a>
                        {isCorrectUser && (
                            <div id="correct-user-message-buttons">
                                <a className="btn btn-success btn-xs" onClick={this.showMessageEdit}> 
                                    EDIT
                                </a>
                                <a className="btn btn-danger btn-xs" onClick={removeMessage}> 
                                    DELETE
                                </a>
                            </div>
                        )}
                    </div> 
                </li>
                {this.state.showReplies && (
                    <div>
                        <ReplyForm messageRepliedTo={messageRepliedTo}/>
                        <div className="replies-style">
                            {replies}
                        </div>
                    </div>
                )}
            </div> 
        )
    }
}

function mapStateToProps(state){
    return{
        messages: state.messages,
        pageOwner: state.pageOwner
    } 
}
   
export default connect(mapStateToProps, {getPageOwner, addFollower, updateMessage})(MessageItem);