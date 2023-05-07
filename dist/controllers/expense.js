"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expense_1 = __importDefault(require("../seeds/expense"));
const category_1 = __importDefault(require("../seeds/category"));
const ExpressError_1 = require("../utils/ExpressError");
const ExpenseController = {
    getAllExpenses(req, res, next) {
        const { category, min_price, max_price } = req.query;
        let expense = expense_1.default.slice();
        if (category) {
            const nameIdMapping = {};
            const allowedCategoryId = category.split(',');
            category_1.default.forEach(cat => nameIdMapping[cat.name] = cat.id);
            expense = expense.filter(exp => allowedCategoryId.includes(nameIdMapping[exp.category]));
        }
        if (min_price)
            expense = expense.filter(exp => exp.amount >= parseInt(min_price));
        if (max_price)
            expense = expense.filter(exp => exp.amount <= parseInt(max_price));
        return res.json(expense);
    },
    createExpense(req, res, next) {
        const expense = Object.assign({ id: expense_1.default.length + 1 }, req.body);
        const validCategory = category_1.default.find(category => category.id === expense.category);
        if (!validCategory) {
            throw new ExpressError_1.ExpressError("Category uuid does not exist", 400);
        }
        expense_1.default.push(expense);
        return res.json(Object.assign(Object.assign({}, expense), { category: Object.assign({}, validCategory) }));
    },
    getAllCategory(req, res, next) {
        return res.json(category_1.default);
    },
    getTotalExpense(req, res, next) {
        const total = expense_1.default.reduce((acc, cur) => {
            return acc + cur.amount;
        }, 0);
        return res.json({
            total_expenses: total
        });
    },
    getExpenseById(req, res, next) {
        const { id } = req.params;
        const expense = expense_1.default.find(expense => expense.id === id);
        if (!expense) {
            throw new ExpressError_1.ExpressError("Expense uuid does not exist", 400);
        }
        const category = category_1.default.find(category => category.name === expense.category);
        return res.json(Object.assign(Object.assign({}, expense), { category: Object.assign({}, category) }));
    },
    deleteExpenseById(req, res, next) {
        const { id } = req.params;
        const expenseIndex = expense_1.default.findIndex(expense => expense.id === id);
        if (expenseIndex === -1) {
            throw new ExpressError_1.ExpressError("Expense uuid does not exist", 400);
        }
        expense_1.default.splice(expenseIndex, 1);
        return res.send(`Success delete expense with id ${id}`);
    },
    updateExpenseById(req, res, next) {
        const { id } = req.params;
        const { category } = req.body;
        const expenseIndex = expense_1.default.findIndex(expense => expense.id === id);
        const validCategory = category_1.default.find(cat => cat.id === category);
        if (expenseIndex === -1) {
            throw new ExpressError_1.ExpressError("Expense uuid does not exist", 400);
        }
        if (!validCategory) {
            throw new ExpressError_1.ExpressError("Category uuid does not exist", 400);
        }
        expense_1.default[expenseIndex] = Object.assign(Object.assign({ id }, req.body), { category: validCategory.name });
        return res.json(Object.assign(Object.assign({}, expense_1.default[expenseIndex]), { category: Object.assign({}, validCategory) }));
    }
};
exports.default = ExpenseController;
