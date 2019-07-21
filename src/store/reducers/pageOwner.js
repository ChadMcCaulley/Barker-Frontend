import {SET_PAGEOWNER} from "../actionTypes";

const DEFAULT_STATE = {
    user: {}                     // user info as an object (when logged in)
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case SET_PAGEOWNER:
            return {
                user: action.user
            };
        default:
            return state;
    }
}