import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_MESSAGES, REMOVE_MESSAGE, ADD_REPLY} from "../actionTypes";

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});

export const addReply = reply => ({
  type: ADD_REPLY,
  reply
})

export const removeMessage = (user_id, message_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/messages/${message_id}`)
      .then(() => {
        dispatch(remove(message_id)); // remove message from messages, parentMessage and currentUser messages
      })
      .catch(err => dispatch(addError(err.message)));
  }
}

export const updateMessage = (user_id, message_id, text) => {
  return dispatch => {
    return apiCall("put", `/api/users/${user_id}/messages/${message_id}`, {text})
      .then(() => {
      })
      .catch(err => dispatch(addError(err.message)));
  }
}

export const fetchMessages = () => {
  return dispatch => {
    return apiCall("GET", "/api/messages")
      .then(res => {
        dispatch(loadMessages(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const postNewMessage = (text, isReply, messageRepliedTo) => (dispatch, getState) => {
  let {currentUser} = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/messages`, {text, isReply, messageRepliedTo})
    .then(res => {
      if(isReply){
        dispatch(addReply(res))
      }
    })
    .catch(err => dispatch(addError(err.message)))
}