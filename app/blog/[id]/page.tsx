'use client';

import { useEffect, useState } from 'react';
import { IBlog } from '../blog.interface';
import { BlogService } from '../blog.service';
import BlogDetailsDesign from './blog-details.design';
export default function BlogLogic() {
    const [blog, setBlog] = useState<IBlog | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const blogRes = await BlogService.getOneBlog('66cac50dfedc08e10bfe044e');
                setBlog(blogRes.data);
            } catch (error: any) {
                console.error('Error fetching or processing data:', error.message);
            }
        }
        fetchData();
    }, []);

    // return the design page
    return <BlogDetailsDesign blog={blog} />
}
