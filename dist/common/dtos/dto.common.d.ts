import mongoose from "mongoose";
export declare class IPaginate {
    limit?: number;
    page?: number;
}
export declare class QueryCommonDto extends IPaginate {
    sortBy: string;
    sortOrder: number;
    is_active: number;
}
export declare class MongoIdParams {
    id: mongoose.Types.ObjectId;
}
export declare class ContactDto {
    email: string;
    phone: string;
}
export declare class SocialLinkDto {
    facebook: string;
    twitter: string;
    youtube: string;
}
