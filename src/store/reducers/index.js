import {combineReducers} from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages";
import pageOwner from "./pageOwner";

const rootReducer = combineReducers({
    currentUser,
    errors,
    messages,
    pageOwner
});

export default rootReducer;
