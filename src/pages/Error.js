import React from 'react';
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <>
            <h1> Page Does Not Exist </h1>
            <Link to="/"> Return Home </Link>
        </>
    )
}

export default Error;
