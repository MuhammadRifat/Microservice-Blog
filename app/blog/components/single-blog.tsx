import React from 'react';
import { IBlog } from '../blog.interface';
import Link from 'next/link';

const SingleBlog = ({ blog }: { blog: IBlog }) => {
    const { title, image, likes, views, createdAt, _id, author, comments } = blog;

    // conditionally shows all blogs for admin and all users
    return (
        <div className="lg:w-full">
            <div className="mx-3 mt-5 shadow-md rounded-md hover:shadow-xl">
                <Link href={`/blog/${_id}`}>
                    <div>
                        <img className="w-full h-48 rounded-t-md" src={`http://103.28.121.117:7010/file-api/uploads/images/original/${image}`} alt="" />
                    </div>
                    <div className="p-2">
                        <h2 className="text-xl font-bold text-gray-500" style={{ overflowX: "auto" }}>{title}</h2>
                        <div className="flex justify-between text-gray-500">
                            <div className='text-sm'>
                                <span>Published: {new Date(createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                <br />

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
                            <span className="mx-2"> <span>{likes || 0}</span></span>
                            <span className="mx-2"> <span>{comments || 0}</span></span>
                            <span className="mx-2"> <span>{views || 0}</span></span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default SingleBlog;