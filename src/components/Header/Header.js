import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, userContext } from '../../App';
import logo from '../../Images/default-monochrome.svg';
import avater from '../../Images/avater.png';

const Header = ({ toggle, isVisible, handleSearch }) => {
    const [loggedInUser] = useContext(userContext);
    const [search, setSearch] = useState('');

    // Navbar
    return (
        <nav className="flex justify-between items-center h-16 bg-white-500 text-black relative shadow-md font-mono" role="navigation">
            <Link to="/">
                <img className="w-36 ml-6" src={logo} alt="" />
            </Link>

            {/* conditionally shows search bar */}
            {
                isVisible &&
                <div className='flex w-1/3 justify-center'>
                    <input type="text" onChange={(e) => setSearch(e.target.value)} className="border-2 border-black border-opacity-25 w-full rounded-md p-1" placeholder="Search" />
                    <button onClick={() => handleSearch(search)} className='border-2 border-black border-opacity-25 rounded-md p-1 bg-gray-200'>Search</button>
                </div>
            }

            <div className="flex pr-8">
                <div className="pr-8 md:block hidden text-xl">
                    <Link to="/home" className="p-4 hover:bg-gray-300">Blogs</Link>
                    {loggedInUser.email ?
                        <Link to="/dashboard" className="p-4 hover:bg-gray-300">Dashboard</Link>
                        :
                        <Link to="/login" className="p-4 hover:bg-gray-300">Login</Link>
                    }
                </div>

                {
                    loggedInUser.email &&
                    <Link to="/profile"><img className=" ml-2 w-8 h-8 rounded-full" src={`${API_URL.IMAGE}${loggedInUser?.photo}`} alt="" /></Link>
                }
            </div>

            <div className="px-3 cursor-pointer md:hidden" onClick={toggle}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </div>
        </nav>
    );
};

export default Header;