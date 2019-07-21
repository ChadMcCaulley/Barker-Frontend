import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {SET_PAGEOWNER} from "../actionTypes";

export const setPageOwner = user => ({
    type: SET_PAGEOWNER,
    user
});

export const getPageOwner = (messageUser) => {
    return dispatch => {
      return new Promise((resolve, reject) => {
        return apiCall("GET", `/api/users/${messageUser._id}`)
          .then(res => {
            dispatch(setPageOwner(res));
            localStorage.setItem("pageOwner", JSON.stringify(res));
            resolve();
          })
          .catch(err => {
            dispatch(addError(err.message));
            reject();
          });
      })
  };
}

export const addFollower = (messageUser, newFollower) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/users/${messageUser._id}/addFollower/${newFollower}`)
        .then(res => {
          resolve();
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject();
        });
    })
  };
}