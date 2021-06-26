import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import avater from '../../Images/avater.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEye } from '@fortawesome/free-solid-svg-icons';
import Loader from '../Loader/Loader';
import Header from '../Header/Header';
import Dropdown from '../Header/Dropdown/Dropdown';

const BlogDetails = () => {
    const [blog, setBlog] = useState({});
    const [isLike, setIsLike] = useState(false);
    const [likes, setLikes] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const { name, title, content, photo, coverImage, views, date } = blog;

    // Load blog by id
    useEffect(() => {
        setIsLoading(true);
        fetch(`https://enigmatic-coast-10449.herokuapp.com/blog/${id}`)
            .then(res => res.json())
            .then(data => {
                setBlog(data);
                setLikes(data.likes);
                setIsLoading(false);
            })
    }, [id])

    // Fix like button
    const handleLikeBtn = () => {
        setIsLike(!isLike);
        let totalLikes = likes;
        if (isLike) {
            setLikes(likes - 1);
            totalLikes = likes - 1;
        } else {
            setLikes(likes + 1);
            totalLikes = likes + 1;
        }

        // update likes when click like button
        fetch('https://enigmatic-coast-10449.herokuapp.com/updateLikes', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, likes: totalLikes })
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
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
                    <h1 className="text-center text-3xl font-bold text-gray-700">{title}</h1>

                    <div className="flex justify-between text-gray-600 mt-3">
                        <div className="flex">
                            <img className="mx-2 w-8 h-8 rounded-full" src={photo || avater} alt="" />
                            <h3 className="mt-1">{name}</h3>
                        </div>
                        <h3>Published: {new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                    </div>

                    <img className="w-full h-80 mt-3" src={coverImage} alt="" />

                    <div className="text-gray-700 mt-3 text-lg w-full">
                        <p style={{whiteSpace: 'pre-line'}}>{content}</p>
                    </div>

                    <div className="mt-8 text-gray-500 flex justify-between">
                        <div>
                            <button className={isLike ? "focus:outline-none text-green-700" : "focus:outline-none"} onClick={handleLikeBtn}><FontAwesomeIcon icon={faThumbsUp} size="2x" /></button>
                            <span className="ml-3 text-xl">{likes}</span>
                        </div>
                        <div>
                            <span className="mr-3 text-xl">{views}</span>
                            <FontAwesomeIcon icon={faEye} size="2x" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogDetails;