import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../App';

const Dropdown = ({ isOpen, toggle }) => {
    const[loggedInUser] = useContext(userContext);
    
    // Dropdown for Mobile view
    return (
        <div className={isOpen ? 'grid grid-rows-2 bg-white-500 px-1' : 'hidden'} onClick={toggle}>
            <Link to="/home" className="p-4">Blogs</Link>
            {loggedInUser.email ?
                <Link to="/dashboard" className="p-4">Dashboard</Link>
                :
                <Link to="/login" className="p-4">Login</Link>
            }
        </div>
    );
};

export default Dropdown;