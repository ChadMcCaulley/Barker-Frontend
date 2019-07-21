import {SET_CURRENT_USER} from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false,     // true when logged in 
    user: {}                    // user info as an object (when logged in)
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !!Object.keys(action.user).length,     // if length is zero (not logged in), set false, else set true
                                                                        // equivalent statement Boolean(Object.keys(action.user).length)
                user: action.user
            };
        default:
            return state;
    }
}