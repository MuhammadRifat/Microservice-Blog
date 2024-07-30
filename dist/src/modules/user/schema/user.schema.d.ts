import { MysqlCommonSchema } from "src/common/schemas/schema.common";
export declare class IUser extends MysqlCommonSchema {
    firstName: string;
    lastName: string;
    email: string;
    slug: string;
    password: string;
    isVerified: string;
    image: string;
}
