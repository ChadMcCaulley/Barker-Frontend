import axios from "axios";  // smaller library then jquery, great for json requests

export function setTokenHeader(token){
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export function apiCall(method, path, data){
    return new Promise((resolve, reject) => {
        axios.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL || ''
        return axios[method.toLowerCase()](path, data)
            .then(res => {
                return resolve(res.data);
            })
            .catch(err => {
                return reject(err.response.data.error);
            });
    });
}