import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Blog from '../Dashboard/Blog/Blog';
import Dropdown from '../Header/Dropdown/Dropdown';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import { API_URL } from '../../App';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10
    });

    const [resPagination, setResPagination] = useState({});

    // Load all blogs from the database
    useEffect(() => {
        setIsLoading(true);

        fetch(`${API_URL.BLOG}/blog?page=${pagination.page}&limit=${pagination.limit}`)
            .then(res => res.json())
            .then(data => {
                setResPagination(data?.page);
                setBlogs(data?.data || []);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, [pagination])

    const history = useHistory();

    // Redirect to blog details page after clicking any blog
    const handleBlog = (id) => {
        history.push(`/blog/${id}`);
    }

    // handle search bar
    const handleSearch = (search) => {

        if (!isLoading && search) {
            setBlogs([]);
            setIsLoading(true);
            const api = search ? `${API_URL.BLOG}/blog/search?q=${search}` : `${API_URL.BLOG}/blog`;
            fetch(api, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(data => {
                    setIsLoading(false);
                    setBlogs(data?.data);

                })
                .catch((error) => {

                    setIsLoading(false);
                    console.log(error.message);
                })
        }
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
                <div className="flex justify-center">
                    {
                        isLoading && <Loader />
                    }
                    {
                        !isLoading && !blogs.length && <h3 className="text-red-500 text-center mt-3">No Blogs Found.</h3>
                    }
                    <div className="lg:grid lg:grid-cols-3 lg:px-12 sm:px-2">
                        {
                            blogs.map(blog => <Blog blog={blog} handleBlog={handleBlog} isAdmin={false} key={blog._id}></Blog>)
                        }
                    </div>
                </div>
            </div>

            <div className='text-right p-8'>
                <span>Total: <b>{resPagination.totalIndex || 0}</b></span>
                <span className='mx-2'>Current Page: <b>{resPagination.currentPage || 0}</b></span>
                <input className='border-2 mx-2 w-16' defaultValue={pagination.limit} onBlur={(e) => setPagination({ ...pagination, limit: (e.target.value > 1 && e.target.value <=100) ? Number(e.target.value) : 10 })} />

                <button className='border-0 mx-2' onClick={() => setPagination({ ...pagination, page: pagination.page > 1 ? pagination.page - 1 : 1 })}>Prev</button>
                <button className='border-0 mx-2' onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}>Next</button>
            </div>
        </>
    );
};

export default Home;