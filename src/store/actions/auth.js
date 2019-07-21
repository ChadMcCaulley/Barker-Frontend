import {apiCall, setTokenHeader} from "../../services/api";
import {SET_CURRENT_USER, SET_PAGEOWNER} from "../actionTypes";
import {addError, removeError} from "./errors";

export function setCurrentUser(user){
    return{
        type: SET_CURRENT_USER,
        user
    };
}

export function setPageOwner(user){
    return{
        type: SET_PAGEOWNER,
        user
    };
}

export function setAuthorizationToken(token){
    setTokenHeader(token);
}

export function logout(){
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function authUser(type, userData){
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall("post", `/api/auth/${type}`, userData)
                .then(({token, ...user}) => {
                    localStorage.setItem("jwtToken", token);
                    localStorage.setItem("pageOwner", null);
                    setAuthorizationToken(token);
                    dispatch(setPageOwner(user));   //set the initial page owner
                    dispatch(setCurrentUser(user)); //creates a user in our store
                    dispatch(removeError());
                    resolve();
                })
                .catch(err => {
                    dispatch(addError(err.message));
                    reject();
                });
        });
    };
}
export function forgotPassword(state){
    return apiCall("post", "/api/auth/forgotPassword", state)
        .then(res => {
        })
        .catch(err => {
        })
}