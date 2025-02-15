import { cleanEnv, port, str } from 'envalid';

export default class ValidateEnv {

    constructor()
    {
        this.init();
    }

    init(): void 
    {
        cleanEnv(process.env, {
            MONGO_PASSWORD: str(),
            MONGO_PATH: str(),
            MONGO_USER: str(),
            API: str(),
            PORT: port(),
            JWT_SECRET: str(),
            NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging']}),
            DATABASE: str({ choices: ['mongodb', 'sql']}),
            MONGO: str({ choices: ['local', 'cluster']}),
        });
    }
}