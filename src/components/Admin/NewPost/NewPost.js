import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'

const NewPost = () => {
    const history = useHistory();
    
    const handleSubmit = () => {

    }
    return (
        <div className="flex justify-center p-4">
            <div className="w-full md:w-3/4 lg:w-1/2">
                <form onSubmit={handleSubmit}>
                    <input className="w-full p-2 border-2 border-black border-opacity-50 rounded-md" type="text" name="title" placeholder="Title" />
                    <textarea rows="13" className="w-full p-2 border-2 border-black border-opacity-50 rounded-md mt-4" type="text" name="content" placeholder="Content"></textarea>
                    
                    <label for="image" className="font-bold mt-4 text-gray-500 text-md">Cover Image</label>
                    <input type="file" className="w-full border-2 border-black border-opacity-50 rounded-md" name="image" id="image" />

                    <div className="text-center mt-8">
                        <button type="submit" className="w-1/4 p-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-lg font-bold text-white text-lg"><FontAwesomeIcon icon={faArrowAltCircleRight} /> Publish</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPost;