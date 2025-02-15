// package
import * as express from 'express';

// interface
import ControllerInterface from "../../interface/controller.interface";
import { ITask } from '../../interface/task';

// controller
import Controller from './Controller';

// model
import taskModel from '../../database/models/task.model';

// dto
import CreateTask from '../dto/Task/CreateTask';
import UpdateTask from '../dto/Task/UpdateTask';

class TaskController extends Controller implements ControllerInterface {
    public path = `${process.env.API}tasks`;
    public router = express.Router();
    private taskModel = taskModel;

    constructor() {
        super();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllTasks);
        this.router.get(`${this.path}/:id`, this.id_validation, this.getTask);
        this.router.post(this.path, this.dtoMiddleware(CreateTask), this.createTask);
        this.router.put(`${this.path}/:id`, this.id_validation, this.dtoMiddleware(UpdateTask), this.updateTask);
        this.router.delete(`${this.path}/:id`, this.id_validation, this.deleteTask);
    }

    private getAllTasks = async (request: express.Request, response: express.Response, next: express.NextFunction): Promise<void> => 
    {
        try {
            const tasks = await this.taskModel.find();
            this.setRespond("Tasks retrieved successfully", tasks, 200, response);
        } catch (error) {
            this.setRespond(error.message, [], 500, response);
        }
    }

    private getTask = async (request: express.Request, response: express.Response, next: express.NextFunction): Promise<void> => 
    {
        try {
            const task = await this.taskModel.findById(request.params.id);
            (!task)
                ? this.setRespond("Task not found", [], 404, response)
                : this.setRespond("Tasks retrieved successfully", task, 200, response);
        } catch (error) {
            this.setRespond(error.message, [], 500, response);
        }
    }

    private createTask = async (request: express.Request, response: express.Response, next: express.NextFunction): Promise<void> => 
    {
        try {
            const task: ITask = await this.taskModel.create(request.body);
            this.setRespond("Task created successfully", task, 201, response);
        } catch (error) {
            this.setRespond(error.message, [], 400, response);
        }
    }

    private updateTask = async (request: express.Request, response: express.Response, next: express.NextFunction): Promise<void> =>
    {
        try {
            const task = await this.taskModel.findByIdAndUpdate(request.params.id, request.body, { new: true });
            (!task)
                ? this.setRespond("Task not found", [], 404, response)
                : this.setRespond("Task updated successfully", task, 201, response);
        } catch (error) {
            this.setRespond(error.message, [], 400, response);
        }
    }

    private deleteTask = async (request: express.Request, response: express.Response, next: express.NextFunction): Promise<void> =>
    {
        try {
            const task = await this.taskModel.findByIdAndDelete(request.params.id);
            (!task)
                ? this.setRespond("Task not found", [], 404, response)
                : this.setRespond("Task deleted successfully", [], 201, response);
        } catch (error) {
            this.setRespond(error.message, [], 400, response);
        }
    }
}

export default TaskController;
