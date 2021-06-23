import React from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({isOpen, toggle, setIsVisible}) => {
    return (
        <div className={isOpen ? 'grid grid-rows-2 bg-white-500 px-1' : 'hidden'} onClick={toggle}>
        <Link to="/home" onClick={() => setIsVisible(true)} className="p-4">Blogs</Link>
        <Link to="/admin" onClick={() => setIsVisible(false)} className="p-4">Admin</Link>
        </div>
    );
};

export default Dropdown;