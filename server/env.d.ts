declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;
        PORT: number;
        JWT_KEY: string;
    }
}
