"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expense_1 = require("../schemas/expense");
const ExpressError_1 = require("../utils/ExpressError");
const validateExpense = (req, res, next) => {
    const { error } = expense_1.expenseRequest.validate(req.body);
    if (error) {
        const msg = error.details.map((errorDetail) => errorDetail.message).join(',');
        throw new ExpressError_1.ExpressError(msg, 400);
    }
    next();
};
exports.default = validateExpense;
