"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseRequest = void 0;
const BaseJoi_1 = __importDefault(require("./BaseJoi"));
exports.expenseRequest = BaseJoi_1.default.object({
    name: BaseJoi_1.default.string().required().escapeHTML(),
    category: BaseJoi_1.default.string().required().escapeHTML(),
    amount: BaseJoi_1.default.number().required().min(0).required()
});
