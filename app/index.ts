import ValidateEnv from './utils/validateEnv';
import App from './app';
import * as dotenv from 'dotenv';
import TaskController from './http/controller/TaskController';
import UserController from './http/controller/UserController';


dotenv.config();
new ValidateEnv();

const app = new App(
    [
        new TaskController(),
        new UserController()
    ],
    process.env.PORT);
app.listen();

