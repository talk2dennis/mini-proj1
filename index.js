import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import client from './database/db.js';
import userRouter from './routes/users.js';

const app = express();

// port
const PORT = parseInt(process.env.PORT, 10) || 5000;

// parse JSON bodies
app.use(express.json());
// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// home page
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// use the users router
app.use('/users', userRouter);


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
        url: `http://localhost:${PORT}`,
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
app.use((req, res, next) => {
  res.status(404).send({ error: 'Not Found', message: `Route ${req.originalUrl} not found` });
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.name || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.'
  });
});

  // start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });