import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import Blog from './Blog/Blog';
import Loader from '../Loader/Loader';
import { userContext } from '../../App';
import Header from '../Header/Header';
import Dropdown from '../Header/Dropdown/Dropdown';

const Dashboard = () => {
    const [loggedInUser] = useContext(userContext);
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    // Load all blogs from database
    useEffect(() => {
        setIsLoading(true);

        fetch('https://enigmatic-coast-10449.herokuapp.com/blogs')
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
                setIsLoading(false);
            })
    }, [])

    // Redirect to the new post page
    const handleNewPostBtn = () => {
        history.push("/new-post");
    }

    // handle blog searching
    const handleSearch = (e) => {
        fetch('https://enigmatic-coast-10449.herokuapp.com/blogSearch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ search: e.target.value })
        })
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
            })
    }

    // For deleting blog by id
    const handleDeleteBtn = (id) => {
        setIsLoading(true);

        fetch('https://enigmatic-coast-10449.herokuapp.com/deleteBlog', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    const newData = blogs.filter(blog => blog._id !== id);
                    setBlogs(newData);
                    setIsLoading(false);
                }
            })
    }

    // Fix navbar
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            {
                loggedInUser.isAdmin ?
                    <>
                        <Header toggle={toggle} isVisible={true} handleSearch={handleSearch}></Header>
                        <Dropdown isOpen={isOpen} toggle={toggle}></Dropdown>
                        <div className="md:flex">
                            <div className="md:w-1/5 border-2 pl-4 py-4">
                                <button onClick={handleNewPostBtn} className="border-2 rounded-lg p-2 px-4 shadow-md hover:shadow-xl font-bold text-green-700 text-lg"><FontAwesomeIcon icon={faPlus} /> New Post</button>
                            </div>
                            
                            <div className=" border-2 md:w-4/5 lg:grid lg:grid-cols-2 lg:px-12 sm:px-2">
                                {
                                    isLoading && <Loader />
                                }
                                {
                                    !isLoading && !blogs.length && <h3 className="text-red-500 text-center mt-3">No Blogs Found.</h3>
                                }
                                {
                                    blogs.map(blog => <Blog blog={blog} handleDeleteBtn={handleDeleteBtn} isAdmin={true} key={blog._id}></Blog>)
                                }
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <Header toggle={toggle} isVisible={false} handleSearch={handleSearch}></Header>
                        <Dropdown isOpen={isOpen} toggle={toggle}></Dropdown>
                        <h1 className="font-bold text-3xl text-center mt-5">
                            Welcome <span className="text-green-700">{loggedInUser.name}.</span>
                            <br />
                            We have stored your data in our database.
                        </h1>
                    </>
            }
        </>
    );
};

export default Dashboard;