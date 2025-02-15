import * as express from 'express';
import dtoMiddleware from '../middleware/dto.middleware';

abstract class Controller {
    protected dtoMiddleware = dtoMiddleware;
    constructor() {}
}

export default Controller;
