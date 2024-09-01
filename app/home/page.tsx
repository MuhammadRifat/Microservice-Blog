'use client';

import { useEffect, useState } from 'react';
import { IHomeApiResponse } from './home.interface';
import { HomeLogic } from './home.logic';

export default function HomePage() {
    const [data, setData] = useState<IHomeApiResponse[] | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const processedData = await HomeLogic.processData()
                setData(processedData);
            } catch (error: any) {
                console.error('Error fetching or processing data:', error.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
