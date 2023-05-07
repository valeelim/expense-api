import { Request, Response, NextFunction } from 'express';
import { expenseRequest } from '../schemas/expense';
import { ValidationErrorItem } from 'joi';
import { ExpressError } from '../utils/ExpressError';

const validateExpense = (req: Request, res: Response, next: NextFunction) => {
    const { error } = expenseRequest.validate(req.body);
    if (error) {
        const msg: string = error.details.map((errorDetail: ValidationErrorItem) => errorDetail.message).join(',')
        throw new ExpressError(msg, 400);
    }
    next();
}

export default validateExpense;