import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { API_URL, userContext } from '../../../App';
import Header from '../../Header/Header';
import Dropdown from '../../Header/Dropdown/Dropdown';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    // Load all blogs from database
    useEffect(() => {
        setIsLoading(true);

        fetch(`${API_URL.USER}/auth/user`, {

            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${loggedInUser.token}` },
        })
            .then(res => res.json())
            .then(data => {
                setUser(data.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [])

    // For deleting blog by id
    const handleUpdate = () => {
        setIsLoading(true);

        fetch(`${API_URL.USER}/auth/user/update`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${loggedInUser.token}` },
            body: JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    history.push('/dashboard');
                    setIsLoading(false);
                }
            }).catch(err => {
                console.log(err.message);
            })
    }

    // Fix navbar
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <Header toggle={toggle} isVisible={false}></Header>
            <Dropdown isOpen={isOpen} toggle={toggle}></Dropdown>
            <div className="lg:flex justify-center p-2 ">
                <div className='lg:w-2/3 border-2 rounded-md p-4'>
                    <div>
                        <label for='firstName'>First Name: </label>
                        <input id='firstName' onChange={(e) => setUser({ ...user, firstName: e.target.value })} value={user.firstName} className='mx-2 border-2 p-2 rounded-md w-1/2' placeholder='First name' />

                    </div>
                    <div className='my-3'>

                        <label for='lastName'>Last Name: </label>
                        <input id='lastName' onChange={(e) => setUser({ ...user, lastName: e.target.value })} value={user.lastName} className='mx-2 border-2 p-2 rounded-md w-1/2' placeholder='Last name' />
                    </div>

                    <div className='my-3'>

                        <label for='email'>Email: </label>
                        <input id='email' onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} type='email' className='mx-2 border-2 p-2 rounded-md w-1/2' placeholder='Email' />
                    </div>

                    <div className='py-2'>
                        <button onClick={handleUpdate} className='text-white rounded-md px-4 py-2 bg-green-600'>Update</button>
                    </div>
                </div>
            </div>

            <div className='text-center mt-24'>
                <button onClick={() => { localStorage.removeItem('user'); setLoggedInUser({}) }} className='text-white rounded-md px-4 py-2 bg-red-600'><FontAwesomeIcon icon={faSignOutAlt} /> Logout</button>
            </div>
        </>
    );
};

export default Profile;