import express, { Express, NextFunction, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import expenseRoute from './routes/expense';
import { ExpressError } from './utils/ExpressError';

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

const app: Express = express();
const specs = swaggerJsdoc(options);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/expense', expenseRoute)

app.get('/', (req: Request, res: Response) => {
    res.send("You made it");
});

app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong";
    res.status(statusCode).json({
        message: err.message
    });
})

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});