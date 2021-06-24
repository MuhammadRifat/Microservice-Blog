import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Loader from '../../Loader/Loader';

const NewPost = () => {
    const [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleBlur = (e) => {
        const newData = { ...post };
        newData[e.target.name] = e.target.value;
        setPost(newData);
    }

    const handleImageUpload = (event) => {
        setIsLoading(true);
        const imageData = new FormData();
        imageData.set('key', 'c4ebb744a3b647feb62c85c668dcb1fa');
        imageData.append('image', event.target.files[0]);

        // upload image and generate a unique image url
        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                const newData = { ...post };
                newData.imageUrl = response.data.data.display_url;
                setPost(newData);
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newData = {
            ...post,
            likes: 0,
            views: 0,
            date: new Date()
        }

        fetch('http://localhost:5000/addPost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setIsLoading(false);
                    history.push('/admin');
                }
            })
    }
    return (
        <div className="flex justify-center p-4">
            <div className="w-full md:w-3/4 lg:w-1/2">
                {
                    isLoading && <Loader />
                  
                }
                <form onSubmit={handleSubmit}>
                    <input className="w-full p-2 border-2 border-black border-opacity-50 rounded-md" type="text" onBlur={handleBlur} name="title" placeholder="Title" required />
                    <textarea rows="13" className="w-full p-2 border-2 border-black border-opacity-50 rounded-md mt-4" onBlur={handleBlur} type="text" name="content" placeholder="Content" required></textarea>

                    <label htmlFor="image" className="font-bold mt-4 text-gray-500 text-md">Cover Image</label>
                    <input type="file" className="w-full border-2 border-black border-opacity-50 rounded-md" onChange={handleImageUpload} name="image" id="image" required />

                    <div className="text-center mt-8">
                        <button type="submit" onBlur={handleBlur} className="w-1/4 p-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-lg font-bold text-white text-lg"><FontAwesomeIcon icon={faArrowAltCircleRight} /> Publish</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPost;