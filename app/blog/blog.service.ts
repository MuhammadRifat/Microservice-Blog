import ApiService from "@/common/services/api.service";
import { IBlog } from "./blog.interface";

export class BlogService extends ApiService {

    static async getAllBlogs(page: number = 1, limit: number = 10) {
        try {
            return await this.getAll<IBlog>(`/blog-api/blog?page=${1}&limit=${limit}`);
        } catch (error: any) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    static async getOneBlog(id: string) {
        try {
            return await this.getOne<IBlog>(`/blog-api/blog/${id}`);
        } catch (error: any) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }
}