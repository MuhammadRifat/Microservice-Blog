import { CreateBlogDto } from './create-blog.dto';
import { BLOG_STATUS } from '../enums/blog.enum';
declare const UpdateBlogDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBlogDto>>;
export declare class UpdateBlogDto extends UpdateBlogDto_base {
    status?: BLOG_STATUS;
    isActive?: boolean;
}
export {};
