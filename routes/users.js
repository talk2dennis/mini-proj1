import express from 'express';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *       example:
 *         id: d5fE_asz
 *         firstName: John
 *         lastName: Doe
 *         email: example@email.com
 */

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management API
 *
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: firstName, lastName and emails are required
 *
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User with {id} deleted successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 */

// constant user
let USER = [];

// set the user routes
router.get('/', (req, res) => {
    res.send(USER).status(200);
});

router.post('/', (req, res) => {
    const user = req.body;
    if (!user || !user.firstName || !user.lastName || !user.email) {
        return res.status(400).send({ error: 'firstName, lastName and emails are required' });
    }

    // save the data with unique id
    USER.push({...user, id: uuidv4() });
    res.status(201).send({ message: 'User created successfully', user });
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const user = USER.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }
    
    res.status(200).send(user);
});

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const userIndex = USER.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).send({ error: 'User not found' });
    }
    
    const updatedUser = { ...USER[userIndex], ...req.body };
    USER[userIndex] = updatedUser;
    
    res.status(200).send({ message: 'User updated successfully', user: updatedUser });
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    USER = USER.filter(u => u.id !== userId);
    res.status(200).send({ message: `User with ${userId} deleted successfully`});
});



export default router;