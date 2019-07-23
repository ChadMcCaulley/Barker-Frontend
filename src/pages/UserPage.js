import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.png";
import MessageListPageOwner from "../containers/MessageListPageOwner";

class UserPage extends Component{
    constructor(props){
        super(props);
        console.log(props);
    }
    render(){
        const {profileImageUrl, username, email, messages, followers} = this.props.pageOwner.user;
        const isCorrectUser = this.props.pageOwner.user._id === this.props.currentUser.user.id;
        return(
            <div className="row">
                <form className="col-sm-3" id="userAside-form">
                    <div className="panel-body userAside">
                        <img 
                            src={profileImageUrl || DefaultProfileImg}
                            alt={username}
                            width="200"
                            height="200"
                            className="img-thumbnail"
                        />
                        <div>
                            <Link className="panel-body-link"> {username} </Link>
                            <Link className="panel-body-link"> {email} </Link>
                            <div className="followers-comments">
                                <div> Comments {messages.length} </div>
                                <div> Followers {followers.length} </div> 
                            </div>
                        </div>

                    </div>                         
                        {isCorrectUser && (
                            <Link to="/users/:id/userpage/edit" className="panel-body-link"> Edit Profile </Link>
                        )}   
                </form>
                <MessageListPageOwner {...this.props}/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        pageOwner: state.pageOwner
    } 
}
   
export default connect(mapStateToProps)(UserPage);
