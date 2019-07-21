import {LOAD_MESSAGES, REMOVE_MESSAGE, ADD_REPLY} from "../actionTypes";

const message = (state = [], action) => {
    switch(action.type) {
        case LOAD_MESSAGES:
            return [...action.messages];
        case REMOVE_MESSAGE:
            return state.filter(message => message._id !== action.id);  //return all messages that are not the given message (filter is pure)
        case ADD_REPLY:
            return [...state, action.reply]
        default:
            return state;
    }
};

export default message;