import React, {Component} from "react";
import MessageList from "../containers/MessageList";
import {connect} from "react-redux";
import {fetchMessages} from "../store/actions/messages";
import UserAside from "../components/UserAside";
import Loading from "../components/Loading";

class MessageTimeLine extends Component{
    constructor(props){
        super(props);
        this.state = {
            renderPage: false,
            showError: false
        }
    }
    componentWillMount(){
        this.props.fetchMessages()     // load all messages before component mounts
            .then(() => this.setState({renderPage: true, showError: false}))
            .catch(() => {
                this.setState({renderPage: false, showError: true});
            });
    }
    render(){
        const {profileImageUrl, username, email, messages, followers, pageOwner, history, currentUser} = this.props;
        return(
            <div>
                {this.state.renderPage && !this.state.showError && (
                    <div className="row">
                        <UserAside 
                            currentUser={currentUser}
                            pageOwner={pageOwner}
                            profileImageUrl={profileImageUrl}
                            username={username}
                            email={email}
                            messages={messages}
                            followers={followers}
                        />
                        <MessageList 
                            currentUser={currentUser}
                            messages={messages}
                            pageOwner={pageOwner}
                            history={history}
                        />
                    </div>
                )}
                {this.state.showError && !this.state.renderPage && (
                    <div>
                        Could not load page    
                    </div>
                )}
                {!this.state.showError && !this.state.renderPage && (
                    <Loading/>
                )}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return{
        messages: state.messages,
        currentUser: state.currentUser.user.id
    };
}

export default connect(mapStateToProps, {fetchMessages})(MessageTimeLine);