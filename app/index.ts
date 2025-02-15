import ValidateEnv from './utils/validateEnv';
import App from './app';
import * as dotenv from 'dotenv';

dotenv.config();
new ValidateEnv();

const app = new App(
    [
    ],
    process.env.PORT);
app.listen();

