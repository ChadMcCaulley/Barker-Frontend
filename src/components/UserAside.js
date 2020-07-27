import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getPageOwner} from "../store/actions/user";
import DefaultProfileImg from "../images/default-profile-image.png";

class UserAside extends Component {
    getPageOwner = event => {
        event.preventDefault();
        this.props.getPageOwner(this.props.currentUser)
            .then(() => {
                this.props.history.push(`/users/${this.props.currentUser}/userpage`);
            })
            .catch(err => {
                return;
            });
    }
    render() {
        const {
            profileImageUrl,
            username,
            email,
            messages,
            followers,
            currentUser
        } = this.props;
        const numMessages = messages
            .filter(m => m.user._id === currentUser)
            .length;
        return (
            <form className="col-sm-3" id="userAside-form">
                <div className="panel-body userAside">
                    <img
                        src={profileImageUrl || DefaultProfileImg}
                        alt={username}
                        width="200"
                        height="200"
                        className="img-thumbnail"/>
                    <div>
                        <Link to="#" onClick={this.getPageOwner} className="panel-body-link">
                            {username}
                        </Link>
                        <Link to="#" onClick={this.getPageOwner} className="panel-body-link">
                            {email}
                        </Link>
                        <div className="followers-comments">
                            <div>
                                Comments: {numMessages}
                            </div>
                            <div>
                                Followers: {followers.length}
                            </div>
                        </div>
                    </div>
                </div>
                <Link to="/users/:id/userpage/edit" className="panel-body-link">
                    Edit Profile
                </Link>
            </form>
        )
    }
}
function mapStateToProps(state){
    return{} 
}

export default connect(mapStateToProps, {getPageOwner})(UserAside);