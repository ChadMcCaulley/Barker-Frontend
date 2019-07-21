import React, {Component} from "react";
import {connect} from "react-redux";
import MessageList from "../containers/MessageList";

class AccountPage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {messages, pageOwner, history, currentUser} = this.props;
        return(
            <div>
                <div className="grid-container">
                    <div className="item1">Item 1</div>
                    <div className="item2">Item 2</div>
                    <div className="item3">Item 3</div>
                    <div className="item4">Item 4</div>
                    <div className="item5">Item 5</div>
                    <MessageList 
                        currentUser={currentUser}
                        messages={messages}
                        pageOwner={pageOwner}
                        history={history}
                    />                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        pageOwner: state.pageOwner
    } 
}
   
export default connect(mapStateToProps)(AccountPage);
