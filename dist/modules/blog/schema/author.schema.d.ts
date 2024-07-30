import { Document } from 'mongoose';
export declare class Author {
    id: number;
    name: string;
    image: string;
}
export type AuthorDocument = Author & Document;
export declare const AuthorSchema: import("mongoose").Schema<Author, import("mongoose").Model<Author, any, any, any, Document<unknown, any, Author> & Author & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Author, Document<unknown, {}, import("mongoose").FlatRecord<Author>> & import("mongoose").FlatRecord<Author> & {
    _id: import("mongoose").Types.ObjectId;
}>;
