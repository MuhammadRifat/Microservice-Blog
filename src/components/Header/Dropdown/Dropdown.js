import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../../App';

const Dropdown = ({ isOpen, toggle }) => {
    const[loggedInUser] = useContext(userContext);
    
    // Dropdown for Mobile view
    return (
        <div className={isOpen ? 'grid grid-rows-2 border-2' : 'hidden'} onClick={toggle}>
            <Link to="/home" className="p-4 hover:bg-gray-300">Blogs</Link>
            {loggedInUser.email ?
                <Link to="/dashboard" className="p-4 hover:bg-gray-300">Dashboard</Link>
                :
                <Link to="/login" className="p-4 hover:bg-gray-300">Login</Link>
            }
        </div>
    );
};

export default Dropdown;