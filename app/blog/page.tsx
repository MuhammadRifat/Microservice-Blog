'use client';

import { useEffect, useState } from 'react';
import { IBlog } from './blog.interface';
import { BlogService } from './blog.service';
import BlogDesign from './blog.design';
export default function BlogLogic() {
    const [data, setData] = useState<IBlog[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const processedData = await BlogService.getAllBlogs()
                setData(processedData.data);
            } catch (error: any) {
                console.error('Error fetching or processing data:', error.message);
            }
        }
        fetchData();
    }, []);

    // return the design page
    return <BlogDesign blogs={data} />
}
