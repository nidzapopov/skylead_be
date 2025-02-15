import * as express from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

// exception
import HttpException from '../../exceptions/HttpException';

function validationMiddleware(type: any, skipMissingProperties = false): express.RequestHandler {
    return (req, res, next) => {
        validate(plainToInstance(type, req.body), { 
            skipMissingProperties, 
            forbidUnknownValues: true})
        .then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
                next(new HttpException(400, message));
            }
            next();
        });
    };
}
 
export default validationMiddleware;
