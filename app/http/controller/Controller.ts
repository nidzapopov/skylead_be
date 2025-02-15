import * as express from 'express';
import id_validation from '../middleware/id_validation.Middleware';
import dtoMiddleware from '../middleware/dto.middleware';
import { DataForRespond } from '../../interface/response';

abstract class Controller {
    protected id_validation = id_validation;
    protected dtoMiddleware = dtoMiddleware;
    constructor() {}

    protected setRespond = (message: string, data: DataForRespond, status: number, response: express.Response) => {
        response.status(status).json({ message, data, status });
    }
}

export default Controller;
