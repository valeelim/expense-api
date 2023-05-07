"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const santizeHtmlExtension = {
    type: 'string',
    base: joi_1.default.string(),
    messages: {
        'string.escapeHTML': '{{$label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = (0, sanitize_html_1.default)(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (value !== clean)
                    return helpers.error('string.escapeHTML', { value });
                return clean;
            }
        }
    }
};
const BaseJoi = joi_1.default.extend(santizeHtmlExtension);
exports.default = BaseJoi;
