"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const expense_1 = __importDefault(require("./routes/expense"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Expense API',
            version: '1.0.0',
            description: "An API doc"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],
    },
    apis: ["./swagger.yaml"],
};
const app = (0, express_1.default)();
const specs = (0, swagger_jsdoc_1.default)(options);
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.use('/expense', expense_1.default);
app.get('/', (req, res) => {
    res.send("You made it");
});
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message)
        err.message = "Something went wrong";
    res.status(statusCode).json({
        message: err.message
    });
});
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
