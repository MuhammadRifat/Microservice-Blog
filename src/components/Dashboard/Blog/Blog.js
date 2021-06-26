import React from 'react';
import avater from '../../../Images/avater.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Blog = ({ blog, handleDeleteBtn, isAdmin, handleBlog }) => {
    const { name, photo, title, coverImage, likes, views, date, _id, content } = blog;

    // conditionally shows all blogs for admin and all users
    return (
        <div className="lg:w-full">
            <div onClick={!isAdmin ? () => handleBlog(_id) : undefined} className="mx-3 mt-5 shadow-md rounded-md hover:shadow-xl" style={!isAdmin ? {cursor: 'pointer'} : {}}>
                <div>
                    <img className="w-full h-48 rounded-t-md" src={coverImage} alt="" />
                </div>
                <div className="p-2">
                    <h2 className="text-xl font-bold text-gray-500">{title}</h2>
                    <div className="flex justify-between text-gray-500">
                        <div>
                            <span>Published: {new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <br />
                            {
                                isAdmin &&
                                <button onClick={() => handleDeleteBtn(_id)} className="text-xl text-red-500 mt-1 focus:outline-none"><FontAwesomeIcon icon={faTrashAlt} /></button>
                            }
                        </div>

                        {
                            isAdmin &&
                            <div>
                                <div className="flex">
                                    <h3>{name}</h3>
                                    <img className="mx-2 w-8 h-8 rounded-full" src={photo || avater} alt="" />
                                </div>
                                <div className="flex justify-between">
                                    <span><FontAwesomeIcon icon={faThumbsUp} /> <span>{likes}</span></span>
                                    <span className="mx-2"><FontAwesomeIcon icon={faEye} /> <span>{views}</span></span>
                                </div>
                            </div>
                        }
                    </div>

                    {
                        !isAdmin &&
                        <div className="text-gray-400 text-sm mt-2">
                            {content.slice(0, 130)}...
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Blog;