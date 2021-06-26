import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Blog from '../Dashboard/Blog/Blog';
import Dropdown from '../Header/Dropdown/Dropdown';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Load all blogs from the database
    useEffect(() => {
        setIsLoading(true);

        fetch('https://enigmatic-coast-10449.herokuapp.com/blogs')
            .then(res => res.json())
            .then(data => {
                setBlogs(data);
                setIsLoading(false);
            })
    }, [])

    const history = useHistory();

    // Redirect to blog details page after clicking any blog
    const handleBlog = (id) => {
        history.push(`/blog/${id}`);
    }

    // handle search bar
    const handleSearch = (e) => {
        fetch('https://enigmatic-coast-10449.herokuapp.com/blogSearch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({search: e.target.value})
        })
        .then(res => res.json())
        .then(data => {
            setBlogs(data);
        })
    }

    // Fix navbar
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <Header toggle={toggle} isVisible={true} handleSearch={handleSearch}></Header>
            <Dropdown isOpen={isOpen} toggle={toggle}></Dropdown>
            <div className="flex justify-center">
                <div className="md:w-4/5 lg:grid lg:grid-cols-2 lg:px-12 sm:px-2">
                    {
                        isLoading && <Loader />
                    }
                    {
                        !isLoading && !blogs.length && <h3 className="text-red-500 text-center mt-3">No Blogs Found.</h3>
                    }
                    {
                        blogs.map(blog => <Blog blog={blog} handleBlog={handleBlog} isAdmin={false} key={blog._id}></Blog>)
                    }
                </div>
            </div>
        </>
    );
};

export default Home;