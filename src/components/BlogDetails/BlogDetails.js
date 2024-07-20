import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import avater from '../../Images/avater.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEye } from '@fortawesome/free-solid-svg-icons';
import Loader from '../Loader/Loader';
import Header from '../Header/Header';
import Dropdown from '../Header/Dropdown/Dropdown';
import { API_URL, userContext } from '../../App';

const BlogDetails = () => {
    const [loggedInUser] = useContext(userContext);
    const [blog, setBlog] = useState({});
    const [isLike, setIsLike] = useState(false);
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    // Load blog by id
    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL.BLOG}/blog/${id}`)
            .then(res => res.json())
            .then(data => {
                setBlog(data?.data);
                setLikes(data?.data?.likes);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, [id])

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL.COMMENT}/comment?blogId=${id}`)
            // fetch(`${API_URL.COMMENT}/comment`)
            .then(res => res.json())
            .then(data => {
                setComments(data?.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, [])

    // Fix like button
    const handleLikeBtn = () => {
        // update likes when click like button
        fetch(`${API_URL.LIKE}/like`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${loggedInUser.token}` },
            body: JSON.stringify({ blogId: id })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    // Fix like button
    const handleCommentBtn = () => {
        // update likes when click like button
        fetch(`${API_URL.COMMENT}/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${loggedInUser.token}` },
            body: JSON.stringify({ blogId: id, comment: newComment })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.success) {
                    setNewComment('');
                    setComments([data?.data, ...comments]);
                }
            })
            .catch(error => {
                console.log(error);
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
            <div className="flex justify-center">
                <div className="w-full lg:w-1/2 md:w-4/5 p-2 m-2">
                    {
                        isLoading && <Loader />
                    }
                    <h1 className="text-center text-3xl font-bold text-gray-700">{blog?.title}</h1>

                    <div className="flex justify-between text-gray-600 mt-3">
                        <div className="flex">
                            <img className="mx-2 w-8 h-8 rounded-full" src={API_URL.IMAGE + blog?.author?.image || avater} alt="" />
                            <h3 className="mt-1">{blog?.author?.name}</h3>
                        </div>
                        <h3>Published: {new Date(blog?.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                    </div>

                    <img className="w-full h-80 mt-3" src={`${API_URL.IMAGE}${blog?.image}`} alt="" />

                    <div className="text-gray-700 mt-3 text-lg w-full">
                        <p style={{ whiteSpace: 'pre-line' }}>{blog?.content}</p>
                    </div>

                    <div className="mt-8 text-gray-500 flex justify-between">
                        <div>
                            <button className={isLike ? "focus:outline-none text-green-700" : "focus:outline-none"} onClick={handleLikeBtn}><FontAwesomeIcon icon={faThumbsUp} size="2x" /></button>
                            <span className="ml-3 text-xl">{blog?.likes}</span>
                        </div>
                        <div>
                            <span className="mr-3 text-xl">{blog?.views}</span>
                            <FontAwesomeIcon icon={faEye} size="2x" />
                        </div>
                    </div>
                </div>


            </div>
            {/* comments */}
            <div className="flex justify-center">
                <div className=' w-full lg:w-1/2 md:w-4/5 p-2 m-2'>
                    <h2 className='text-xl font-bold'>Comments</h2>

                    <div className='flex mb-6'>
                        <input className='border-2 rounded-md p-2 w-full' value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder='Enter a comment..' />
                        <button onClick={handleCommentBtn} className='ml-2 px-2 rounded-md bg-green-600 text-white'>Enter</button>
                    </div>
                    {
                        comments?.map(comment => (
                            <div className="border-2 border-gray-100 rounded-md p-2 text-gray-600 mt-2 bg-gray-50">
                                <div className="flex">
                                    <img className="mx-2 w-8 h-8 rounded-full" src={API_URL.IMAGE + comment?.user?.image || avater} alt="" />
                                    <h3 className="mt-1 text-sm">{comment?.user?.name}</h3>
                                </div>
                                <p className='px-2 mt-1'>
                                    {
                                        comment.comment
                                    }
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default BlogDetails;