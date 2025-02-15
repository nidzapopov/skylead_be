import { cleanEnv, port, str } from 'envalid';

export default class ValidateEnv {

    constructor()
    {
        this.init();
    }

    init(): void 
    {
        cleanEnv(process.env, {
            API: str(),
            PORT: port(),
            NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging']}),
            DATABASE: str({ choices: ['mongodb', 'sql']}),
            MONGO: str({ choices: ['local', 'cluster']}),
        });
    }
}