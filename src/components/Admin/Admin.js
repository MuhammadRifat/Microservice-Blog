import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

const Admin = () => {
    const history = useHistory();

    const handleNewPostBtn = () => {
        history.push("/new-post");
    }
    return (
        <div className="md:flex">
            <div className="md:w-1/5 border-2 pl-4 py-4">
                <button onClick={handleNewPostBtn} className="border-2 rounded-lg p-2 px-4 shadow-md font-bold text-green-700 text-lg"><FontAwesomeIcon icon={faPlus} /> New Post</button>
            </div>
            <div className="flex justify-center border-2 md:w-4/5">
                <h2>Post Details</h2>
            </div>
        </div>
    );
};

export default Admin;