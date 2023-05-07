import { Request, Response, NextFunction } from 'express';
import expenseSeed from '../seeds/expense';
import categorySeed from '../seeds/category';
import { ExpressError } from '../utils/ExpressError';
import { ExpenseResponse } from '../schemas/expense';

const ExpenseController = {
    getAllExpenses (req: Request, res: Response, next: NextFunction) {
        const { category, min_price, max_price } = req.query as {
            category: string,
            min_price: string,
            max_price: string
        };
        let expense: ExpenseResponse[] = expenseSeed.slice();

        if (category) {
            const nameIdMapping: Record<string, string> = {};
            const allowedCategoryId = category.split(',');
            categorySeed.forEach(cat => nameIdMapping[cat.name] = cat.id)
            expense = expense.filter(exp => allowedCategoryId.includes(nameIdMapping[exp.category]));
        }
        if (min_price) expense = expense.filter(exp => exp.amount >= parseInt(min_price));
        if (max_price) expense = expense.filter(exp => exp.amount <= parseInt(max_price));
        
        return res.json(expense);
    },

    createExpense (req: Request, res: Response, next: NextFunction) {
        const expense = {
            id: expenseSeed.length + 1,
            ...req.body
        }
        const validCategory = categorySeed.find(category => category.id === expense.category)
        if (!validCategory) {
            throw new ExpressError("Category uuid does not exist", 400);
        }
        expenseSeed.push(expense);

        return res.json({
            ...expense,
            category: {
                ...validCategory
            }
        });
    },

    getAllCategory (req: Request, res: Response, next: NextFunction) {
        return res.json(categorySeed);
    },

    getTotalExpense (req: Request, res: Response, next: NextFunction) {
        const total = expenseSeed.reduce((acc, cur) => {
            return acc + cur.amount;
        }, 0)
        return res.json({
            total_expenses: total
        })
    },

    getExpenseById (req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const expense = expenseSeed.find(expense => expense.id === id);
        if (!expense) {
            throw new ExpressError("Expense uuid does not exist", 400);
        }

        const category = categorySeed.find(category => category.name === expense.category);
        return res.json({
            ...expense,
            category: {
                ...category
            },
        })
    },

    deleteExpenseById (req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const expenseIndex = expenseSeed.findIndex(expense => expense.id === id);
        if (expenseIndex === -1) {
            throw new ExpressError("Expense uuid does not exist", 400);
        }
        expenseSeed.splice(expenseIndex, 1);
        return res.send(`Success delete expense with id ${id}`);
    },

    updateExpenseById (req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { category } = req.body;
        const expenseIndex = expenseSeed.findIndex(expense => expense.id === id);
        const validCategory = categorySeed.find(cat => cat.id === category)
        if (expenseIndex === -1) {
            throw new ExpressError("Expense uuid does not exist", 400);
        }
        if (!validCategory) {
            throw new ExpressError("Category uuid does not exist", 400);
        }
        expenseSeed[expenseIndex] = {
            id,
            ...req.body,
            category: validCategory.name
        }
        return res.json({
            ...expenseSeed[expenseIndex],
            category: {
                ...validCategory
            }
        })
    }

}

export default ExpenseController;
