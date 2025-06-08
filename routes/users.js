import express from 'express';
import client from '../database/db.js';
import { body, param, validationResult } from 'express-validator';

// custom error handler for validation
class ApiError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

const table = `CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  age INTEGER
);
`
client.query(table).catch((err) => {
    console.error("Error creating table", err.stack)
    process.exit(1);
});

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - age
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The unique identifier for the user.
 *         name:
 *           type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         age:
 *           type: integer
 *           format: int32
 *           description: The age of the user.
 *       example:
 *         id: 1
 *         name: John Doe
 *         email: johndoe@email.com
 *         age: 30
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

// get routes to get all users
router.get('/', async (req, res, next) => {
    try {
        const result = await client.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        next(new ApiError("Error fetching users", 500));
    }
});


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 */

// post route to create a new user
router.post('/',
    [
        body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string').trim(),
        body('email').notEmpty().withMessage("Email is required").isEmail().withMessage('Valid email is required'),
        body('age').notEmpty().withMessage('Age is required').isInt({ gt: 0 }).withMessage('Age must be a positive integer')
    ],
    async (req, res, next) => {
        // check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(
                {
                    error: 'Validation Error',
                    message: 'Invalid input data',
                    errors: errors.array()
                });
        }
        const { name, email, age } = req.body;
        try {
            const result = await client.query(
                'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING id, name, email, age',
                [name, email, age]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            next(new ApiError("Error creating user", 500));
        }
    });

// get a user by ID
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

router.get('/:id',
    [param('id').isInt().withMessage('ID must be an integer')],
    async (req, res) => {
        // check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Invalid ID format',
                errors: errors.array()
            });
        }
        const { id } = req.params;
        try {
            const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(result.rows[0]);
        } catch (err) {
            next(new ApiError("Error fetching user", 500));
        }
    });


// update a user by ID
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 */

router.put('/:id',
    [
        param('id').isInt().withMessage('ID must be an integer'),
        body('name').optional().isString().withMessage('Name must be a string').trim(),
        body('email').optional().isEmail().withMessage('Valid email is required').trim(),
        body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive integer')
    ],
    async (req, res, next) => {
        // validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Invalid input data',
                errors: errors.array()
            });
        }

        const { id } = req.params;
        const { name, email, age } = req.body;
        try {
            const result = await client.query(
                'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING id, name, email, age',
                [name, email, age, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(result.rows[0]);
        } catch (err) {
            next(new ApiError("Error updating user", 500));
        }
    });

// delete a user by ID
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     responses:
 *       204:
 *         description: User deleted successfully
 */

router.delete('/:id',
    [param('id').isInt().withMessage('ID must be an integer')],
    async (req, res, next) => {
        // validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation Error',
                message: 'Invalid ID format',
                errors: errors.array()
            });
        }
        const { id } = req.params;
        try {
            const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING id, name, age', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(204).send();
        } catch (err) {
            next(new ApiError("Error deleting user", 500));
        }
    });

export default router;