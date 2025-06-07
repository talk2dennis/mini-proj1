import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
// In-memory database
const items = [];
/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the item.
 *         name:
 *           type: string
 *           description: The name of the item.
 *         description:
 *           type: string
 *           description: A brief description of the item.
 */


/**
 * @swagger
 * /items:
 *   get:
 *     summary: Retrieve a list of items
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get('/', (req, res) => {
    res.json(items);
});

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: The created item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 */

router.post('/', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
    }
    const newItem = {
        id: uuidv4(),
        name,
        description
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Retrieve an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique identifier of the item
 *     responses:
 *       200:
 *         description: The requested item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 */

router.get('/:id', (req, res) => {
    const item = items.find(i => i.id === req.params.id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
});


/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique identifier of the item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The updated item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 */

router.put('/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === req.params.id);
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
    }
    const updatedItem = {
        id: req.params.id,
        name,
        description
    };
    items[itemIndex] = updatedItem;
    res.json(updatedItem);
});


/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique identifier of the item
 *     responses:
 *       204:
 *         description: Item deleted successfully
 */

router.delete('/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === req.params.id);
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    items.splice(itemIndex, 1);
    res.status(204).send();
});

// Export the router to be used in the main application
export default router;
// This code defines a simple CRUD API for managing items using Express.js and Swagger for documentation.
// It includes endpoints to create, read, update, and delete items, with Swagger annotations for API documentation.
// The items are stored in an in-memory array, and each item has a unique identifier generated using UUID.
// The API supports JSON requests and responses, and it validates input data to ensure required fields are provided.
//
// The Swagger documentation provides a clear overview of the API endpoints, request parameters, and response formats.
//
// The code is structured to handle errors gracefully, returning appropriate HTTP status codes and error messages when necessary.