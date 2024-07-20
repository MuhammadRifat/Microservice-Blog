import React from 'react';
import avater from '../../../Images/avater.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEye, faTrashAlt, faComment } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../../App';

const Blog = ({ blog, handleDeleteBtn, isAdmin, handleBlog }) => {
    const { name, photo, title, image, likes, views, createdAt, _id, author, comments } = blog;

    // conditionally shows all blogs for admin and all users
    return (
        <div className="lg:w-full">
            <div onClick={!isAdmin ? () => handleBlog(_id) : undefined} className="mx-3 mt-5 shadow-md rounded-md hover:shadow-xl" style={!isAdmin ? { cursor: 'pointer' } : {}}>
                <div>
                    <img className="w-96 h-48 rounded-t-md" src={`${API_URL.IMAGE}${image}`} alt="" />
                </div>
                <div className="p-2">
                    <h2 className="text-xl font-bold text-gray-500">{title}</h2>
                    <div className="flex justify-between text-gray-500">
                        <div className='text-sm'>
                            <span>Published: {new Date(createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <br />
                            {
                                isAdmin &&
                                <button onClick={() => handleDeleteBtn(_id)} className="text-xl text-red-500 mt-1 focus:outline-none"><FontAwesomeIcon icon={faTrashAlt} /></button>
                            }
                        </div>
                    </div>

                    {/* {
                        !isAdmin &&
                        <div className="text-gray-400 text-sm mt-2">
                            {content.slice(0, 130)}...
                        </div>
                    } */}

                    <div className="flex justify-between">

                        <h3 className='text-sm text-gray-500'>{author.name}</h3>
                        <span className="mx-2"><FontAwesomeIcon icon={faThumbsUp} /> <span>{likes || 0}</span></span>
                        <span className="mx-2"><FontAwesomeIcon icon={faComment} /> <span>{comments || 0}</span></span>
                        <span className="mx-2"><FontAwesomeIcon icon={faEye} /> <span>{views || 0}</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;