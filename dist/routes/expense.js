"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchAsync_1 = require("../utils/catchAsync");
const expense_1 = __importDefault(require("../controllers/expense"));
const validateExpense_1 = __importDefault(require("../middleware/validateExpense"));
const router = express_1.default.Router();
router.route('/')
    .get((0, catchAsync_1.catchAsync)(expense_1.default.getAllExpenses)) // catch async not relevant as of current
    .post(validateExpense_1.default, (0, catchAsync_1.catchAsync)(expense_1.default.createExpense));
router.get('/category', (0, catchAsync_1.catchAsync)(expense_1.default.getAllCategory));
router.get('/total', (0, catchAsync_1.catchAsync)(expense_1.default.getTotalExpense));
router.route('/:id')
    .get((0, catchAsync_1.catchAsync)(expense_1.default.getExpenseById))
    .delete((0, catchAsync_1.catchAsync)(expense_1.default.deleteExpenseById))
    .put(validateExpense_1.default, (0, catchAsync_1.catchAsync)(expense_1.default.updateExpenseById));
exports.default = router;
