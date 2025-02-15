import * as express from 'express';
import HttpException from '../../exceptions/HttpException';
import { Types } from 'mongoose';

function id_validation(request: express.Request, response: express.Response, next: express.NextFunction) {
    if (!Types.ObjectId.isValid(request.params.id)) {
        next(new HttpException(400, "Invalid ID"));
    }
    next();
}
 
export default id_validation;