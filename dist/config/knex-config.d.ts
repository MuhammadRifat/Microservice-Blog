declare const knexConfig: {
    config: {
        client: string;
        useNullAsDefault: boolean;
        connection: {
            host: string;
            user: string;
            password: string;
            database: string;
            dateStrings: boolean;
        };
    };
};
export default knexConfig;
