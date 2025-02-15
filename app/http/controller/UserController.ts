import * as express from 'express';

// interface
import ControllerInterface from "../../interface/controller.interface";
import IUser from '../../interface/user';

// controller
import Controller from './Controller';

// model
import UserModel from '../../database/models/user.model';
import HttpException from '../../exceptions/HttpException';

// dto
import CreateUser from '../dto/User/CreateUser';

class UserController extends Controller implements ControllerInterface {
    public path = `${process.env.API}users`;
    public router = express.Router();
    private UserModel = UserModel;

    constructor() {
        super();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
        this.router.post(this.path, this.dtoMiddleware(CreateUser), this.createUser);
    }

    private getAllUsers = async (request: express.Request, response: express.Response, next: express.NextFunction): Promise<void> => {
        try {
            const users: IUser[] = await this.UserModel.find();
            this.setRespond("Users retrieved successfully", users, 200, response);
        } catch (error) {
            next(new HttpException(500, error.message));
        }
    }

    private createUser = async (request: express.Request, response: express.Response, next: express.NextFunction): Promise<void> => {
        try {
            const user: IUser = await this.UserModel.create(request.body);
            this.setRespond("User created successfully", user, 201, response);
        } catch (error) {
            this.setRespond("User creation failed", [], 400, response);
        }
    }
}

export default UserController;
