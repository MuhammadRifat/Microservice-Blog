import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../Images/default-monochrome.svg';
import avater from '../../Images/avater.png';

const Header = ({ toggle, isVisible, setIsVisible }) => {
    const [loggedInUser] = useContext(userContext);
    return (
        <nav className="flex justify-between items-center h-16 bg-white-500 text-black relative shadow-md font-mono" role="navigation">
            <Link to="/home" onClick={() => setIsVisible(true)}>
                <img className="w-36 ml-6" src={logo} alt="" />
            </Link>
            {
                isVisible &&
                <input type="text" className="border-2 border-black border-opacity-25 rounded-md w-2/5 p-1" placeholder="Search" />
            }
            <div className="px-4 cursor-pointer md:hidden" onClick={toggle}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </div>
            <div className="pr-8 md:block hidden text-xl">
                <Link to="/home" onClick={() => setIsVisible(true)} className="p-4">Blogs</Link>
                {loggedInUser.email ?
                    <Link to="/dashboard" onClick={() => setIsVisible(false)} className="p-4">Dashboard</Link>
                    :
                    <Link to="/login" onClick={() => setIsVisible(false)} className="p-4">Login</Link>
                }
                {/* {
                    loggedInUser.email &&
                    <Link to="/dashboard"><img className="w-8 h-8 rounded-full" src={avater} alt="" /></Link>
                } */}
            </div>
        </nav>
    );
};

export default Header;