import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../App';

const Dropdown = ({ isOpen, toggle, setIsVisible }) => {
    const[loggedInUser] = useContext(userContext);
    return (
        <div className={isOpen ? 'grid grid-rows-2 bg-white-500 px-1' : 'hidden'} onClick={toggle}>
            <Link to="/home" onClick={() => setIsVisible(true)} className="p-4">Blogs</Link>
            {loggedInUser.email ?
                <Link to="/dashboard" onClick={() => setIsVisible(false)} className="p-4">Dashboard</Link>
                :
                <Link to="/login" onClick={() => setIsVisible(false)} className="p-4">Login</Link>
            }
        </div>
    );
};

export default Dropdown;