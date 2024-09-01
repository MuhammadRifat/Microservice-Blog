import { IHomeApiResponse } from "./home.interface";

export class HomeService {

    static async getSettings(): Promise<IHomeApiResponse[]> {
        try {
            const response = await fetch(`http://103.28.121.117:7010/blog-api/blog?page=1&limit=10`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data: IHomeApiResponse[] = await response.json();
            console.log(data)
            return data;
        } catch (error: any) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

}