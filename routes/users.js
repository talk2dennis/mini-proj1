import express from 'express';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';


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