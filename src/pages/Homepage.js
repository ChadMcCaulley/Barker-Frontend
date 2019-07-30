import React from "react";
import {Link} from "react-router-dom";
import MessageTimeline from "./MessageTimeline";

const Homepage = ({currentUser, pageOwner, history, isGuest}) => {
    if(!currentUser.isAuthenticated && !isGuest){
        return(
            <div className="home-hero">
                <h1> New to Barker?</h1>
                <Link to="/signup" className="btn btn-primary" id="signup-button"> Join Now </Link>
            </div>
        );
    } else {
        return (
            <div> 
                <MessageTimeline
                    profileImageUrl={currentUser.user.profileImageUrl}
                    username={currentUser.user.username}
                    email={currentUser.user.email}
                    messages={currentUser.user.messages}
                    followers={currentUser.user.followers}
                    pageOwner={pageOwner}
                    history={history}
                />
            </div>  
        );
    }
}

export default Homepage;