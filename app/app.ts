import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { createServer, Server } from "http";
import * as cors from 'cors';
import rateLimit from 'express-rate-limit';

// interface
import Controller from './interface/controller.interface';
// middlewares
import errorMiddleware from './http/middleware/error.Middleware';
// other
import DatabaseConnection from './database/connection/DatabaseConnection';

export default class App {
    public app: express.Application;
    public port: string;
    public controllers: Controller[];
    public server: Server;

    constructor(controllers: Controller[], port: string)
    {
        this.app = express();
        this.port = port;
        this.controllers = controllers;
        this.server = createServer(this.app);

        this.init();
    }

    private init()
    {
        this.initializeMiddlewares();
        this.initializeControllers();
        this.initializeErrorHandling();
        this.connectToTheDatabase();
    }

    private initializeMiddlewares()
    {
        this.app.use(express.json()); 
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/public', express.static('public'));
        this.app.use(cookieParser());
        this.app.use(cors({ origin: '*' }));

        // Rate Limiting
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100, 
            message: "Too many requests from this IP, please try again later.",
        });
        this.app.use(limiter);
    }

    private initializeControllers(): void
    {
        this.controllers.forEach((controller: Controller) => {
            this.app.use('/', controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.app.use(errorMiddleware);
    }

    private connectToTheDatabase(): void {
        new DatabaseConnection();
    }

    public listen(): void 
    {
        this.server.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
