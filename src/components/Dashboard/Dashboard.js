import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import Blog from './Blog/Blog';
import Loader from '../Loader/Loader';
import { userContext } from '../../App';

const Dashboard = () => {
    const [loggedInUser] = useContext(userContext);
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setIsLoading(true);

        fetch('http://localhost:5000/blogs')
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
                setIsLoading(false);
            })
    }, [])

    const handleNewPostBtn = () => {
        history.push("/new-post");
    }

    const handleDeleteBtn = (id) => {
        setIsLoading(true);

        fetch('http://localhost:5000/deleteBlog', {
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

    console.log(loggedInUser);
    return (
        <>
            {
                loggedInUser.isAdmin ?
                    <div className="md:flex">
                        <div className="md:w-1/5 border-2 pl-4 py-4">
                            <button onClick={handleNewPostBtn} className="border-2 rounded-lg p-2 px-4 shadow-md font-bold text-green-700 text-lg"><FontAwesomeIcon icon={faPlus} /> New Post</button>
                        </div>
                        <div className="border-2 md:w-4/5 lg:px-12 sm:px-2">
                            {
                                isLoading && <Loader />
                            }
                            {
                                blogs.map(blog => <Blog blog={blog} handleDeleteBtn={handleDeleteBtn} key={blog._id}></Blog>)
                            }
                        </div>
                    </div>
                    :
                    <div>
                        <h1 className="font-bold text-3xl text-center mt-5">
                            Welcome <span className="text-green-700">{loggedInUser.name}.</span>
                            <br/>
                            We have stored your data in our database.
                        </h1>
                    </div>
            }
        </>
    );
};

export default Dashboard;