import Joi from "joi";
import BaseJoi from "./BaseJoi";
import { Category } from "./category";


export type Expense = {
    id: string;
    name: string;
    category: Category;
    amount: number;
}

export type ExpenseRequest = {
    name: string;
    category: string;
    amount: number;
}

export type ExpenseResponse = {
    id: string;
    name: string;
    category: string;
    amount: number;
}

export const expenseRequest = BaseJoi.object({
    name: BaseJoi.string().required().escapeHTML(),
    category: BaseJoi.string().required().escapeHTML(),
    amount: BaseJoi.number().required().min(0).required()
}) as Joi.ObjectSchema<ExpenseRequest>;
