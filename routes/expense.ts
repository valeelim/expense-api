import express, { Express, Router } from 'express';
import { catchAsync } from '../utils/catchAsync';
import expense from '../controllers/expense';
import validateExpense from '../middleware/validateExpense';



const router: Router = express.Router();

router.route('/')
    .get(catchAsync(expense.getAllExpenses)) // catch async not relevant as of current
    .post(validateExpense, catchAsync(expense.createExpense))

router.get('/category', catchAsync(expense.getAllCategory))

router.get('/total', catchAsync(expense.getTotalExpense))

router.route('/:id')
    .get(catchAsync(expense.getExpenseById))
    .delete(catchAsync(expense.deleteExpenseById))
    .put(validateExpense, catchAsync(expense.updateExpenseById))
    
export default router;