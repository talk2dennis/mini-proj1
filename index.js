import express from 'express';

import bodyParser from 'body-parser';
import usersRouter from './routes/users.js';

const app = express();
app.use(bodyParser.json());

// home page
app.get('/', (req, res) => {
    res.send('Welcome to the User Management API');
});


// use the users router
app.use('/users', usersRouter);

// 404 error handling
app.use((req, res) => {
    res.status(404).send({ error: 'Not Found' });
});


// start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});