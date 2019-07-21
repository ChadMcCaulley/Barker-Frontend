import React from "react";
import {Link} from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.png";

const UserAside = ({profileImageUrl, username, email, messages, followers, currentUser}) => {
    const numMessages = messages.filter(m => m.user._id === currentUser).length;
    return (
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
                    <div> Comments: {numMessages} </div>
                    <div> Followers: {followers.length} </div> 
                </div>
            </div>
        </div>    
    </form>
)}

export default UserAside;