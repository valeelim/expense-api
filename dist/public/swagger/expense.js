"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *      Expense:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  example: 3f5d8771-e77a-402e-833d-66eeffaeae16
 *              name:
 *                  type: string
 *                  example: Hokben Value Set
 *              category:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *                          example: fa8337a7-a4b7-4257-a322-9d51473d9fc4
 *                      name:
 *                          type: string
 *                          example: Food
 *              amount:
 *                  type: integer
 *                  example: 34000
 *
 * tags:
 *   name: Expenses
 *   description: Manages expenses
 * /expense:
 *   get:
 *      summary: Gets all expenses
 *      tags: [Expenses]
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Expense'
 *      parameters:
 *          - name: category
 *            in: query
 *            schema:
 *              type: string
 *          - name: min_price
 *            in: query
 *            schema:
 *              type: integer
 *          - name: max_price
 *            in: query
 *            schema:
 *              type: integer
 *
 */ 
