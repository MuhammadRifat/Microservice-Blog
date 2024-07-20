import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Loader from '../../Loader/Loader';
import Header from '../../Header/Header';
import Dropdown from '../../Header/Dropdown/Dropdown';
import { API_URL, userContext } from '../../../App';
import avater from '../../../Images/avater.png';

const NewPost = () => {
    const [loggedInUser] = useContext(userContext);
    const [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    // handle new post data
    const handleBlur = (e) => {
        const newData = { ...post };
        newData[e.target.name] = e.target.value;
        setPost(newData);
    }

    // handle cover image upload into imagebb website
    const handleImageUpload = (event) => {
        setIsLoading(true);
        const imageData = new FormData();
        imageData.append('image', event.target.files[0]);

        // upload image and generate a unique image url
        axios.post(`${API_URL.FILE}/file/image`,
            imageData,
            { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${loggedInUser.token}` } },
        )
            .then(function (response) {
                const newData = { ...post };
                newData.image = response?.data?.data?.[0]?.fileName;
                setPost(newData);
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false);
            });
    }

    // submit blog data into the database
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newData = {
            ...post
        }

        fetch(`${API_URL.BLOG}/blog`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${loggedInUser.token}` },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setIsLoading(false);
                    history.push('/dashboard');
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
            <Header toggle={toggle} isVisible={false}></Header>
            <Dropdown isOpen={isOpen} toggle={toggle}></Dropdown>
            <div className="flex justify-center p-4">
                <div className="w-full md:w-3/4 lg:w-1/2">
                    {
                        isLoading && <Loader />

                    }
                    <form onSubmit={handleSubmit}>
                        <input className="w-full p-2 border-2 border-black border-opacity-50 rounded-md" type="text" onBlur={handleBlur} name="title" placeholder="Title" required />
                        <textarea rows="13" className="w-full p-2 border-2 border-black border-opacity-50 rounded-md mt-4" onBlur={handleBlur} type="text" name="content" placeholder="Content" required></textarea>

                        <label htmlFor="image" className="font-bold mt-4 text-gray-500 text-md">Cover Image</label>
                        <input type="file" className="w-full border-2 border-black border-opacity-50 rounded-md" onChange={handleImageUpload} name="image" id="image" />

                        <div className="text-center mt-8">
                            <button type="submit" className="w-1/4 p-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-lg font-bold text-white text-lg"><FontAwesomeIcon icon={faArrowAltCircleRight} /> Publish</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewPost;