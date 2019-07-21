import React from 'react';
import {Provider} from "react-redux";
import {configureStore} from "./store";
import {BrowserRouter as Router} from "react-router-dom";
import Main from "./containers/Main";
import {setAuthorizationToken, setCurrentUser, setPageOwner} from './store/actions/auth';
import jwtDecode from "jwt-decode";

const store = configureStore();

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken); // if server fails, repopulate the token
    // Prevent anyone from changing the jwtToken
    console.log(localStorage);
    try {
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
        if (localStorage.pageOwner !== null) 
            store.dispatch(setPageOwner(JSON.parse(localStorage.pageOwner)));
        }
    catch (e) {
        store.dispatch(setCurrentUser({})); // Force logout possible neerdowells
    }
}

const App = () => (
    <Provider store={store}>
        <Router>
            <Main/>
        </Router>
    </Provider>
)

export default App;
