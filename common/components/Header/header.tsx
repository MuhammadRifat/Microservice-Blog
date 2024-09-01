'use client';

import React, { useContext, useState } from 'react';
// import logo from '../../Images/default-monochrome.svg';
import Link from 'next/link';

// const Header = ({ toggle, isVisible, handleSearch }) => {
const Header = () => {
    // const [loggedInUser] = useContext(userContext);
    const [search, setSearch] = useState('');

    // Navbar
    return (
        <nav>
            <div className="flex justify-between items-center py-8 relative shadow-md" role="navigation">
                <Link href="/">
                    {/* <img className="w-36 ml-6" src={logo} alt="" /> */}
                    <img className="w-36 ml-6" src={''} alt="Logo" />
                </Link>

                {/* conditionally shows search bar */}
                {
                    // isVisible &&
                    <div className='flex w-1/3 justify-center'>
                        <input type="text" onChange={(e) => setSearch(e.target.value)} className="border-2 border-black border-opacity-25 w-full rounded-md p-1" placeholder="Search" />
                        <button className='border-2 border-black border-opacity-25 rounded-md p-1 bg-gray-200'>Search</button>
                        {/* <button onClick={() => handleSearch(search)} className='border-2 border-black border-opacity-25 rounded-md p-1 bg-gray-200'>Search</button> */}
                    </div>
                }

                <div className="flex pr-8">
                    <div className="pr-8 md:block hidden text-xl">
                        <Link href="/" className="p-4 hover:bg-gray-300 text-black">Blogs</Link>
                        {/* {loggedInUser.email ? */}
                        {/* <Link to="/dashboard" className="p-4 hover:bg-gray-300">Dashboard</Link>
                        : */}
                        <Link href="/login" className="p-4 hover:bg-gray-300">Login</Link>
                        {/* } */}
                    </div>

                    {
                        // loggedInUser.email &&
                        // <Link href="/profile"><img className=" ml-2 w-8 h-8 rounded-full" src={`${API_URL.IMAGE}${loggedInUser?.photo}`} alt="" /></Link>
                        <Link href="/profile"><img className=" ml-2 w-8 h-8 rounded-full" src={``} alt="" /></Link>
                    }
                </div>

                {/* <div className="px-3 cursor-pointer md:hidden" onClick={toggle}> */}
                <div className="px-3 cursor-pointer md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
            </div>
        </nav>
    );
};

export default Header;