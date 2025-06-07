import express from 'express';

import bodyParser from 'body-parser';
import usersRouter from './routes/users.js';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(bodyParser.json());

// home page
app.get('/', (req, res) => {
    res.send('Welcome to the User Management API');
});


// use the users router
app.use('/users', usersRouter);



// swagger options
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "A simple CRUD API",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Dennis Adigwe",
        url: "https://example.com",
        email: "adigwedennis@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// 404 error handling
app.use((req, res) => {
    res.status(404).send({ error: 'Not Found' });
});

// start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});